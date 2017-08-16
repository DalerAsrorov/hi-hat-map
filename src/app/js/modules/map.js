/*eslint no-undef: "off"*/

let mapLayer = MQ.mapLayer();
let LMap;

const mapInitialSetup = {
    center: [40.731701, -73.993411],
    zoom: 8
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

export function navigateToUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            const latLng = L.latLng(latitude, longitude);
            LMap.flyTo(latLng);
        });
    } else {
        return new Error('Navigator API is not supported by this browser.');
    }
}

export default LMap;
