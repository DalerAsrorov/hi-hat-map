import { WIDGETS } from './constants';
import { generateWebIcon } from './ui';

const WIDGET_ICON_SIZE = 'fa-2x';
const WIDGET_ICON_CLASS = 'widget-icon';

export default {
    getResultStageWidgets(type='text') {
        return [
            {
                id: '#wordCloudWidget',
                desc: 'WordCloud',
                action(params=null) {
                    console.log('POOOOP');
                },
                icon: generateWebIcon(
                    WIDGETS['WORDCLOUD'],
                    WIDGET_ICON_SIZE,
                    WIDGET_ICON_CLASS,
                    type
                ),
                data: {

                }
            }
        ];
    }
};
