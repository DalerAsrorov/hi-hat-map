import Component from './component';
import { generateWebIcon } from '../modules/ui';

const WIDGET_NODE_TYPE = 'button';
// const WIDGET_CLASSES = 'cp-widget list-group-item list-group-item-action';
const WIDGET_CLASSES = 'cp-widget btn btn-secondary';
const WIDGET_DEFAULT_ICON = 'fa-circle-thin';
const WIDGET_ICON_SIZE = 'fa-2x';
const WIDGET_CSS = {
    'border-radius': '0'
};
const IS_ACTIVE ='active';

export default class WidgetComponent extends Component {
    constructor(id, desc, size, action, icon=null, data=null) {
        super(id, null, WIDGET_NODE_TYPE);

        this.desc = desc;
        this.size = size;
        this.action = action;
        this.icon = icon ? icon : WIDGET_DEFAULT_ICON;
        this.data = data;

        this.init();
        this.$node.click(action);
    }

    addClass(className) {
        this.$node.addClass(className);
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
        this.$node.addClass(IS_ACTIVE);
    }

    isActive() {
        return this.$node.hasClass(IS_ACTIVE);
    }

    init() {
        this.$node.addClass(`${WIDGET_CLASSES} ${this.size}`);
        this.$node.css(WIDGET_CSS);
        this.$node.append(`
            ${ generateWebIcon(this.icon, WIDGET_ICON_SIZE, '', 'text') }
            <aside class='cp-widget-desc'>${this.desc}</aside>
        `);
    }
}
