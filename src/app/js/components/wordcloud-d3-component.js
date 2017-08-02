import { FONTS } from '../modules/constants';
import { isEmpty } from 'ramda';
import { convertFromJQueryToDOMElement } from '../modules/ui';
import * as Converter from '../modules/converter';
import WordcloudComponent from './wordcloud-component';
import saveAs from 'save-as';

const DEFAULT_SIZE = [500, 500];

export default class WordcloudD3Component extends WordcloudComponent {
    constructor(id, parent, nodeType, content, words) {
        super(id, parent, nodeType, content, words);

        this.domNode = convertFromJQueryToDOMElement(this.$node);

        this.fill = d3.scale.category20();
        this.cloud = null;
        this.layout = null;
    }

    _createCloud() {
        window.d3Cloud = d3.layout.cloud();
        return d3.layout.cloud();
    }

    /**
     * [Default function for rotation parametarization.]
     * Source: https://github.com/jasondavies/d3-cloud#rotate
     */
    _rotateToDegree(d) {
        return (~~(Math.random() * 6) - 3) * 30;
    }

    convertToCanvas() {
        const cloudSVGNode = this.html().find('svg')[0];
        const svgString = Converter.getSVGString(cloudSVGNode);

        Converter.svgString2Image(svgString, 2000, 1000, 'png', (file, fileSize) => {
            console.log('Successful File:', file, fileSize);
            saveAs(file); // FileSaver.js function
        });
    }

    draw(params) {
        const myDomNode = this.domNode;
        const FONT = FONTS.WORDCLOUD_D3;

        let { size, padding, rotation } = params;
        let layout;

        size = size ? size : DEFAULT_SIZE;

        this.cloud = layout = this._createCloud()
            .size(size)
            .words(this.words)
            .padding(padding)
            .font(FONT)
            .rotate(rotation ? rotation : this._rotateToDegree)
            .fontSize(d => d.size)
            .on('end', draw);

        layout.start();

        function draw(words) {
            d3
                .select(myDomNode)
                .append('svg')
                .attr('width', layout.size()[0])
                .attr('height', layout.size()[1])
                .append('g')
                .attr('transform', 'translate(' + layout.size()[0] / 2 + ',' + layout.size()[1] / 2 + ')')
                .selectAll('text')
                .data(words)
                .enter()
                .append('text')
                .style('font-size', d => d.size + 'px')
                .style('font-family', FONT)
                .style('fill', (d, i) => d.color)
                .attr('text-anchor', 'middle')
                .attr('transform', d => 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')')
                .text(d => d.text);
        }
    }
}
