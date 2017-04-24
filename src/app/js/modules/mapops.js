import Map from './map.js';
import { IMAGES } from './constants.js';
import * as MapElements from './mapelements.js';
import {curry, map, pipe, __} from 'ramda';

// export function generateResults(data) {
//     console.log('Data', data);
// }

// export function animateTransition(data) {
//     console.log("")
// }

export const generateResults = curry((data, geo) => {
    pipe(
        map(drawMarker), // render points with animations
    )(data);
});

export const drawMarker = curry((pointData) => {
    const twitterIcon = MapElements.createIcon(IMAGES.SOC_MEDIA_ICONS.TWITTER);

    L.marker([51.5, -0.09], {icon: twitterIcon}).addTo(Map);
});

export const drawObject = curry((data, geolocation, iconType) => {
    let icon;
    switch(iconType) {
        case 'twitter':
            console.log('data, geo, icon:', data, geolocation, iconType);
            icon = MapElements.createIcon(IMAGES.SOC_MEDIA_ICONS.TWITTER);
            L.marker([geolocation[1], geolocation[0]], {icon: icon}).addTo(Map);
            break;
        case 'yelp':
            console.log('Yelp data, geo, icon', data, geolocation, iconType);
            break;
        default:
            console.log('No soc media was selected.');
    };

    console.log('after switch');
});