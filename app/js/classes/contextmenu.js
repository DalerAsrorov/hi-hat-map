/*eslint no-undef: "off"*/

import { resetOnMouseUp, appendDropDownToPanel } from '../modules/ui';
import List from './list';

export default class ContextMenu {
    constructor(id, listId, parent) {
        this.id = id;
        this.parent = parent;
        this.listId = listId;
        id = id.indexOf('#') === 0 ? id.substr(1) : id;
        this.$self = $(`<div id=${id}></div>`);
        this.$parent = $(parent);

        this.list = new List(listId, listId);

        // add class context-menu for all
        // context menu elements.
        this.addClass('context-menu');
    }

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    addClass(className, selector = null) {
        // have data-name attribute added
        selector =
            selector === null
                ? !!this.$self.addClass(className)
                : !!$(`${selector}`).addClass(className);
        return selector;
    }

    addClassesToAllMenuItems(classes) {
        this.list.addClassesToAllItems(classes);
    }

    adjustPosition(event) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        const left = mouseX + 'px';

        const nav = document.getElementsByTagName('nav')[0];
        const navOffsetHeight = nav.offsetHeight;
        const top = `${mouseY - navOffsetHeight}px`;

        this.applyCss({ left: left, top: top });
    }

    addMenuSubitem(selfSelector, menuItemSelector, eventListener) {}

    appendMenuItem(value, action, event) {
        this.list.addItem(value, action, event);
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
        this.list.bindTo(this.$html());
        resetOnMouseUp(document, this.id, 'click');
    }

    fadeIn(speed) {
        this.$self.fadeIn(speed);
    }

    fadeOut(speed) {
        this.$self.fadeOut(speed);
    }

    $html() {
        return this.$self;
    }

    hide(delay = 500) {
        this.$self.hide(delay);
    }

    refresh() {}

    show(delay = 500) {
        this.$self.show(delay);
    }
}
