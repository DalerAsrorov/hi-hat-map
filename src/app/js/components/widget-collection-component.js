import Component from './component';
import { isEmpty } from 'ramda';

const WC_NODE_TYPE = 'div';
const WC_NODE_CLASSES = 'list-group';

export default class WidgetCollectionComponent extends Component {
    constructor(id, parent, desc, widgets=[]) {
        super(id, parent, WC_NODE_TYPE, '');
        this.widgets = widgets;
        this.desc = desc;
    }

    _buildTemplate(classNames='') {
        this.$node.addClass(classNames);

        if(!isEmpty(this.components)) {
            this.widgets.map((widget) => {
                this.appendChild(widget);
            });

            return this.html();
        }

        return Error('Cannot build widget collection with empty list.');
    }

    init() {
        return this._buildTemplate(WC_NODE_CLASSES);
    }
}
