import { resetOnMuseUp, appendDropDownToPanel } from '../modules/ui.js';
import Components from './components.js';
import PanelComponent from './panelcomponent.js';

export default class ContextMenu {
    constructor(id, parent) {
        this.id = id;
        this.parent = parent;
        id = id.indexOf('#') === 0 ? id.substr(1) : id;
        this.$self = $(`<div id=${id}></div>`);
        this.$parent = $(parent);

        // add class context-menu for all
        // context menu elements.
        this.addClass('context-menu');
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

        const nav = document.getElementsByTagName('nav')[0];
        const navOffsetHeight = nav.offsetHeight;
        const top = `${mouseY - navOffsetHeight}px`;

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

        let contextComponents = new Components();

        let contextComp1 = new PanelComponent('#item1', 'item1', ()=>console.log('hi', 1), []);
        let contextComp2 = new PanelComponent('#item2', 'item2', ()=>console.log('hi', 2), []);
        let contextComp3 = new PanelComponent('#item3', 'item3', ()=>console.log('hi', 3), []);
        contextComponents.setName('Context Menu');
        contextComponents.setId('contextMenu');
        contextComponents.add(contextComp1);
        contextComponents.add(contextComp2);
        contextComponents.add(contextComp3);

        appendDropDownToPanel(`${this.id}`, contextComponents);

        resetOnMuseUp(document, this.id, 'click');
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