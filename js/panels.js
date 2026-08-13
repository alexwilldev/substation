// Panel management — detail view, add data form

function openDetailPanel(facility) {
    closeAllPanels();
    const panel = document.getElementById('detail-panel');
    const content = document.getElementById('panel-content');
    
    const data = Storage.getFacility(facility.id);
    const meta = [facility.operator, facility.city].filter(Boolean).join(' · ') || 'Unknown operator / location';

    let html = `<h2>${facility.name}</h2>`;
    html += `<p class="facility-meta">${meta}</p>`;

    IMPACT_FIELDS.forEach(field => {
        const fieldData = data[field.key];
        html += `<div class="impact-field">`;
        html += `<div class="impact-field-label">${field.label} (${field.unit})</div>`;
        
        if (fieldData && fieldData.value !== null && fieldData.quote && fieldData.source_url) {
            // Has valid sourced data
            const formattedValue = Number(fieldData.value).toLocaleString();
            html += `<div class="impact-field-value">${formattedValue} <span style="font-size:13px;color:var(--text-secondary)">${field.unit}</span></div>`;
            html += `<div class="impact-field-evidence">`;
            html += `<blockquote>"${escapeHtml(fieldData.quote)}"</blockquote>`;
            html += `<a href="${escapeHtml(fieldData.source_url)}" target="_blank" rel="noopener">${escapeHtml(fieldData.source_title || fieldData.source_url)}</a>`;
            html += `<span class="confidence-badge ${fieldData.confidence}">${fieldData.confidence}</span>`;
            if (!fieldData.verified) {
                html += `<span class="unverified-badge">unverified by human</span>`;
            }
            html += `</div>`;
        } else {
            // No data — honest empty state
            html += `<div class="impact-field-value missing">Not researched yet</div>`;
        }
        
        html += `</div>`;
    });

    content.innerHTML = html;
    panel.classList.remove('hidden');
    panel.classList.add('visible');
}

function openAddDataPanel() {
    closeAllPanels();
    const panel = document.getElementById('add-data-panel');
    populateFacilitySelect('form-facility');
    panel.classList.remove('hidden');
    panel.classList.add('visible');
}

function openAIPanel() {
    closeAllPanels();
    const panel = document.getElementById('ai-panel');
    populateFacilitySelect('ai-facility');
    panel.classList.remove('hidden');
    panel.classList.add('visible');
}

function closeAllPanels() {
    document.querySelectorAll('.panel').forEach(p => {
        p.classList.add('hidden');
        p.classList.remove('visible');
    });
}

function populateFacilitySelect(selectId) {
    const select = document.getElementById(selectId);
    select.innerHTML = '<option value="">Select facility…</option>';
    FACILITIES.forEach(f => {
        const opt = document.createElement('option');
        opt.value = f.id;
        opt.textContent = f.name;
        select.appendChild(opt);
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
