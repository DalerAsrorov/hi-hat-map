import Component from './component';
import { isEmpty } from 'ramda';

const WC_NODE_TYPE = 'div';
const WC_NODE_CLASSES = 'row';
const WC_WRAPPER_CLASSES = 'cp-widget-wrapper';
const WC_TOGGLE_BUTTON_CLASSES = 'btn btn-secondary';
const WC_TOGGLE_BUTTON_CSS= {
    'width': '100%',
    'border-radius': '0'
};
const WC_WRAPPER_CSS = {
    'display': 'table',
    'clear': 'both'
};

export default class WidgetCollectionComponent extends Component {
    constructor(id, parent, desc, widgets=[]) {
        super(id, parent, WC_NODE_TYPE, '');
        this.widgets = widgets;
        this.desc = desc;
    }

    _buildTemplate(classNames='') {
        this.$node.addClass(classNames);

        let $widgetWrapper = $(`<div class=${WC_WRAPPER_CLASSES}></div>`);
        let $toggleButton = $(`<button class='${WC_TOGGLE_BUTTON_CLASSES}'>${this.desc}</button>`);
        $widgetWrapper.css(WC_WRAPPER_CSS);
        $toggleButton.css(WC_TOGGLE_BUTTON_CSS);

        if (!isEmpty(this.components)) {
            this.widgets.map((widget) => {
                $widgetWrapper.append(widget.html());
            });

            this.$node.append($widgetWrapper);
            this.$node.append($toggleButton);
            return this.html();
        }

        return Error('Cannot build widget collection with empty list.');
    }

    init() {
        return this._buildTemplate(WC_NODE_CLASSES);
    }
}
