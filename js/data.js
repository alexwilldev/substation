// Facility dataset — 17 real NC data centers from OpenStreetMap
const FACILITIES = [
    {"name":"BB&T Data Center","operator":null,"city":"Zebulon","lat":35.83934,"lon":-78.32814,"id":"way/830138727"},
    {"name":"Brandaleone Lab for Data and Visualization","operator":"Duke Libraries","city":"Durham","lat":36.0031,"lon":-78.93853,"id":"node/10567817971"},
    {"name":"Flexential Charlotte - North","operator":"Flexential","city":"Charlotte","lat":35.32977,"lon":-80.76576,"id":"way/1307920829"},
    {"name":"Flexential Charlotte - South","operator":"Flexential","city":"Charlotte","lat":35.13542,"lon":-80.93683,"id":"way/215630401"},
    {"name":"Flexential Raleigh","operator":"Flexential","city":"Morrisville","lat":35.85053,"lon":-78.82914,"id":"node/12112361725"},
    {"name":"Level 3 Communications","operator":"Lumen","city":"Durham","lat":35.88136,"lon":-78.85157,"id":"node/7324132051"},
    {"name":"Meta Forest City 1","operator":"Meta","city":"Forest City","lat":35.31426,"lon":-81.82206,"id":"way/460089167"},
    {"name":"Meta Forest City 2","operator":"Meta","city":"Forest City","lat":35.31737,"lon":-81.82624,"id":"way/460089168"},
    {"name":"Meta Forest City 3","operator":"Meta","city":"Forest City","lat":35.31661,"lon":-81.82518,"id":"way/883809860"},
    {"name":"Meta Forest City 4","operator":"Meta","city":"Forest City","lat":35.31567,"lon":-81.82211,"id":"way/1109074150"},
    {"name":"SEGRA","operator":"Segra","city":"Charlotte","lat":35.18005,"lon":-80.92636,"id":"way/838817943"},
    {"name":"Segra Data Center","operator":"Segra","city":"Raleigh","lat":35.72499,"lon":-78.66236,"id":"way/233888384"},
    {"name":"Spectrum Charlotte National Data Center","operator":"Charter Communications","city":"Charlotte","lat":35.14281,"lon":-80.91622,"id":"way/516686211"},
    {"name":"T5 Charlotte Campus","operator":"T5 Data Centers","city":"Kings Mountain","lat":35.25043,"lon":-81.39504,"id":"way/715098032"},
    {"name":"TierPoint - Charlotte Data Center","operator":"TierPoint","city":"Charlotte","lat":35.1732,"lon":-80.92812,"id":"way/838817907"},
    {"name":"Windstream Communications","operator":"Windstream","city":"Durham","lat":35.8814,"lon":-78.85155,"id":"node/7324132050"},
    {"name":"iGLASS Networks","operator":"iGLASS","city":"Cary","lat":35.76675,"lon":-78.78399,"id":"way/758278314"}
];

// Impact field definitions
const IMPACT_FIELDS = [
    { key: 'power_mw', label: 'Power draw', unit: 'MW' },
    { key: 'water_gpd', label: 'Water use', unit: 'gallons/day' },
    { key: 'building_sqft', label: 'Building size', unit: 'sq ft' },
    { key: 'campus_acres', label: 'Campus size', unit: 'acres' },
    { key: 'noise_dba', label: 'Noise at property line', unit: 'dBA' }
];

