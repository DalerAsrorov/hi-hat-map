import Component from './component';
import { generateWebIcon, buildTemplate } from '../modules/ui';

const WIDGET_NODE_TYPE = 'button';
const WIDGET_CLASSES = 'cp-widget list-group-item list-group-item-action';
const WIDGET_DEFAULT_ICON = 'fa-circle-thin';
const WIDGET_ICON_SIZE = 'fa-2x';
const IS_ACTIVE ='active';

export default class WidgetComponent extends Component {
    constructor(id, desc, action, icon=null, data=null) {
        super(id, null, WIDGET_NODE_TYPE);

        this.desc = desc;
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
        this.$node.addClass(WIDGET_CLASSES);
        this.$node.append(`
            ${ generateWebIcon(this.icon, WIDGET_ICON_SIZE, 'pull-left', 'text') }
            <aside class='cp-widget-desc'>${this.desc}</aside>
        `);
    }
}
