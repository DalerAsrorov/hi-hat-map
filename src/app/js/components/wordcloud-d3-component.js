import WordcloudComponent from './wordcloud-component.js';
import { FONTS } from '../modules/constants.js';

export default class WordcloudD3Component extends WordcloudComponent {
    constructor(id, parent, nodeType='div', content='', words) {
        super(id, parent, nodeType, content, words);

        this.fill = d3.scale.category20();
        this.cloud = null;
        this.layout = null;
    }

    createCloud() {
        return d3.layout.cloud();
    }

    draw(params) {
        const { size, padding } = params;
        const cloudId = this.id;
        let layout;

        this.cloud = layout = this.createCloud()
                          .size(size)
                          .words(this.words.map(function(d) {
                            return {text: d, size: 10 + Math.random() * 90, test: "haha"};
                          }))
                          .padding(padding)
                          .rotate(function() { return ~~(Math.random() * 1) * 90; })
                          .font(FONTS.WORDCLOUD_D3)
                          .fontSize(function(d) { return d.size; })
                          .on("end", draw.bind(this.layout));

        layout.start();

        function draw(words) {
            d3.select(cloudId).append("svg")
                .attr("width", layout.size()[0])
                .attr("height", layout.size()[1])
                .append("g")
                .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function(d) { return d.size + "px"; })
                .style("font-family", FONTS.WORDCLOUD_D3)
                .style("fill", function(d, i) { return '#000'; })
                .attr("text-anchor", "middle")
                .attr("transform", function(d) {
                  return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.text; });
        }
    }

}
