import Map from './map.js';
import { IMAGES } from './constants.js';

// export function generateResults(data) {
//     console.log('Data', data);
// }

// export function animateTransition(data) {
//     console.log("")
// }

export const generateResults = R.curry((data, geo) => {
    R.pipe(
        R.map(drawPoint), // render points with animations
    )(data);
});

export const drawPoint = R.curry((pointData) => {
    // console.log('data', pointData);
    // console.log('CONSTANTS: ', IMAGES.SOC_MEDIA_ICONS.TWITTER);
    let twitterIcon = L.icon({
        iconUrl: IMAGES.SOC_MEDIA_ICONS.TWITTER,
        shadowUrl: IMAGES.SOC_MEDIA_ICONS.TWITTER,

        iconSize:     [38, 95], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    L.marker([51.5, -0.09], {icon: twitterIcon}).addTo(Map);
});