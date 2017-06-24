import Map from './map.js';
import { IMAGES } from './constants.js';
import * as MapElements from './mapelements.js';
import Leaflet from '../classes/leaflet.js';
import ShowboxTwitterComponent from '../components/showbox-twitter-component.js';
import {curry, map, pipe, __} from 'ramda';

// export function generateResults(data) {
//     console.log('Data', data);
// }

// export function animateTransition(data) {
//     console.log("")
// }

export const generateResults = curry(data => {
    pipe(
        map(drawObject), // render points with animations
    )(data);
});

export const renderObject = function(renderObject) {
    const data = renderObject.data;
    const type = renderObject.type;
    const geolocation = renderObject.data.geo;

    drawObject(data, geolocation, type);
}

export const drawObject = curry((data, geolocation, iconType) => {
    const leaflet = new Leaflet();
    const latlng = L.latLng(geolocation[1], geolocation[0]);
    const popupOptions = {
        autoPanPadding: L.point(10, 10),
        minWidth: 300,
        maxHeight: 250
    };

    let icon, popup, showboxComp, markerOptions;

    switch(iconType) {
        case 'twitter':
            showboxComp = new ShowboxTwitterComponent('', '', 'div', '', data);
            showboxComp.generateTemplate();

            popup = leaflet.createPopup(showboxComp, popupOptions);
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
    };

    L.marker(latlng, markerOptions)
    .bindPopup(popup)
    .openPopup()
    .addTo(Map);
});
