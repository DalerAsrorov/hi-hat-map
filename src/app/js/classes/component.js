/* Base component class. */
import { getElement, append } from '../modules/ui.js';

export default class Component {
    constructor(id, parent, nodeType='div', content='') {
        this.id = id;
        this.parent = parent;
        this.nodeType = nodeType;

        // append to parent
        this.$node = $(`<${nodeType} id=${id}>${content}</${nodeType}>`);
        append($(parent), this.$node);
    }

    bind(container) {
        append(container, this.id);
    }

    html() {
        return getElement(`${this.id}`);
    }

    appendChild(component) {
        if(component instanceof Component) {
            append(this.html(), component.html());
        }
    }
}
