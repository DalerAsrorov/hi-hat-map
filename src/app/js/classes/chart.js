import { COLORS } from '../modules/constants.js';

export default class Chart {
    constuctor(id) {
        this.id = id;
        this.chart = null;
    }

    set id(id) {
        this._id = id;
    }

    set chart(chart) {
        this._chart = chart;
    }

    get chart() {
        return this._chart;
    }

    get id() {
        return this._id;
    }

    generateChart(data={}) {
        this._chart = c3.generate({
            bindto: this._id,
            color: {
                pattern: [
                    COLORS['CHART']['NEGATIVE'],
                    COLORS['CHART']['POSITIVE'],
                    COLORS['CHART']['NEUTRAL']
                ]
            },
            data: data
        });

        return this;
    }

    /*
        This is a data structure method
        for 'multiple axis' chart. It should
        have scores for each word, should check
        all types of words and structure them
        as needed for c3.js graph library
    */
    structureData(sentiment) {
        const positive = sentiment['positiveWords'].reduce((acc, current, index) => {
            return acc += current.polarity;
        }, 0);

        const negative = sentiment['negativeWords'].reduce((acc, current, index) => {
            return acc += current.polarity;
        }, 0);

        const total = sentiment['value'].totalScore;




    // {
    //     xs: {
    //         'negative': 'x1',
    //         'positive': 'x2',
    //         'neutral': 'x3'
    //     },

    //     columns: [
    //         ['x1', 10, 30, 45, 50, 70, 100],
    //         ['x2', 30, 50, 75, 100, 120],
    //         ['x3', 40, 60, 98, 125, 140],
    //         ['negative', 30, 200, 100, 400, 150, 250],
    //         ['positive', 20, 180, 240, 100, 190],
    //         ['neutral', 40, 73, 82, 112, 135]
    //     ]
    // }

        console.log('Result for the word',)

        return {
            positive,
            negative,
            total
        }
    }

    getHTML() {
        return $(this._id);
    }

    load(data) {
        this.chart.load(data);
    }

    generate(paramObject) {
        c3.generate(paramObject);
    }
}