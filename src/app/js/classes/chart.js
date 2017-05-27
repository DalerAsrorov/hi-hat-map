

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
                    pattern: ['#d82727', '#1ae032', '#b5b5b5']
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