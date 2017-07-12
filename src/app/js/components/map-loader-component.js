import Component from './component.js';
import { IMAGES } from '../modules/constants.js';
import { buildTemplate } from '../modules/ui.js';

export default class MapLoaderComponent extends Component {
    constructor(id, parent, nodeType, content, imageSrc=IMAGES.DEFAULT.MAP_LOADER_IMAGE) {
        super(id, parent, nodeType, content);
        this.imageSrc = imageSrc;
    }

    startLoader(mls=0) {
        setTimeout(() => {
            this.renderLoader();
        }, mls);
    }

    renderLoader() {
        let template = buildTemplate(
            `<div data-name='map-loader' id=${this.id} class='map-loader'>
                <img src=${this.imageSrc} alt='Loading data into map...' />
            </div>`
        );

        console.log(template);
    }
}
