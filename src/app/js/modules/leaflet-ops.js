import leafletImage from 'leaflet-image';
import LMap from './map';

/**
 * 
 * @param {*} imageID 
 * @param {*} imageClasses 
 */
export function generateMapViewScreenshot(id, imageClasses) {
    const alt = 'Map view screenshot image';

    return new Promise((resolve, reject) => {
        leafletImage(LMap, (error, canvas) => {
            if (error) {
                reject(error);
            }

            const dimensions = LMap.getSize();

            const $img = $('<img />', {
                src: canvas.toDataURL(),
                width: dimensions.x,
                height: dimensions.y,
                class: imageClasses,
                alt,
                id
            });

            resolve($img);
        });
    });
}

export function addFreeDrawLayerToMap() {
    const freeDraw = new FreeDraw({ mode: FreeDraw.ALL });
    LMap.addLayer(freeDraw);
}
