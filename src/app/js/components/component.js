/* Base component class. */
import { append, getOuterHTMLText } from '../modules/ui';
import { doRedBorderAnimation } from '../modules/action-class-names';

export default class Component {
    constructor(id = '', parent = null, nodeType = 'div', content = '') {
        // this id when binding might already be specified
        this.id = id;
        this.parent = parent;
        this.nodeType = nodeType;
        this.$node = $(`<${nodeType} id='${id}'>${content}</${nodeType}>`);

        if (parent) {
            append($(parent), this.$node);
        }
    }

    addClasses(classes = '') {
        this.html().addClass(classes);
    }

    addCSS(cssProps = {}) {
        this.html().css(cssProps);
    }

    bind(container = '') {
        let myTarget = this.id;

        this.parent = container;
        if (typeof container !== 'string') {
            myTarget = this.$node;
        }

        append($(container), $(myTarget));
    }

    html() {
        return this.$node;
    }

    rawHtml() {
        return getOuterHTMLText(this.html());
    }

    appendChild(component) {
        if (component instanceof Component) {
            append(this.html(), component.html());
            component.parent = this.id;
        }
    }

    appendHtml(html) {
        append(this.html(), html);
    }

    init() {
        this._buildTemplate();
    }

    update(props) {
        const { id, parent, $node, nodeType } = props;

        this.id = id ? id : this.id;
        this.parent = parent ? parent : this.parent;
        this.nodeType = nodeType ? nodeType : this.nodeType;
        this.$node = $node ? $node : this.$node;
    }

    hideFromDom() {
        this.html().css('display', 'none');
    }

    showInDom() {
        this.html().css('display', 'block');
    }

    doToggleAnimation(childElementSelector = null, animation = doRedBorderAnimation) {
        const myNode = this.$node;
        return childElementSelector
            ? myNode.children(childElementSelector).toggleClass(animation)
            : myNode.toggleClass(doRedBorderAnimation);
    }
}
