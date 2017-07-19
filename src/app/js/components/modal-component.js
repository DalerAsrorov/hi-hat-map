import Component from './component';

const MODAL_BASE_CLASS = 'modal fade';
const MODAL_INNER_BASE_HTML = `<div class='modal-dialog'>
    <div class='modal-content'></div>
</div>`

export default class ModalComponent extends Component {
    constructor(id, parent, nodeType, content) {
        super(id, parent, nodeType, content);
    }

    _buildTemplate() {
        this.$node.addClass(MODAL_BASE_CLASS);
        let $modalDialog = this.$node.append(`<div class='modal-dialog' role='document'></div>`);
        console.log($modalDialog);

    }

    buildCustomTemplate() {
        const customTemplateCreated = false;

        return customTemplateCreated;
    }
}
