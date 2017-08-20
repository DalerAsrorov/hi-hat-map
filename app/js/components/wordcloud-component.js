import Component from './component';

export default class WordcloudComponent extends Component {
    constructor(id, parent, nodeType, content, words) {
        super(id, parent, nodeType, content);
        this.words = words;
    }

    get words() {
        return this._words;
    }

    set words(words = []) {
        this._words = words;
    }
}
