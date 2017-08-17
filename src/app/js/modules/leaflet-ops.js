import leafletImage from 'leaflet-image';
import LMap from './map';
import { getMapPanelHeightDiff } from './ui';

const freeDraw = new FreeDraw({ mode: FreeDraw.ALL });

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
    // Attaches draw layer to the map
    LMap.addLayer(freeDraw);

    // sets the height equal to map view for better UX
    const firstDrawClass = '.free-draw';
    const mapPanelHeightDiff = getMapPanelHeightDiff();
    const $freeDrawSvgTag = $(firstDrawClass).first();
    $freeDrawSvgTag.css('height', `${mapPanelHeightDiff}px`);
}

export function onFreeDrawMarkersPlaced(fn) {
    freeDraw.on('markers', fn);
}
