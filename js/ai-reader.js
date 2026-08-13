// AI Document Reader — uses browser-native AI (window.ai) or Chrome's built-in
// Prompt API. Falls back to a structured extraction prompt displayed for the user.

const AI_SYSTEM_PROMPT = `You are a data extraction tool for the Substation project. Your job is to extract environmental impact data about a specific data center facility from a document.

RULES — you must follow these exactly:
1. Extract a value ONLY if the document explicitly states it. If the document does not state a value, return null. Do NOT estimate, do NOT infer from typical data centers, and do NOT use any outside knowledge.
2. Every non-null value MUST be returned with the exact sentence from the document that contains it, copied verbatim. If you cannot produce that verbatim sentence, return null instead.
3. Convert to these units: power_mw (MW), water_gpd (gallons/day), building_sqft (sq ft), campus_acres (acres), noise_dba (dBA). For a range, use the higher figure and mark confidence as "medium".
4. If a figure describes something else — a whole campus total when asking about one building, a county total, a different construction phase, or a comparison to another site — return null.

Return ONLY valid JSON in this format:
{
  "power_mw": { "value": <number or null>, "quote": "<exact sentence or null>", "confidence": "high|medium|low" },
  "water_gpd": { "value": <number or null>, "quote": "<exact sentence or null>", "confidence": "high|medium|low" },
  "building_sqft": { "value": <number or null>, "quote": "<exact sentence or null>", "confidence": "high|medium|low" },
  "campus_acres": { "value": <number or null>, "quote": "<exact sentence or null>", "confidence": "high|medium|low" },
  "noise_dba": { "value": <number or null>, "quote": "<exact sentence or null>", "confidence": "high|medium|low" }
}`;

async function extractWithAI(documentText, facilityName) {
    const userPrompt = `Extract impact data for the facility "${facilityName}" from this document:\n\n${documentText}`;

    // Try Chrome's built-in Prompt API (chrome.aiOriginTrial or window.ai)
    if (window.ai && window.ai.languageModel) {
        try {
            const session = await window.ai.languageModel.create({
                systemPrompt: AI_SYSTEM_PROMPT
            });
            const response = await session.prompt(userPrompt);
            session.destroy();
            return JSON.parse(response);
        } catch (e) {
            console.warn('Built-in AI failed, trying fallback:', e);
        }
    }

    // Fallback: try chrome.aiOriginTrial
    if (typeof chrome !== 'undefined' && chrome.aiOriginTrial && chrome.aiOriginTrial.languageModel) {
        try {
            const session = await chrome.aiOriginTrial.languageModel.create({
                systemPrompt: AI_SYSTEM_PROMPT
            });
            const response = await session.prompt(userPrompt);
            session.destroy();
            return JSON.parse(response);
        } catch (e) {
            console.warn('Chrome AI trial failed:', e);
        }
    }

    // Final fallback: show the prompt for manual use with any AI tool
    throw new Error('NO_AI_AVAILABLE');
}

function initAIReader() {
    const form = document.getElementById('ai-form');
    const resultsDiv = document.getElementById('ai-results');
    const resultsContent = document.getElementById('ai-results-content');
    const confirmBtn = document.getElementById('ai-confirm-save');

    let pendingResults = null;
    let pendingFacilityId = null;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const facilityId = document.getElementById('ai-facility').value;
        const docText = document.getElementById('ai-document-text').value.trim();
        
        if (!facilityId || !docText) return;

        const facility = FACILITIES.find(f => f.id === facilityId);
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Extracting…';
        submitBtn.disabled = true;

        try {
            const results = await extractWithAI(docText, facility.name);
            pendingResults = results;
            pendingFacilityId = facilityId;
            displayAIResults(results);
        } catch (err) {
            if (err.message === 'NO_AI_AVAILABLE') {
                resultsContent.innerHTML = `
                    <div style="padding:16px; background:var(--bg-card); border-radius:var(--radius);">
                        <p style="color:var(--amber); margin-bottom:12px;">⚠️ No built-in AI available in this browser.</p>
                        <p style="color:var(--text-secondary); font-size:13px; margin-bottom:12px;">
                            Copy the prompt below and paste it into ChatGPT, Claude, or another AI tool. Then paste the JSON response back here.
                        </p>
                        <textarea readonly style="width:100%; height:200px; font-size:11px; font-family:monospace;">${AI_SYSTEM_PROMPT}\n\nUser: ${docText.substring(0, 2000)}${docText.length > 2000 ? '...' : ''}</textarea>
                        <br><br>
                        <label style="color:var(--text-secondary);">Paste AI response (JSON):
                            <textarea id="manual-ai-response" rows="6" placeholder='{"power_mw": {"value": null, ...}}'></textarea>
                        </label>
                        <button class="btn-primary" onclick="handleManualAIResponse()">Parse Response</button>
                    </div>`;
                resultsDiv.classList.remove('hidden');
            } else {
                resultsContent.innerHTML = `<p style="color:var(--red);">Error: ${escapeHtml(err.message)}</p>`;
                resultsDiv.classList.remove('hidden');
            }
        } finally {
            submitBtn.textContent = 'Extract Values';
            submitBtn.disabled = false;
        }
    });

    // Manual response handler (exposed globally)
    window.handleManualAIResponse = function() {
        try {
            const json = document.getElementById('manual-ai-response').value;
            const results = JSON.parse(json);
            pendingResults = results;
            pendingFacilityId = document.getElementById('ai-facility').value;
            displayAIResults(results);
        } catch (e) {
            alert('Could not parse JSON. Please check the format.');
        }
    };

    function displayAIResults(results) {
        let html = '';
        let hasValues = false;

        IMPACT_FIELDS.forEach(field => {
            const r = results[field.key];
            html += `<div class="ai-result-item">`;
            html += `<div class="field-name">${field.label} (${field.unit})</div>`;
            
            if (r && r.value !== null && r.quote) {
                hasValues = true;
                html += `<div class="field-value">${Number(r.value).toLocaleString()} ${field.unit}</div>`;
                html += `<div class="field-quote">"${escapeHtml(r.quote)}"</div>`;
                html += `<span class="confidence-badge ${r.confidence || 'medium'}">${r.confidence || 'medium'}</span>`;
            } else {
                html += `<p class="ai-result-null">Not found in document</p>`;
            }
            html += `</div>`;
        });

        resultsContent.innerHTML = html;
        resultsDiv.classList.remove('hidden');
        
        if (hasValues) {
            confirmBtn.classList.remove('hidden');
        } else {
            confirmBtn.classList.add('hidden');
        }
    }

    confirmBtn.addEventListener('click', () => {
        if (!pendingResults || !pendingFacilityId) return;
        
        let savedCount = 0;
        IMPACT_FIELDS.forEach(field => {
            const r = pendingResults[field.key];
            if (r && r.value !== null && r.quote) {
                try {
                    Storage.saveField(pendingFacilityId, field.key, {
                        value: r.value,
                        quote: r.quote,
                        source_url: 'AI-extracted (source document pasted by user)',
                        source_title: 'AI-extracted — awaiting source URL',
                        confidence: r.confidence || 'medium',
                        verified: false // Marked as unverified by human
                    });
                    savedCount++;
                } catch (e) {
                    console.error(`Failed to save ${field.key}:`, e);
                }
            }
        });

        updateMarkerColors();
        updateStatusBar();
        
        alert(`Saved ${savedCount} value(s). Marked as "unverified by human" until confirmed.`);
        confirmBtn.classList.add('hidden');
        pendingResults = null;
    });
}
