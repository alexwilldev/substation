// Map initialization and marker management

let map;
let markers = [];

const COLORS = {
    green: '#34d399',
    amber: '#fbbf24',
    grey: '#64748b'
};

function initMap() {
    map = L.map('map', {
        center: [35.5, -79.5],
        zoom: 7,
        zoomControl: true,
        attributionControl: true
    });

    // Dark tile layer — CARTO Dark Matter
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);

    // Create markers for each facility
    FACILITIES.forEach(facility => {
        const color = COLORS[Storage.getStatusColor(facility.id)];
        const marker = L.circleMarker([facility.lat, facility.lon], {
            radius: 7,
            fillColor: color,
            color: color,
            weight: 1.5,
            opacity: 0.9,
            fillOpacity: 0.55,
            className: 'facility-dot'
        }).addTo(map);

        // Tooltip on hover
        marker.bindTooltip(facility.name, {
            className: 'facility-tooltip',
            direction: 'top',
            offset: [0, -10]
        });

        // Hover effect
        marker.on('mouseover', function() {
            this.setStyle({ radius: 10, fillOpacity: 0.85, weight: 2.5 });
        });
        marker.on('mouseout', function() {
            const isFiltered = this.options.opacity < 0.5;
            this.setStyle({
                radius: 7,
                fillOpacity: isFiltered ? 0.08 : 0.55,
                weight: 1.5
            });
        });

        // Click to open detail panel
        marker.on('click', () => openDetailPanel(facility));

        marker.facilityId = facility.id;
        marker.facilityData = facility;
        markers.push(marker);
    });
}

function updateMarkerColors() {
    markers.forEach(marker => {
        const color = COLORS[Storage.getStatusColor(marker.facilityId)];
        marker.setStyle({ fillColor: color, color: color });
    });
}

function filterMarkers(query) {
    const q = query.toLowerCase().trim();
    let matchCount = 0;

    markers.forEach(marker => {
        const f = marker.facilityData;
        const searchable = [
            f.name,
            f.operator || '',
            f.city || ''
        ].join(' ').toLowerCase();

        const matches = !q || searchable.includes(q);
        marker.setStyle({
            opacity: matches ? 0.9 : 0.15,
            fillOpacity: matches ? 0.55 : 0.06
        });
        if (matches) matchCount++;
    });

    return matchCount;
}
