import Component from './component.js';
import { IMAGES } from '../modules/constants.js';
import { buildTemplate, getLoader } from '../modules/ui.js';

export default class MapLoaderComponent extends Component {
    constructor(id, parent, nodeType, content, imageSrc=IMAGES.DEFAULT.MAP_LOADER_IMAGE) {
        super(id, parent, nodeType, content);
        this.imageSrc = imageSrc;
    }

    _buildTemplate() {
        const $loader = getLoader();
        this.$node.append($loader);

        debugger;
        this.bind(this.parent);

        return this.$node;
    }

    startLoader(mls=0) {
        setTimeout(() => {
            this.renderLoader();
        }, mls);
    }

    renderLoader() {
        this._buildTemplate();
    }
}
