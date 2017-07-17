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
    'background-color': '#fff',
    'width': '100%',
    'margin': '0'
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

    _getButton() {
        return this.$node.children('button');
    }

    _buildTemplate(classNames='') {
        this.$node.addClass(classNames);
        this.$node.css({'margin': '0'});

        let $widgetWrapper = $(`<div class=${WC_WRAPPER_CLASSES}></div>`);
        let $toggleButton = $(`<button class='${WC_TOGGLE_BUTTON_CLASSES}'>${this.desc}</button>`);

        $toggleButton.click((ev) => {
            $widgetWrapper.slideToggle(WC_TOGGLE_SPEED);
            this.toggleActive();
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

    /**
     * Adds event listener to the button of Widget Component
     * @param {[string], [fn]} action [void]
     */
    addEventListener(eventType, action) {
        this._getButton().on(eventType, action);
    }

    toggleActive() {
        this.$node.children('button').toggleClass(IS_ACTIVE);
    }

    isActive() {
        return this.$node.children('button').hasClass(IS_ACTIVE);
    }

    setActive() {
        this.$node.children('button').addClass(IS_ACTIVE);
    }

    init() {
        return this._buildTemplate(WC_NODE_CLASSES);
    }
}
