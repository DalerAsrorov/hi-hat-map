import Component from './component.js';
import { IMAGES } from '../modules/constants.js';
import { getLoader } from '../modules/ui.js';

const loaderCss = {
    'position': 'relative',
    'top': '25%'
};

const loaderDivCss = {
    'display': 'none', // default state
    'position': 'absolute',
    'z-index': '1111',
    'background': 'white',
    'width': '100%',
    'height': '100%',
    'opacity': '0.75'
};

const showCss = {
    'display': 'block'
};

const hideCss = {
    'display': 'none'
};

export default class MapLoaderComponent extends Component {
    constructor(id, parent, nodeType, content, imageSrc=IMAGES.DEFAULT.MAP_LOADER_IMAGE) {
        super(id, parent, nodeType, content);
        this.imageSrc = imageSrc;
    }

    init(display=false) {
        this._buildTemplate();

        if (display) {
            this.show();
        } else {
            this.hide();
        }
    }

    _buildTemplate() {
        const $loader = getLoader('fa-7x');

        this.$node.append($loader);

        this.bind(this.parent);

        $loader.css(loaderCss);
        this.$node.css(loaderDivCss);

        return this.$node;
    }

    startLoader(mls=0) {
        setTimeout(() => {
            this.renderLoader();
        }, mls);
    }

    hide() {
        this.$node.css(hideCss);
    }

    show() {
        this.$node.css(showCss);
    }
}
