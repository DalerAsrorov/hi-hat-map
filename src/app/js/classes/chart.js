import { COLORS } from '../modules/constants.js';

export default class Chart {
    constuctor(id) {
        this.id = id;
        // this.chart = null;
    }

    set id(id) {
        this._id = id;
    }

    generateChart(data={}) {
        return new Promise((res, rej) => {
            this.chart = c3.generate({
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
            res(this.chart);
        });
    }

    load(data) {
        this.chart.load(data);
    }

    generate(paramObject) {
        c3.generate(paramObject);
    }
}