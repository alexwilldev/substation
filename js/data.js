// Facility dataset — 17 real NC data centers from OpenStreetMap
const FACILITIES = [
    {"name":"BB&T Data Center","operator":null,"city":null,"lat":35.83934,"lon":-78.32814,"id":"way/830138727"},
    {"name":"Brandaleone Lab for Data and Visualization","operator":"Duke Libraries","city":null,"lat":36.0031,"lon":-78.93853,"id":"node/10567817971"},
    {"name":"Flexential Charlotte - North","operator":"Flexential","city":"Charlotte","lat":35.32977,"lon":-80.76576,"id":"way/1307920829"},
    {"name":"Flexential Charlotte - South","operator":"Flexential","city":"Charlotte","lat":35.13542,"lon":-80.93683,"id":"way/215630401"},
    {"name":"Flexential Raleigh","operator":"Flexential","city":"Morrisville","lat":35.85053,"lon":-78.82914,"id":"node/12112361725"},
    {"name":"Level 3 Communications","operator":null,"city":"Durham","lat":35.88136,"lon":-78.85157,"id":"node/7324132051"},
    {"name":"Meta Forest City 1","operator":"Meta","city":"Forest City","lat":35.31426,"lon":-81.82206,"id":"way/460089167"},
    {"name":"Meta Forest City 2","operator":"Meta","city":"Forest City","lat":35.31737,"lon":-81.82624,"id":"way/460089168"},
    {"name":"Meta Forest City 3","operator":"Meta","city":"Forest City","lat":35.31661,"lon":-81.82518,"id":"way/883809860"},
    {"name":"Meta Forest City 4","operator":"Meta","city":"Forest City","lat":35.31567,"lon":-81.82211,"id":"way/1109074150"},
    {"name":"SEGRA","operator":null,"city":"Charlotte","lat":35.18005,"lon":-80.92636,"id":"way/838817943"},
    {"name":"Segra Data Center","operator":null,"city":"Raleigh","lat":35.72499,"lon":-78.66236,"id":"way/233888384"},
    {"name":"Spectrum Charlotte National Data Center","operator":null,"city":"Charlotte","lat":35.14281,"lon":-80.91622,"id":"way/516686211"},
    {"name":"T5 Charlotte Campus","operator":null,"city":"Kings Mountain","lat":35.25043,"lon":-81.39504,"id":"way/715098032"},
    {"name":"TierPoint - Charlotte Data Center","operator":"TierPoint","city":null,"lat":35.1732,"lon":-80.92812,"id":"way/838817907"},
    {"name":"Windstream Communications","operator":null,"city":"Durham","lat":35.8814,"lon":-78.85155,"id":"node/7324132050"},
    {"name":"iGLASS Networks","operator":null,"city":"Cary","lat":35.76675,"lon":-78.78399,"id":"way/758278314"}
];

// Impact field definitions
const IMPACT_FIELDS = [
    { key: 'power_mw', label: 'Power draw', unit: 'MW' },
    { key: 'water_gpd', label: 'Water use', unit: 'gallons/day' },
    { key: 'building_sqft', label: 'Building size', unit: 'sq ft' },
    { key: 'campus_acres', label: 'Campus size', unit: 'acres' },
    { key: 'noise_dba', label: 'Noise at property line', unit: 'dBA' }
];
