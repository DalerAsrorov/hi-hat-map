

export default class ContextMenu {
    constructor(id, parent) {
        this.id = id;
        this.parent = parent;
        id = id.indexOf('#') === 0 ? id.substr(1) : id;
        this.$self = $(`<div id=${id}></div>`);
        this.$parent = $(parent);
    }

    addClass(className, selector=null) {
        // have data-name attribute added
        selector = selector === null ? !!this.$self.addClass(className) : !!$(`${selector}`).addClass(className);
        return selector;
    }

    adjustPosition(event) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        const left = mouseX + 'px';
        const top = mouseY + 'px';

        this.applyCss({'left': left, 'top': top});

        console.log('adjustPosition event applied', event);
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

    applyCss(styleObject) {
        this.$self.css(styleObject);
    }

    // 1. Invoke this method at the end to add
    // the context menu to the container.
    // 2. Make sure to leave it invisible first
    // 3. Have method that shows the dropdowns
    //    on right click.
    // 4. Don't forget to add handler for 'left click'
    //    to hide the context menu
    bind() {
        this.$parent.append(this.$self);
    }

    fadeIn(speed) {
        this.$self.fadeIn(speed)
    }

    fadeOut(speed) {
        this.$self.fadeOut(speed);
    }

    getHtml() {

    }

    hide(delay=500) {
        this.$self.hide(delay);
    }

    refresh() {

    }

    show(delay=500) {
        this.$self.show(delay);
    }


}