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