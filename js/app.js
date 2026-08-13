// Main application initialization

document.addEventListener('DOMContentLoaded', () => {
    // Initialize map
    initMap();
    
    // Initialize AI reader
    initAIReader();

    // Tab navigation
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(btn.dataset.tab).classList.add('active');
            
            // Invalidate map size when switching back to map tab
            if (btn.dataset.tab === 'map-tab') {
                setTimeout(() => map.invalidateSize(), 100);
            }
        });
    });

    // Search
    const searchBox = document.getElementById('search-box');
    searchBox.addEventListener('input', () => {
        const matchCount = filterMarkers(searchBox.value);
        updateStatusBar(searchBox.value, matchCount);
    });

    // Panel buttons
    document.getElementById('btn-add-data').addEventListener('click', openAddDataPanel);
    document.getElementById('btn-ai-reader').addEventListener('click', openAIPanel);
    document.getElementById('close-panel').addEventListener('click', closeAllPanels);
    document.querySelector('.close-add-panel').addEventListener('click', closeAllPanels);
    document.querySelector('.close-ai-panel').addEventListener('click', closeAllPanels);

    // Add data form submission
    document.getElementById('add-data-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const facilityId = document.getElementById('form-facility').value;
        const fieldKey = document.getElementById('form-field').value;
        const value = document.getElementById('form-value').value;
        const quote = document.getElementById('form-quote').value;
        const sourceUrl = document.getElementById('form-source-url').value;
        const sourceTitle = document.getElementById('form-source-title').value;
        const confidence = document.getElementById('form-confidence').value;

        if (!facilityId || !fieldKey || !value || !quote || !sourceUrl) {
            alert('All fields marked with * are required. A quote and source URL must be provided.');
            return;
        }

        try {
            Storage.saveField(facilityId, fieldKey, {
                value,
                quote,
                source_url: sourceUrl,
                source_title: sourceTitle,
                confidence,
                verified: true
            });

            // Update map colors
            updateMarkerColors();
            updateStatusBar();

            // Reset form
            e.target.reset();
            alert('Impact data saved successfully!');
            closeAllPanels();
        } catch (err) {
            alert('Error: ' + err.message);
        }
    });

    // Initial status bar
    updateStatusBar();

    // Keyboard shortcut: Escape closes panels
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeAllPanels();
    });
});

function updateStatusBar(query, matchCount) {
    const statusText = document.getElementById('status-text');
    const total = FACILITIES.length;
    const researched = FACILITIES.filter(f => Storage.getFilledCount(f.id) > 0).length;

    if (query && query.trim()) {
        statusText.textContent = `${matchCount} of ${total} facilities match · ${researched} have impact research`;
    } else {
        statusText.textContent = `${total} facilities · ${researched} have impact research`;
    }
}
