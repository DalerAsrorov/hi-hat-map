/*eslint no-undef: "off"*/

import { generateWebIcon } from '../modules/ui';
import Component from './component';

const WIDGET_NODE_TYPE = 'button';
// const WIDGET_CLASSES = 'cp-widget list-group-item list-group-item-action';
const WIDGET_CLASSES = 'btn btn-secondary cp-widget ';
const WIDGET_DEFAULT_ICON = 'fa-circle-thin';
const WIDGET_ICON_SIZE = 'fa-2x';
const WIDGET_CSS = {
    'border-radius': '0'
};
const IS_ACTIVE = 'active';

export default class WidgetComponent extends Component {
    constructor(id, desc, size, action, icon = null, data = null) {
        super(id, null, WIDGET_NODE_TYPE);

        this.desc = desc;
        this.size = size;
        this.action = action;
        this.icon = icon ? icon : WIDGET_DEFAULT_ICON;
        this.data = data;

        this.init();
        this.$node.click(action);
    }

    _buildTemplate() {
        this.addClasses(`${WIDGET_CLASSES} ${this.size}`);
        this.addCSS(WIDGET_CSS);
        this.html().append(`
            ${generateWebIcon(this.icon, WIDGET_ICON_SIZE, '', 'text')}
            <div class='cp-widget-desc'>${this.desc}</div>
        `);
    }

    applyActionToData() {
        const myData = this.data;
        const success = true;

        if (myData instanceof Array) {
            myData.map(el => this.action.apply(this, el));
            return success;
        }

        return !success;
    }

    makeActive() {
        this.addClasses(IS_ACTIVE);
    }

    isActive() {
        return this.$node.hasClass(IS_ACTIVE);
    }

    startAnimation() {
        super.startAnimation();
    }

    stopAnimation() {
        super.stopAnimation();
    }

    doToggleAnimation() {
        super.doToggleAnimation();
    }
}
