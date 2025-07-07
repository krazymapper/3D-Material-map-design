# TERESMA Produits Terroir Information

## Summary

This project consists of a series of interactive maps (cartes) displaying geographical data about local products (produits du terroir) in France. Each map has different features such as overlapping locations with color fills, tooltips, zooming/panning capabilities, and filtering options.

## Structure

- **js/**: Contains JavaScript files for map functionality and libraries
  - Custom code files (code_carte1_02.js, etc.)
  - Libraries (d3.min.js, jquery.js, topojson.min.js, etc.)
- **json/**: Contains GeoJSON data files for map rendering
  - Base map (fond.geojson)
  - Location data (lieux.geojson, lieux_aplat.geojson, etc.)
- **styles/**: CSS files for each map
- **archives/**: Previous versions of code and data files
- **captures_ecran/**: Screenshot files

## Language & Runtime

**Language**: JavaScript (Frontend)
**Libraries**:

- D3.js (Data visualization)
- jQuery (DOM manipulation)
- TopoJSON (Geographic data handling)
- Queue.js (Asynchronous loading)

## Main Components

The project consists of 5 interactive maps, each with different features:

### carte1.html

- Overlapping locations with color fills
- Tooltips showing number of overlapping locations
- Mouse zoom and pan functionality

### carte2.html

- Overlapping locations with color fills
- Scale diversity with figures
- Source selection via dropdown
- Tooltips with location names
- Highlighting of selected locations
- Mouse zoom and pan functionality

### carte3.html

- Overlapping locations with color fills
- Proportional circles for dairy products
- Source selection via dropdown
- Highlighting of selected locations
- Tooltips with location name and number of dairy products
- Mouse zoom and pan functionality

### carte4.html & carte5.html

- Product categories shown as offset points with colors
- Category selection via dropdown
- Highlighting of selected locations
- Tooltips with location name, category name, and number of products
- Mouse zoom and pan functionality

## Data Structure

The application uses GeoJSON files for geographical data:

- **fond.geojson**: Base map of France
- **lieux.geojson**: Location data
- **lieux_aplat.geojson**: Location data with fill information
- **lieux_centroides.geojson**: Centroid points for locations
- Various specialized data files for different sources (AAPRA, Cadet, Leclerc)

## Visualization Techniques

- **Lambert-93 Projection**: Used for accurate representation of France
- **Color Scales**: Linear scales for representing data intensity
- **Interactive Elements**: Tooltips, highlighting, zoom/pan functionality
- **Filtering**: Dropdown selection for data sources and categories

## Usage

Each HTML file can be opened directly in a web browser to display the corresponding interactive map. No server-side components or build process is required as this is a client-side only application.
