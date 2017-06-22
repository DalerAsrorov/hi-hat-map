/* Base component class. */
import { getElement, append, getOuterHTMLText } from '../modules/ui.js';

export default class Component {
    constructor(id, parent, nodeType='div', content='') {
        this.id = id;
        this.parent = parent;
        this.nodeType = nodeType;
        this.$node = $(`<${nodeType} id=${id}>${content}</${nodeType}>`);
        // append to parent
        append($(parent), this.$node);
    }

    addClasses(classes='') {
        this.html().addClass(classes);
    }

    bind(container='') {
        let myTarget = this.id;

        if(typeof container !== 'string') {
            myTarget = this.$node;
        }

        append(container, myTarget);
    }

    html() {
        // return getElement(`${this.id}`);
        return this.$node;
    }

    rawHtml() {
        return getOuterHTMLText(this.html());
    }

    appendChild(component) {
        if(component instanceof Component) {
            append(this.html(), component.html());
        }
    }

    appendHtml(html) {
        append(this.html(), html);
    }

    update(props) {
        const { id, parent, $node, nodeType } = props;

        this.id = id ? id : this.id;
        this.parent = parent ? parent : this.parent;
        this.nodeType = nodeType ? nodeType : this.nodeType;
        this.$node = $node ? $node : this.$node;
    }
}
