/*eslint no-undef: "off"*/

let mapLayer = MQ.mapLayer();
let LMap;

const mapInitialSetup = {
    center: [30, -30],
    zoom: 3
};

LMap = L.map('mapWrapper', {
    layers: mapLayer,
    ...mapInitialSetup
});

L.control
    .layers({
        Map: mapLayer,
        Hybrid: MQ.hybridLayer(),
        Satellite: MQ.satelliteLayer(),
        Dark: MQ.darkLayer(),
        Light: MQ.lightLayer()
    })
    .addTo(LMap);

export default LMap;
