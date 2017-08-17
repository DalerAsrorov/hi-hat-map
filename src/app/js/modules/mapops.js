/*eslint no-undef: "off"*/

import { curry, map, pipe } from 'ramda';
import { IMAGES } from './constants.js';
import { emit } from './emitter';
import { getMyCoordinates } from './utils';
import { MAP_LOADER_HIDE, MAP_LOADER_SHOW } from './actions';
import LMap from './map.js';
import * as MapElements from './mapelements.js';
import Leaflet from '../classes/leaflet.js';
import ShowboxTwitterComponent from '../components/showbox-twitter-component.js';

export function navigateToUserLocation() {
    getMyCoordinates().then(latLng => {
        LMap.flyTo(latLng, 12);
    });
}

export const generateResults = curry(data => {
    pipe(map(drawObject))(data);
});

export const renderObject = function(renderObject) {
    const data = renderObject.data;
    const type = renderObject.type;
    const geolocation = renderObject.data.geo;

    drawObject(data, geolocation, type);
};

export const drawObject = curry((data, geolocation, iconType) => {
    const leaflet = new Leaflet();
    const coordinates = [geolocation[0], geolocation[1]];
    const latlng = L.latLng(coordinates[1], coordinates[0]);
    const popupOptions = {
        autoPanPadding: L.point(10, 10),
        minWidth: 350,
        maxHeight: 300
    };

    let ShowboxComp;
    let icon, popup, markerOptions;

    switch (iconType) {
    case 'twitter':
        ShowboxComp = new ShowboxTwitterComponent('', '', 'div', '', data);
        ShowboxComp.init();

        popup = leaflet.createPopup(ShowboxComp, popupOptions);
        icon = MapElements.createIcon(IMAGES.SOC_MEDIA_ICONS.TWITTER);

        markerOptions = {
            icon: icon,
            title: 'Tweet',
                // TODO: replace geolocation with username or place.
            alt: `Tweet in (${geolocation[1]}, ${geolocation[0]})`,
            riseOnHover: true
        };

        break;
    case 'yelp':
        console.log('Yelp data, geo, icon', data, geolocation, iconType);
        break;
    default:
        console.log('No soc media was selected.');
    }

    const geojsonFeature = {
        type: 'Feature',
        properties: {
            name: iconType,
            popupContent: popup,
            icon: icon
        },
        geometry: {
            type: 'Point',
            coordinates
        }
    };

    const feature = leaflet.geoJSON(geojsonFeature, {
        onEachFeature(feature, layer) {
            if (feature.properties && feature.properties.popupContent) {
                layer.bindPopup(feature.properties.popupContent).openPopup();
            }
        },

        pointToLayer(feature, latlng) {
            return L.marker(latlng, markerOptions);
        }
    });

    console.log('Feature', feature);
});
