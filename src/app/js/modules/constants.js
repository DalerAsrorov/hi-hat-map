import { inspectCSSClass } from './utils';

export const MAIN = {
    TWITTER_MODES: ['real_time', 'specified_time'],
    TWITTER_MODES_INDEX: {
        real_time: 0,
        specified_time: 1
    },
    MODAL_HEADERS: {
        WORDCLOUD: 'Sentiment WordCloud'
    }
};

export const WIDGETS = {
    WORDCLOUD: 'fa-cloud',
    BAR_CHARTS: 'fa-bar-chart',
    PIE_CHARTS: 'fa-pie-chart',
    AREA_CHARTS: 'fa-area-chart',
    GROWTH_CHARTS: 'fa-line-chart'
};

export const IMAGES = {
    SOC_MEDIA_ICONS: {
        TWITTER: '../../img/icons/twitter_i.png',
        YELP: '',
        FOURSQARE: ''
    },

    DEFAULT: {
        SHOWBOX_USER_PROFILE_IMG: '../../img/icons/default-user-profile.png',
        MAP_LOADER_IMAGE: '../img/map-loader-image.'
    }
};

export const COLORS = {
    CHART: {
        POSITIVE: '#1ae032',
        NEGATIVE: '#d82727',
        NEUTRAL: '#b5b5b5'
    },
    SENTIMENT: {
        POSITIVE: {
            1: inspectCSSClass('sent-pos-1', 'color'),
            2: inspectCSSClass('sent-pos-2', 'color'),
            3: inspectCSSClass('sent-pos-3', 'color'),
            4: inspectCSSClass('sent-pos-4', 'color'),
            5: inspectCSSClass('sent-pos-5', 'color'),
            6: inspectCSSClass('sent-pos-6', 'color'),
            7: inspectCSSClass('sent-pos-7', 'color')
        },
        NEGATIVE: {
            1: inspectCSSClass('sent-neg-1', 'color'),
            2: inspectCSSClass('sent-neg-2', 'color'),
            3: inspectCSSClass('sent-neg-3', 'color'),
            4: inspectCSSClass('sent-neg-4', 'color'),
            5: inspectCSSClass('sent-neg-5', 'color'),
            6: inspectCSSClass('sent-neg-6', 'color'),
            7: inspectCSSClass('sent-neg-7', 'color')
        }
    }
};

export const FONTS = {
    WORDCLOUD_D3: 'Impact'
};

export const WIDGET_PARAMS = {
    WORDCLOUD: {
        size: [1120, 600],
        padding: 4
    },
    ICON_SIZE: 'col-lg-2'
};

export const WORDCLOUD_PARAMS = {
    D3: {
        wordSizeFill: 35
    }
};

export const MAP_PARAMS = {
    TWITTER: {
        RADIUS: '25mi'
    }
};
