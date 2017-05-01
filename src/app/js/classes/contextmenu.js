
export default class ContextMenu {
    constructor(id, options={}) {
        this.id = id;
        this.options = options;
    }

    addMenuSubitem(selfSelector, menuItemSelector, eventListener) {

    }

    addMenuItem(selector, eventListener) {
        this.appendMenuItem({selector: selector, eventListener: eventListener})
    }

    appendMenuItem(params) {
        const selector = params.selector;
        const eventListener = params.eventListener;


    }

    getHtml() {

    }
}