import { WIDGETS } from './constants';
import { toggleModal } from './ui';

const WidgetModuleMap = {
    wordCloudWidget: {
        name: 'Wordcloud',
        action(ev) {
            toggleModal(WidgetModuleMap.wordCloudWidget.relation, 'show');
        },
        relation: 'wordcloudModal',
        icon: WIDGETS['WORDCLOUD'],
        data: {}
    },

    barCharts: {
        name: 'Bar Charts',
        action(ev) {
            console.log('Bar chart widget');
            console.log('this', WidgetModuleMap.barCharts.relation);
        },
        relation: 'barChartsModal',
        icon: WIDGETS['BAR_CHARTS'],
        data: {}
    },

    pieCharts: {
        name: 'Pie Charts',
        action(ev) {
            console.log('this', WidgetModuleMap.pieCharts.relation);
        },
        relation: 'pieChartsModal',
        icon: WIDGETS['PIE_CHARTS'],
        data: {}
    },

    lineCharts: {
        name: 'Area Charts',
        action(ev) {
            console.log('this', WidgetModuleMap.lineCharts.relation);
        },
        relation: 'lineChartsModal',
        icon: WIDGETS['AREA_CHARTS'],
        data: {}
    },

    /**
     * PLANNED: This category of charts will 
     * take data from API with tweets/reviews based 
     * on the selected range and aggregate the growth
     * of the sentiments with respect to time in between 
     * the selected range.
     */
    growthCharts: {
        name: 'Growth Charts',
        action(ev) {
            console.log('Growth charts widget');
        },
        relation: 'growthChartsModal',
        icon: WIDGETS['GROWTH_CHARTS'],
        data: {}
    },
    statCharts: {
        name: 'Stat Charts',
        action(ev) {
            console.log('statCharts charts widget');
        },
        relation: 'growthChartsModal',
        icon: WIDGETS['STAT_CHARTS'],
        data: {}
    }
};

export default WidgetModuleMap;
