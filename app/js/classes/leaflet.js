/*eslint no-undef: "off"*/

import LMap from '../modules/map';

export default class Leaflet {
    constructor() {}

    createPopup(showboxComponent, options = {}) {
        return L.popup(options).setContent(showboxComponent.rawHtml());
    }

    computePolygonCenter(L, boundingBox) {
        let polygonPoints = [],
            polygon;
        const coordinates = boundingBox.coordinates[0];

        coordinates.forEach(coordinate => {
            let latlng = L.latLng(coordinate[1], coordinate[0]);
            polygonPoints.push(latlng);
        });

        polygon = L.polygon(polygonPoints);
        return polygon.getBounds().getCenter();
    }

    transformLatLngToArray(center) {
        return [center.lng, center.lat];
    }

    geoJSON(geojsonFeature, options = {}) {
        return L.geoJSON(geojsonFeature, options).addTo(LMap);
    }
}
