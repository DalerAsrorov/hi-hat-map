import Component from './component';

export default class WidgetCollectionContainerComponent extends Component {
    constructor(id, parent, nodeType='div', WidgetCollectionCompList) {
        super(id, parent, nodeType);
        this.WidgetCollectionCompList = WidgetCollectionCompList;
    }

    _buildTemplate() {
        this.WidgetCollectionCompList.map(WidgetCollection => {
            this.appendChild(WidgetCollection);
        });
    }

    _delegateToggle(wcTarget) {
        
    }

    activateAllExcept(WidgetCollectionComp) {
        this.WidgetCollectionCompList.map(WidgetColection => {
            if(WidgetColection !== WidgetCollectionComp) {

            }
        });
    }

    delegateActionToCollections(type, action=()=>{}) {
        this.WidgetCollectionCompList.map(WidgetCollection => {
            WidgetCollection.addEventListener(type, action);
        });
    }

    init() {
        this._buildTemplate();
    }

    setActive() {

    }

    disable() {

    }
}
