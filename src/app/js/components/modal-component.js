import Component from './component';

const MODAL_BASE_CLASS = 'modal fade';
const MODAL_HEADER_DIV = '<div class="modal-header"></div>'
const MODAL_CONTENT_DIV = '<div class="modal-content"></div>';


export default class ModalComponent extends Component {
    constructor(id, parent, nodeType, content, modelContent=null) {
        super(id, parent, nodeType, content);
        this.$modalContent = modelContent ? modelContent : MODAL_CONTENT_DIV;
    }

    buildHeader(title, handleOnCloseCallback=()=>{}) {
        let $modalHeaderWrapper = $(MODAL_HEADER_DIV);
        let $header = $('<h3 class="modal-title"></h3>');
        let $closeButton = $(`
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&timees;</span>
            </button>
        `);

        $closeButton.click(handleOnCloseCallback);

        $header.append(`<span>${title}</span>`);
        $modalHeaderWrapper.append($header);
        $modalHeaderWrapper.append($closeButton);
        this.$modalContent.append($modalHeaderWrapper);
    }

    _buildTemplate() {
        this.$node.addClass(MODAL_BASE_CLASS);
        let $modalDialog = $('<div class="modal-dialog" role="document"></div>');

        this.$modalContent = $(this.$modalContent);
        $modalDialog.append(this.$modalContent);

        this.html().append($modalDialog);
    }

    buildCustomTemplate() {
        const customTemplateCreated = false;

        return customTemplateCreated;
    }
}
