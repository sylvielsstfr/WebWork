// Examples from maptiler taken from https://docs.maptiler.com/sdk-js/examples/countries-with-own-data/
//map.on("load", function () {});

// Create vector source. The following snippet creates vector source for the MapTiler Countries dataset.
map.on("load", function () {
  map.addSource("statesData", {
    type: "vector",
    url: `https://api.maptiler.com/tiles/countries/tiles.json`,
  });
});
//Get the id of the first symbol layer. We want to include the vector layer below the map labels. That means we need to know the id of the first symbol layer so we can include the vector layer before this layer.

// Find the id of the first symbol layer in the map style
const layers = map.getStyle().layers;
const firstSymbolId = layers.find((layer) => layer.type === "symbol").id;

//Add the vector layer. We need to include firsSymbolId to the map.addLayer function to display the vector under the maps labels

map.addLayer(
  {
    id: "countries",
    source: "statesData",
    "source-layer": "administrative",
    type: "fill",
    paint: {
      "fill-color": "#6B7C93",
      "fill-opacity": 1,
      "fill-outline-color": "#000",
    },
  },
  firstSymbolId
);

//Filter the data to only show the countries. Add a filter to the layer to only display level 0 items.

map.addLayer(
  {
    id: "countries",
    source: "statesData",
    "source-layer": "administrative",
    type: "fill",
    filter: ["==", "level", 0],
    paint: {
      "fill-color": "#6B7C93",
      "fill-opacity": 1,
      "fill-outline-color": "#000",
    },
  },
  firstSymbolId
);

//Prepare your data. Each feature in the dataset has its own identification for pairing. You need to mark your data with the same identifiers as is stored by features. We will use the iso_n3 identifier for countries. Alternatively, you can use one of the properties: name, country codes (ISO A2), or wiki data-id. Check out the Countries dataset schema to see the available fields.

const vizData = {
  8: { name: "Albania", population: 2829741 },
  40: { name: "Austria", population: 8932664 },
  56: { name: "Belgium", population: 11566041 },
  100: { name: "Bulgaria", population: 6916548 },
  191: { name: "Croatia", population: 4036355 },
  196: { name: "Cyprus", population: 896005 },
  203: { name: "Czechia", population: 10701777 },
  208: { name: "Denmark", population: 5840045 },
  233: { name: "Estonia", population: 1330068 },
  246: { name: "Finland", population: 5533793 },
  250: { name: "France", population: 67439599 },
  276: { name: "Germany", population: 83155031 },
  300: { name: "Greece", population: 10682547 },
  348: { name: "Hungary", population: 9730772 },
  352: { name: "Iceland", population: 368792 },
  372: { name: "Ireland", population: 5006907 },
  380: { name: "Italy", population: 59257566 },
  428: { name: "Latvia", population: 1893223 },
  438: { name: "Liechtenstein", population: 39055 },
  440: { name: "Lithuania", population: 2795680 },
  442: { name: "Luxembourg", population: 634730 },
  470: { name: "Malta", population: 516100 },
  499: { name: "Montenegro", population: 620739 },
  528: { name: "Netherlands", population: 17475415 },
  578: { name: "Norway", population: 5391369 },
  616: { name: "Poland", population: 37840001 },
  620: { name: "Portugal", population: 10298252 },
  642: { name: "Romania", population: 19186201 },
  688: { name: "Serbia", population: 6871547 },
  703: { name: "Slovakia", population: 5459781 },
  705: { name: "Slovenia", population: 2108977 },
  724: { name: "Spain", population: 47394223 },
  752: { name: "Sweden", population: 10379295 },
  756: { name: "Switzerland", population: 8667088 },
  792: { name: "Turkey", population: 83614362 },
  807: { name: "North Macedonia", population: 2068808 },
};

//Join the data to coresponding features. Use querySourceFeatures to get all features from the layer for visualization. We are also filtering for all countries with ['==', 'level', 0] using style expressions. The second part of the following code goes throw these features and adds attributes from our data array (vizData) to relevant features.

function setStates() {
  const countries = map.querySourceFeatures("statesData", {
    sourceLayer: "administrative",
    filter: ["all", ["==", "level", 0]],
  });
  countries.forEach((country) => {
    if (country.id && vizData[country.id]) {
      map.setFeatureState(
        {
          source: "statesData",
          sourceLayer: "administrative",
          id: country.id,
        },
        {
          population: vizData[country.id].population,
        }
      );
    }
  });
  if (countries.length !== 0) {
    map.off("data", afterLoad);
  }
}

// Create a function that validates that the country dataset is loaded to call the setStates function.
function afterLoad() {
  if (map.getSource("statesData") && map.isSourceLoaded("statesData")) {
    setStates();
  }
}

// Add event handler for map data event. Call the afterLoad function
map.on("data", afterLoad);

//Create a choropleth map based on the population attribute. Change the fill-color property of the layer.
map.addLayer(
  {
    id: "countries",
    source: "statesData",
    "source-layer": "administrative",
    type: "fill",
    filter: ["==", "level", 0],
    paint: {
      "fill-color": [
        "case",
        ["!=", ["to-number", ["feature-state", "population"]], 0],
        [
          "interpolate",
          ["linear"],
          ["feature-state", "population"],
          5000000,
          "rgba(222,235,247,1)",
          90000000,
          "rgba(49,130,189,1)",
        ],
        "rgba(0, 0, 0, 0)",
      ],
      "fill-opacity": 1,
      "fill-outline-color": "#000",
    },
  },
  firstSymbolId
);

//Display a popup when clicking on the vector layer and show the information of the age attribute.
map.on("click", "countries", function (e) {
  new maptilersdk.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      `<h3>Population</h3><p>${e.features[0].state.population.toLocaleString()}</p>`
    )
    .addTo(map);
});

//To make our map more user friendly, we will change the cursor when hovering over a geometry in the vector layer to indicate to the user that they can click on it.
// Change the cursor to a pointer when the mouse is over the layer.
map.on("mouseenter", "countries", function () {
  map.getCanvas().style.cursor = "pointer";
});

// Change it back to a pointer when it leaves.
map.on("mouseleave", "countries", function () {
  map.getCanvas().style.cursor = "";
});
