import ShowboxComponent from './component.js';
import { convertToDOMElement, getOuterHTMLText } from '../modules/ui.js';
import { zipObj, isEmpty, isNil, keys } from 'ramda';

export default class ShowboxTwitterComponent extends ShowboxComponent {
    constructor(id, parent, nodeType='div', content, data) {
        super(id, parent, nodeType, content);
        this.data = data;
    }

    generateTemplate() {
        // fetching sentiment values from data object
        const data = this.data;

        const sentimentTotalScore = data.sentiment.value.totalScore;
        const sentimentValence = data.sentiment.value.valence;

        // fetching sentiment polarity and word list => {word1: polarity1, word2: polarity2, ...}
        const sentimentNegativeWordList = data.sentiment.negativeWords
                                                        .map(word => word.text);
        const sentimentNegativePolarityList = data.sentiment.negativeWords
                                                        .map(word => word.polarity);
        const sentimentNegativeWordPolarityDict = zipObj(sentimentNegativeWordList, sentimentNegativePolarityList);

        // fetching sentiment negative and word list => {word1: polarity1, word2: polarity2, ...}
        const sentimentPositiveWordList = data.sentiment.positiveWords
                                                        .map(word => word.text);
        const sentimentPositivePolarityList = data.sentiment.positiveWords
                                                        .map(word => word.polarity);
        // TODO: add this inside of its html container `${keys()}`
        const sentimentPositiveWordPolarityDict = zipObj(sentimentPositiveWordList, sentimentPositivePolarityList);

        let posWordsHtmlDiv = null, negWordsHtmlDiv = null;
        if(!isEmpty(sentimentPositiveWordPolarityDict)) {
            posWordsHtmlDiv = $('<div class="twitter-showbox-positive-words"></div>');
            for(let [key, value] of Object.entries(sentimentPositiveWordPolarityDict)) {
                posWordsHtmlDiv.append(`<span class='sent-pos-${value}'>${key}</span> `);
            }
        }
        if(!isEmpty(sentimentNegativeWordPolarityDict)) {
            negWordsHtmlDiv = $('<div class="twitter-showbox-negative-words"></div>')
            for(let [key, value] of Object.entries(sentimentNegativeWordPolarityDict)) {
                negWordsHtmlDiv.append(`<span class='sent-neg${value}'>${key}</span> `);
            }
        }

        // id, parent, nodeType, content
        const template =
            `<div class='showbox-wrapper twitter-showbox-wrapper'>
                <header class='twitter-showbox-header'>
                    <span> ${sentimentTotalScore} </span>
                    <span> ${sentimentValence} </span>
                </header>
                <div class='twitter-showbox-content'>
                    <div>
                        <section class='twitter-showbox-prof'>
                            <img src='' alt=" 's' profile image" />
                            <span class='twitter-showbox-username'></span>
                        </section>
                        <section class='twitter-showbox-total'>
                        </section>
                    </div>
                    <div class='twitter-showbox-sentiment'>
                        <div>

                        </div>
                        <div class="twitter-showbox-sentiment-words">
                            ${getOuterHTMLText(negWordsHtmlDiv) }
                            ${getOuterHTMLText(posWordsHtmlDiv) }
                        </div>
                    </div>
                </div>
                <footer class='twitter-showbox-footer'>
                </footer>
            </div>`;

        const $node = convertToDOMElement(template);

        this.update({
            $node
        });

        return $node;
    }
}