// Pre-populated sourced impact data
// Every value has a verbatim quote and source URL as required by app rules.
// NOTE: Water figure for Meta Forest City is campus-wide annual (16.6M gal/yr ÷ 365 = 45,479 GPD).
const SEED_DATA = {
    // === BB&T Data Center (Zebulon) ===
    "way/830138727": {
        power_mw: {
            value: 4,
            quote: "Four 2.2 MW generators and combined 8.8 MW of energy. 4MW critical IT load.",
            source_url: "https://aeieng.com/markets/project/bbt-primary-data-center",
            source_title: "Affiliated Engineers – BB&T Primary Data Center",
            confidence: "high",
            verified: true,
            added_at: "2026-08-13T00:00:00Z"
        },
        building_sqft: {
            value: 150000,
            quote: "Building Size 150,000 square feet",
            source_url: "https://aeieng.com/markets/project/bbt-primary-data-center",
            source_title: "Affiliated Engineers – BB&T Primary Data Center",
            confidence: "high",
            verified: true,
            added_at: "2026-08-13T00:00:00Z"
        },
        campus_acres: {
            value: 49.4,
            quote: "The project involves the construction of a 232,226m2 data center on 20ha of land.",
            source_url: "https://www.globaldata.com/store/report/bbt-zebulon-data-center-north-carolina-2/",
            source_title: "GlobalData – BBT Zebulon Data Center North Carolina",
            confidence: "medium",
            verified: true,
            added_at: "2026-08-13T00:00:00Z"
        }
    },

    // === Brandaleone Lab (Duke) ===
    "node/10567817971": {
        power_mw: {
            value: 1.5,
            quote: "It will initially draw 1.5 megawatts, Duke said, with space to double.",
            source_url: "https://www.msn.com/en-us/technology/cloud-computing/can-duke-university-s-small-data-center-ever-be-small-enough-for-critics-in-durham/ar-AA24Rrmn",
            source_title: "MSN – Can Duke University's small data center ever be small enough for critics in Durham?",
            confidence: "high",
            verified: true,
            added_at: "2026-08-13T00:00:00Z"
        }
    },

    // === Flexential Charlotte - North ===
    "way/1307920829": {
        power_mw: {
            value: 3.0,
            quote: "Flexential Charlotte - North Data Center is located at 10105 David Taylor Drive, Charlotte, NC, USA. The data center is 62589 sqft. There is a total of 10000 sqft in raised floor space for colocation. It has access to 3.0 MW of power.",
            source_url: "https://www.datacenters.com/flexential-charlotte-north",
            source_title: "datacenters.com – Flexential Charlotte - North",
            confidence: "high",
            verified: true,
            added_at: "2026-08-13T00:00:00Z"
        },
        building_sqft: {
            value: 62589,
            quote: "Flexential Charlotte - North Data Center is located at 10105 David Taylor Drive, Charlotte, NC, USA. The data center is 62589 sqft.",
            source_url: "https://www.datacenters.com/flexential-charlotte-north",
            source_title: "datacenters.com – Flexential Charlotte - North",
            confidence: "high",
            verified: true,
            added_at: "2026-08-13T00:00:00Z"
        }
    },

    // === Flexential Charlotte - South ===
    "way/215630401": {
        power_mw: {
            value: 2.0,
            quote: "Flexential Charlotte - South Data Center is located at 8910 Lenox Pointe Drive, Charlotte, NC, USA. The data center is 66666 sqft. There is a total of 13600 sqft in raised floor space for colocation. It has access to 2.0 MW of power.",
            source_url: "https://datacenters.com/flexential-charlotte-south",
            source_title: "datacenters.com – Flexential Charlotte - South",
            confidence: "high",
            verified: true,
            added_at: "2026-08-13T00:00:00Z"
        },
        building_sqft: {
            value: 66666,
            quote: "Flexential Charlotte - South Data Center is located at 8910 Lenox Pointe Drive, Charlotte, NC, USA. The data center is 66666 sqft.",
            source_url: "https://datacenters.com/flexential-charlotte-south",
            source_title: "datacenters.com – Flexential Charlotte - South",
            confidence: "high",
            verified: true,
            added_at: "2026-08-13T00:00:00Z"
        }
    },

    // === Flexential Raleigh ===
    "node/12112361725": {
        power_mw: {
            value: 4.3,
            quote: "Flexential currently has one data center in the Raleigh area; a 100,000 sq ft (9,300 sqm), 4.3MW facility located at 5150 McCrimmon Parkway in Morrisville that was previously a Peak10 facility prior to its rebrand to Flexential in 2018.",
            source_url: "https://www.datacenterdynamics.com/en/news/flexential-is-planning-a-new-data-center-in-raleigh-north-carolina/",
            source_title: "Data Center Dynamics – Flexential planning new Raleigh data center",
            confidence: "high",
            verified: true,
            added_at: "2026-08-13T00:00:00Z"
        },
        building_sqft: {
            value: 99976,
            quote: "Flexential Raleigh Data Center is located at 5150 McCrimmon Parkway #423, Morrisville, NC 27560, USA. The data center is 99976 sqft.",
            source_url: "https://datacenters.com/flexential-raleigh",
            source_title: "datacenters.com – Flexential Raleigh",
            confidence: "high",
            verified: true,
            added_at: "2026-08-13T00:00:00Z"
        }
    },

    // === Meta Forest City 1 ===
    "way/460089167": {
        power_mw: {
            value: 30,
            quote: "The Meta Data Center at Forest City provides 30MW of power with 500,000 Building Square Footage.",
            source_url: "https://www.pase.com/projects/meta-data-center-at-forest-city/",
            source_title: "PASE – Meta Data Center at Forest City",
            confidence: "high",
            verified: true,
            added_at: "2026-08-13T00:00:00Z"
        },
        water_gpd: {
            value: 45479,
            quote: "the Forest City data centers consume 492,786 MWh of electricity annually and withdraw 16.6 million gallons (62.9 million liters) of water per year.",
            source_url: "https://www.baxtel.com/data-center/facebook-forest-city",
            source_title: "Baxtel – Meta Forest City Campus (16.6M gal/yr ÷ 365 = 45,479 GPD campus-wide)",
            confidence: "medium",
            verified: true,
            added_at: "2026-08-13T00:00:00Z"
        },
        building_sqft: {
            value: 500000,
            quote: "The Meta Data Center at Forest City provides 30MW of power with 500,000 Building Square Footage.",
            source_url: "https://www.pase.com/projects/meta-data-center-at-forest-city/",
            source_title: "PASE – Meta Data Center at Forest City",
            confidence: "high",
            verified: true,
            added_at: "2026-08-13T00:00:00Z"
        },
        campus_acres: {
            value: 160,
            quote: "The facility sits on 160 acres of land. The building encompasses 500,000 square feet.",
            source_url: "https://cleanview.co/public/data-centers/north-carolina/1051/forest-city-data-center",
            source_title: "CleanView – Forest City Data Center",
            confidence: "high",
            verified: true,
            added_at: "2026-08-13T00:00:00Z"
        }
    },

    // === Meta Forest City 2 ===
    "way/460089168": {
        building_sqft: {
            value: 482258,
            quote: "The building encompasses 482,258 square feet.",
            source_url: "https://www.cleanview.co/data-centers/north-carolina/3010/meta-forest-city---building-1",
            source_title: "CleanView – Meta Forest City Building",
            confidence: "high",
            verified: true,
            added_at: "2026-08-13T00:00:00Z"
        },
        campus_acres: {
            value: 160,
            quote: "The facility sits on 160 acres of land. The building encompasses 500,000 square feet.",
            source_url: "https://cleanview.co/public/data-centers/north-carolina/1051/forest-city-data-center",
            source_title: "CleanView – Forest City Data Center (shared campus)",
            confidence: "medium",
            verified: true,
            added_at: "2026-08-13T00:00:00Z"
        }
    },

    // === Meta Forest City 3 ===
    "way/883809860": {
        building_sqft: {
            value: 480000,
            quote: "The 3rd building on the campus was a capital investment in excess of $200 million for the construction of a new 480,000 SF data center facility on the existing campus",
            source_url: "https://www.baxtel.com/data-center/facebook-forest-city",
            source_title: "Baxtel – Meta Forest City Campus Data Center",
            confidence: "high",
            verified: true,
            added_at: "2026-08-13T00:00:00Z"
        },
        campus_acres: {
            value: 160,
            quote: "The facility sits on 160 acres of land. The building encompasses 500,000 square feet.",
            source_url: "https://cleanview.co/public/data-centers/north-carolina/1051/forest-city-data-center",
            source_title: "CleanView – Forest City Data Center (shared campus)",
            confidence: "medium",
            verified: true,
            added_at: "2026-08-13T00:00:00Z"
        }
    },

    // === Meta Forest City 4 ===
    "way/1109074150": {
        campus_acres: {
            value: 160,
            quote: "The facility sits on 160 acres of land. The building encompasses 500,000 square feet.",
            source_url: "https://cleanview.co/public/data-centers/north-carolina/1051/forest-city-data-center",
            source_title: "CleanView – Forest City Data Center (shared campus)",
            confidence: "medium",
            verified: true,
            added_at: "2026-08-13T00:00:00Z"
        }
    },

    // === SEGRA Charlotte ===
    "way/838817943": {
        power_mw: {
            value: 2.0,
            quote: "Segra Charlotte Two Data Center is located at 3101 International Airport Drive, Charlotte, NC, USA. The data center is 28000 sqft. There is a total of 14032 sqft in raised floor space for colocation. It has access to 2.0 MW of power.",
            source_url: "https://datacenters.com/segra-charlotte-two",
            source_title: "datacenters.com – Segra Charlotte Two",
            confidence: "high",
            verified: true,
            added_at: "2026-08-13T00:00:00Z"
        },
        building_sqft: {
            value: 28000,
            quote: "Segra Charlotte Two Data Center is located at 3101 International Airport Drive, Charlotte, NC, USA. The data center is 28000 sqft.",
            source_url: "https://datacenters.com/segra-charlotte-two",
            source_title: "datacenters.com – Segra Charlotte Two",
            confidence: "high",
            verified: true,
            added_at: "2026-08-13T00:00:00Z"
        }
    },

    // === Segra Data Center (Raleigh) ===
    "way/233888384": {
        power_mw: {
            value: 2.0,
            quote: "Segra Raleigh Data Center is located at 2100 Garner Station Boulevard, Raleigh, NC, USA. The data center is 50000 sqft. There is a total of 7800 sqft in raised floor space for colocation. It has access to 2.0 MW of power.",
            source_url: "https://datacenters.com/segra-raleigh",
            source_title: "datacenters.com – Segra Raleigh",
            confidence: "high",
            verified: true,
            added_at: "2026-08-13T00:00:00Z"
        },
        building_sqft: {
            value: 50000,
            quote: "Segra Raleigh Data Center is located at 2100 Garner Station Boulevard, Raleigh, NC, USA. The data center is 50000 sqft.",
            source_url: "https://datacenters.com/segra-raleigh",
            source_title: "datacenters.com – Segra Raleigh",
            confidence: "high",
            verified: true,
            added_at: "2026-08-13T00:00:00Z"
        }
    },

    // === Spectrum Charlotte National Data Center ===
    "way/516686211": {
        power_mw: {
            value: 20,
            quote: "The generator plant consists of four 500 KW Generators with ultimate design of eight 2500 kW generators or enough power for over 10,000 homes.",
            source_url: "https://baxtel.com/data-center/spectrum-charlotte-national-data-center",
            source_title: "Baxtel – Spectrum Charlotte National Data Center (ultimate design 8×2500kW = 20MW generator capacity)",
            confidence: "medium",
            verified: true,
            added_at: "2026-08-13T00:00:00Z"
        }
    },

    // === T5 Charlotte Campus ===
    "way/715098032": {
        power_mw: {
            value: 4.0,
            quote: "T5 Data Centers @Charlotte Data Center Campus is located at 131 Riverside Ct, Kings Mountain, NC, USA. The data center is 150000 sqft. There is a total of 68000 sqft in raised floor space for colocation. It has access to 4.0 MW of power.",
            source_url: "https://www.datacenters.com/t5-charlotte-campus",
            source_title: "datacenters.com – T5 Charlotte Campus",
            confidence: "high",
            verified: true,
            added_at: "2026-08-13T00:00:00Z"
        },
        building_sqft: {
            value: 150000,
            quote: "T5 Data Centers @Charlotte Data Center Campus is located at 131 Riverside Ct, Kings Mountain, NC, USA. The data center is 150000 sqft.",
            source_url: "https://www.datacenters.com/t5-charlotte-campus",
            source_title: "datacenters.com – T5 Charlotte Campus",
            confidence: "high",
            verified: true,
            added_at: "2026-08-13T00:00:00Z"
        },
        campus_acres: {
            value: 280,
            quote: "The T5@Kings Mountain data center campus features turn-key, power shell and build-to-suit options within the 280-acre campus.",
            source_url: "https://t5datacenters.com/resources/t5-data-centers-signs-lease-with-financial-services-customer-at-t5kings-mountain-campus/",
            source_title: "T5 Data Centers – Signs Lease with Financial Services Customer",
            confidence: "high",
            verified: true,
            added_at: "2026-08-13T00:00:00Z"
        }
    },

    // === TierPoint Charlotte ===
    "way/838817907": {
        power_mw: {
            value: 2.0,
            quote: "TierPoint Charlotte - Center Park Data Center is located at 1805 Center Park Drive, Charlotte, NC, USA. The data center is 60000 sqft. There is a total of 20000 sqft in raised floor space for colocation. It has access to 2.0 MW of power.",
            source_url: "https://www.datacenters.com/tierpoint-charlotte-center-park",
            source_title: "datacenters.com – TierPoint Charlotte Center Park",
            confidence: "high",
            verified: true,
            added_at: "2026-08-13T00:00:00Z"
        },
        building_sqft: {
            value: 60000,
            quote: "TierPoint Charlotte - Center Park Data Center is located at 1805 Center Park Drive, Charlotte, NC, USA. The data center is 60000 sqft.",
            source_url: "https://www.datacenters.com/tierpoint-charlotte-center-park",
            source_title: "datacenters.com – TierPoint Charlotte Center Park",
            confidence: "high",
            verified: true,
            added_at: "2026-08-13T00:00:00Z"
        }
    },

    // === Windstream Communications (Durham) ===
    "node/7324132050": {
        building_sqft: {
            value: 22000,
            quote: "The 22,000 square foot facility in Durham will be expandable to 88,000 square feet, and will be built as a Tier III facility.",
            source_url: "https://www.datacenterknowledge.com/business/windstream-to-open-third-north-carolina-data-center",
            source_title: "Data Center Knowledge – Windstream To Open Third North Carolina Data Center",
            confidence: "high",
            verified: true,
            added_at: "2026-08-13T00:00:00Z"
        },
        power_mw: {
            value: 2.5,
            quote: "The standalone facility, leased by Windstream Hosted solutions, is the company's standard 22,000 sq ft product, providing 10,000 sq ft of raised floor. It features 2500 kVA of utility capacity and 300 tons of cooling.",
            source_url: "https://www.datacenterdynamics.com/en/news/compass-completes-second-modular-data-center-for-windstream/",
            source_title: "Data Center Dynamics – Compass completes second modular data center for Windstream (2500 kVA ≈ 2.5 MW at unity PF)",
            confidence: "medium",
            verified: true,
            added_at: "2026-08-13T00:00:00Z"
        }
    }
};

// Seed data into localStorage on first load if not already present
(function seedInitialData() {
    const SEED_VERSION = 'v3'; // bump when seed data changes
    const versionKey = 'substation_seed_version';
    const existingVersion = localStorage.getItem(versionKey);
    
    // If seed version changed, re-seed all data
    if (existingVersion !== SEED_VERSION) {
        localStorage.setItem('substation_impact_data', JSON.stringify(SEED_DATA));
        localStorage.setItem(versionKey, SEED_VERSION);
        return;
    }
    
    // Otherwise, only fill missing entries
    const existing = JSON.parse(localStorage.getItem('substation_impact_data') || '{}');
    let changed = false;
    
    for (const [facilityId, fields] of Object.entries(SEED_DATA)) {
        if (!existing[facilityId]) {
            existing[facilityId] = {};
        }
        for (const [fieldKey, fieldData] of Object.entries(fields)) {
            if (!existing[facilityId][fieldKey]) {
                existing[facilityId][fieldKey] = fieldData;
                changed = true;
            }
        }
    }
    
    if (changed) {
        localStorage.setItem('substation_impact_data', JSON.stringify(existing));
    }
})();
