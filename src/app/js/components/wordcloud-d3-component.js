import WordcloudComponent from './wordcloud-component.js';
import { FONTS } from '../modules/constants.js';
import { convertFromJQueryToDOMElement } from '../modules/ui.js';

export default class WordcloudD3Component extends WordcloudComponent {
    constructor(id, parent, nodeType, content, words) {
        super(id, parent, nodeType, content, words);

        this.domNode = convertFromJQueryToDOMElement(this.$node);

        this.fill = d3.scale.category20();
        this.cloud = null;
        this.layout = null;
    }

    _createCloud() {
        return d3.layout.cloud();
    }

    // 90 degrees put text horizontally
    rotateToDegree(degree) {
        return ~~(Math.random() * 1) * degree;
    }

    draw(params) {
        const { size, padding, rotation } = params;
        const cloudId = this.parent;
        const myDomNode = this.domNode;
        let layout;

        this.cloud = layout = this._createCloud()
                          .size(size)
                          .words(this.words)
                          .padding(padding)
                          .font(FONTS.WORDCLOUD_D3)
                          .fontSize(d => d.size)
                          .on("end", draw);

        layout.start();

        function draw(words) {
            console.log('words:', words);
            d3.select(myDomNode).append("svg")
                .attr('width', layout.size()[0])
                .attr('height', layout.size()[1])
                .append('g')
                .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function(d) { return d.size + "px"; })
                .style("font-family", "Impact")
                .style("fill", (d, i) => d.color)
                .attr('text-anchor', "middle")
                .attr('transform', function(d) {
                  return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.text; });
        }
    }

}
