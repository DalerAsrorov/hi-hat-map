import Map from './map.js';
import { IMAGES } from './constants.js';
import * as MapElements from './mapelements.js';

// export function generateResults(data) {
//     console.log('Data', data);
// }

// export function animateTransition(data) {
//     console.log("")
// }

export const generateResults = R.curry((data, geo) => {
    R.pipe(
        R.map(drawMarker), // render points with animations
    )(data);
});

export const drawMarker = R.curry((pointData) => {
    const twitterIcon = MapElements.createIcon(IMAGES.SOC_MEDIA_ICONS.TWITTER);

    L.marker([51.5, -0.09], {icon: twitterIcon}).addTo(Map);
});

export const drawObject = function(data, geolocation, iconType) {
    let icon;
    switch(iconType) {
        case 'twitter':
            console.log('data, geo, icon:', data, geolocation, iconType);
            icon = MapElements.createIcon(IMAGES.SOC_MEDIA_ICONS.TWITTER);
            L.marker(geolocation, {icon: icon}).addTo(Map);
            break;
        default:
            console.log('No soc media was selected.');
    }

    console.log('after switch');
}