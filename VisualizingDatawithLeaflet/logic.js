// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

 // Create a map object
var myMap = L.map("map", {
  center: [ 35.7675, -117.4039],
  zoom: 8
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-basic",
  accessToken: API_KEY
}).addTo(myMap);


// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function

  addCircles(data.features);
});


function addCircles(earthquakes) {

for (var i = 0; i < earthquakes.length; i++) {

 //alert(earthquakes[i].properties.place);

 var color = "";
  if (earthquakes[i].properties.mag > 6) {
    color = "black";
  }
  else if (earthquakes[i].properties.mag  > 5) {
    color = "MidnightBlue";
  }
  else if (earthquakes[i].properties.mag  > 4) {
    color = "DarkGreen ";
  }
  else if (earthquakes[i].properties.mag  > 3) {
    color = "red";
  }
  else if (earthquakes[i].properties.mag  > 2) {
    color = "LightGoldenRodYellow ";
  }
  else if (earthquakes[i].properties.mag  > 1) {
    color = "lightsalmon ";
  }
  else {
    color = "LemonChiffon ";
  }


  var coord = [];
  coord[0] = earthquakes[i].geometry.coordinates[1];
  coord[1] = earthquakes[i].geometry.coordinates[0];
  //alert(coord);

// Add circles to map
L.circle(coord, {
  fillOpacity: 0.75,
  color: color,
  fillColor: color,
  // Adjust radius
  radius: earthquakes[i].properties.mag  * 1500
}).bindPopup("<h1>" + earthquakes[i].properties.place + "</h1> <hr> <h3>Magnitude: " + earthquakes[i].properties.mag  + "</h3>").addTo(myMap);


}



}
