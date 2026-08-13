# Substation ⚡

**Data centers in North Carolina, and what they draw from the places around them.**

[Live Demo →](https://alexwilliams.github.io/substation/)

---

## What is this?

Data centers are being built across North Carolina faster than communities can evaluate them. When one is proposed nearby, people want to know what it will draw from the area — how much electricity, how much water for cooling, how loud it will be at the property line.

Those figures exist but they're buried in county permit filings, utility rate cases, and local news coverage. No database collects them. **This app is that database, built in public.**

## Features

- **Interactive map** of 17 real NC data centers (from OpenStreetMap)
- **Five impact metrics** per facility: power draw (MW), water use (gallons/day), building size (sq ft), campus size (acres), noise at property line (dBA)
- **Strict sourcing rules**: Every number must have a verbatim quoted sentence and a source URL. No estimates, no averages, no industry benchmarks.
- **Community contributions**: Add impact data with required source citations
- **AI document reader**: Paste a permit filing or news article to extract impact values with verbatim quotes
- **Environmental Risk Score** framework (0–100) based on energy intensity, water stress, land/habitat, noise, and community burden
- **Impact radius forecasting** model based on facility power capacity, cooling type, and terrain
- **Data sources catalog**: Public APIs, satellite imagery, USGS/EPA databases, and open spatial datasets

## Principles

1. No estimates. No averages. No industry benchmarks filling empty fields.
2. An empty field is honest. A plausible guess is a fabrication about a real building in a real neighborhood.
3. Every number must have a quoted source sentence and a URL. If it doesn't, it's not shown.

## Tech Stack

- Pure HTML/CSS/JavaScript (no build step, no framework)
- [Leaflet](https://leafletjs.com/) for mapping (CDN)
- [CARTO Dark Matter](https://carto.com/basemaps/) tiles
- localStorage for data persistence
- Chrome Built-in AI / Prompt API for document extraction (with manual fallback)

## Data Sources

| Category | Sources |
|----------|---------|
| Geospatial | OpenStreetMap, USGS National Map, Census TIGER/Line, NLCD |
| Water | USGS NWIS, EPA ECHO, NC DEQ, WRI Aqueduct |
| Energy | EIA-860/861, EPA eGRID, HIFLD, NC Utilities Commission |
| Permits | County GIS portals, NC OneMap, FEMA NFHL |
| Satellite | Sentinel-2, Landsat, VIIRS Night Lights, OpenAerialMap |

## Deployment

This is a static site. Deploy with GitHub Pages:

1. Push to a GitHub repository
2. Go to Settings → Pages → Source: Deploy from branch (`main`, root `/`)
3. The site will be live at `https://<username>.github.io/substation/`

## Data Attribution

- **Facility locations**: © OpenStreetMap contributors, ODbL licensed
- **Impact data**: Extracted from public documents, each figure links to its source
- **Basemap**: © CARTO, © OpenStreetMap contributors

## License

Code: MIT  
Data contributions: CC BY-SA 4.0
