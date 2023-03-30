//Earthquake API URL
const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson"

//Create the map
let myMap = L.map("map", {
    center: [0, 0],
    zoom: 6
});
  
//Add the map view
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

//Create the layer for the earthquakes to be added to
var earthquakes = L.layerGroup().addTo(myMap)

//Read the API
d3.json(url).then(function(data){

    //Create a loop for each geojson feature
    data.features.forEach(function(feature){
        var magnitude = feature.properties.mag;
        var lat = feature.geometry.coordinates[1];
        var lng = feature.geometry.coordinates[0];
        var depth = feature.geometry.coordinates[2];
        var loc = feature.properties.place;

        //Create the market
        circle = L.circleMarker([lat, lng], {
            radius: magnitude * 10,
            color: getColour(depth),
            fillOpacity: 0.5,
            weight:1
        });

        circle.bindPopup("Place: " + loc + "<br>Magnitude: " + magnitude + "<br>Depth: " + depth);

        earthquakes.addLayer(circle);
    });
});

//Map the colour based on the depth of the earthquake
function getColour(depth) {
    return depth > 90
      ? "#634D8E"
      : depth > 70
      ? "#8E5B91"
      : depth > 50
      ? "#C76B8F"
      : depth > 30
      ? "#DC828E"
      : depth > 10
      ? "#EC988E"
      : "#FFCC99";
  }