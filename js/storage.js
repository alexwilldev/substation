// Storage layer — uses localStorage so data persists across sessions
// and is shared among users on the same device. In a production version
// this would be backed by a shared database.

const STORAGE_KEY = 'substation_impact_data';

const Storage = {
    /**
     * Get all impact data. Returns object keyed by facility ID, e.g.:
     * { "way/830138727": { power_mw: { value, quote, source_url, source_title, confidence, verified, added_at } } }
     */
    getAll() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
        } catch {
            return {};
        }
    },

    /**
     * Get impact data for a single facility
     */
    getFacility(facilityId) {
        const all = this.getAll();
        return all[facilityId] || {};
    },

    /**
     * Save a single impact field for a facility.
     * Enforces the core rule: quote and source_url are required.
     */
    saveField(facilityId, fieldKey, { value, quote, source_url, source_title, confidence, verified }) {
        if (!quote || !source_url) {
            throw new Error('Quote and source URL are required. Unsourced data cannot be saved.');
        }
        if (value === null || value === undefined || value === '') {
            throw new Error('A numeric value is required.');
        }

        const all = this.getAll();
        if (!all[facilityId]) all[facilityId] = {};
        
        all[facilityId][fieldKey] = {
            value: Number(value),
            quote: quote.trim(),
            source_url: source_url.trim(),
            source_title: (source_title || '').trim(),
            confidence: confidence || 'medium',
            verified: verified !== undefined ? verified : true,
            added_at: new Date().toISOString()
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
        return all[facilityId][fieldKey];
    },

    /**
     * Count how many impact fields are filled for a facility
     */
    getFilledCount(facilityId) {
        const data = this.getFacility(facilityId);
        return Object.keys(data).filter(k => IMPACT_FIELDS.some(f => f.key === k)).length;
    },

    /**
     * Get the color class for a facility based on research completeness
     */
    getStatusColor(facilityId) {
        const count = this.getFilledCount(facilityId);
        if (count === 5) return 'green';
        if (count > 0) return 'amber';
        return 'grey';
    }
};
