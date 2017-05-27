

export default class Chart {
    constuctor(id) {
        console.log(`Instantiated a Chart object with id ${id}`);
        this.id = id;
        this.chart = null;
    }

    generateChart(opt={}) {
        this.chart = c3.generate({
            bindto: this.id
        });
    }

    load(data) {
        this.chart.load(data);
    }

    generate(paramObject) {
        c3.generate(paramObject);
    }
}