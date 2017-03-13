
// Initializing the map
// let mainMap = L.map('mapWrapper').setView([51.505, -0.09], 13);

// L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(mainMap);

let mapLayer = MQ.mapLayer(), mainMap;

mainMap = L.map('mapWrapper', {
    layers: mapLayer,
    center: [ 40.731701, -73.993411 ],
    zoom: 12
});

L.control.layers({
  'Map': mapLayer,
  'Hybrid': MQ.hybridLayer(),
  'Satellite': MQ.satelliteLayer(),
  'Dark': MQ.darkLayer(),
  'Light': MQ.lightLayer()
}).addTo(mainMap);

export default mainMap;
