import Component from './component';
import { isEmpty } from 'ramda';

const WC_NODE_TYPE = 'div';
const WC_NODE_CLASSES = 'row';
const WC_WRAPPER_CLASSES = 'cp-widget-wrapper';
const WC_WRAPPER_CSS = {
    'display': 'table',
    'clear': 'both',
    'position': 'absolute',
    'display': 'none',
    'background-color': '#fff'
};
const WC_TOGGLE_BUTTON_CLASSES = 'btn btn-secondary';
const WC_TOGGLE_BUTTON_CSS= {
    'width': '100%',
    'border-radius': '0'
};
const WC_TOGGLE_SPEED = 0;
const IS_ACTIVE = 'active';

export default class WidgetCollectionComponent extends Component {
    constructor(id, parent, desc, widgets=[]) {
        super(id, parent, WC_NODE_TYPE, '');
        this.widgets = widgets;
        this.desc = desc;
    }

    _alignPosition($bottomElement, $topElement) {
        const topOffsetUp = $topElement.offset().top;
        const topOffsetBottom = $bottomElement.offset().top;
        const positionTop = $topElement.position().top;
        const bottomElementHeight = $bottomElement.outerHeight();

        const topDiff = topOffsetBottom - topOffsetUp - $bottomElement.outerHeight();
        const top = (topDiff - positionTop) + bottomElementHeight;

        $topElement.css({
            top: -top
        })
    }

    _buildTemplate(classNames='') {
        this.$node.addClass(classNames);

        let $widgetWrapper = $(`<div class=${WC_WRAPPER_CLASSES}></div>`);
        let $toggleButton = $(`<button class='${WC_TOGGLE_BUTTON_CLASSES}'>${this.desc}</button>`);

        $toggleButton.click((ev) => {
            $widgetWrapper.slideToggle(WC_TOGGLE_SPEED);
        });

        if (!isEmpty(this.components)) {
            this.widgets.map((widget) => {
                $widgetWrapper.append(widget.html());
            });

            this.$node.append($widgetWrapper);
            this.$node.append($toggleButton);

            this._alignPosition($toggleButton, $widgetWrapper);

            $widgetWrapper.css(WC_WRAPPER_CSS);
            $toggleButton.css(WC_TOGGLE_BUTTON_CSS);

            return this.html();
        }

        return Error('Cannot build widget collection with empty list.');
    }

    isActive() {
        return this.$node.find('button').hasClass(IS_ACTIVE);
    }

    setActive() {
        this.$node.find('button').addClass(IS_ACTIVE);
    }

    init() {
        return this._buildTemplate(WC_NODE_CLASSES);
    }
}
