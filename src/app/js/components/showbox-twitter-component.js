import ShowboxComponent from './component.js';

export default class ShowboxTwitterComponent extends ShowboxComponent {
    constructor(id, parent, nodeType='div', content, data) {
        super(id, parent, nodeType, content);
        this.data = data;
    }

    formHtml() {

    }
}
