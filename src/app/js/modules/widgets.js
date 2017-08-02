import { WIDGETS } from './constants';

const WIDGET_ICON_SIZE = 'fa-2x';
const WIDGET_ICON_CLASS = 'widget-icon';
const ICON_TYPE = 'text';

export default {
    wordCloudWidget: {
        name: 'Wordcloud',
        action(params = null) {
            console.log('Wordcloud widget');
        },
        relation: 'deordcloudModal',
        icon: WIDGETS['WORDCLOUD'],
        data: {}
    },

    barCharts: {
        name: 'Bar Charts',
        action(params = null) {
            console.log('Bar chart widget');
        },
        relation: 'barChartsModal',
        icon: WIDGETS['BAR_CHARTS'],
        data: {}
    },

    pieCharts: {
        name: 'Pie Charts',
        action(params = null) {
            console.log('Pie charts widget');
        },
        relation: 'pieChartsModal',
        icon: WIDGETS['PIE_CHARTS'],
        data: {}
    },

    lineCharts: {
        name: 'Area Charts',
        action(params = null) {
            console.log('Line charts widget');
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
        action(params = null) {
            console.log('Growth charts widget');
        },
        relation: 'growthChartsModal',
        icon: WIDGETS['GROWTH_CHARTS'],
        data: {}
    }
};
