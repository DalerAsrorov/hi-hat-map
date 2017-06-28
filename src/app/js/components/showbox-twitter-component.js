import ShowboxComponent from './component.js';
import { convertToDOMElement, getOuterHTMLText } from '../modules/ui.js';
import { IMAGES } from '../modules/constants.js';
import { zipObj, isEmpty, isNil, keys } from 'ramda';

export default class ShowboxTwitterComponent extends ShowboxComponent {
    constructor(id, parent, nodeType='div', content, data) {
        super(id, parent, nodeType, content);
        this.data = data;
    }

    generateTemplate() {
        // fetching sentiment values from data object
        const data = this.data;
        const tweet = data.tweet;
        const sentiment = data.sentiment;
        const geo = data.geo;
        const metadata = data.metadata;

        // fetching tweet's user data
        const userScreenName = tweet.user.screen_name
        const userProfileImageURL = tweet.user.profile_image_url || IMAGES.DEFAULT.SHOWBOX_USER_PROFILE_IMG;

        // fetching total sentiment values
        const sentimentTotalScore = sentiment.value.totalScore;
        const sentimentValence = sentiment.value.valence;

        // fetching sentiment polarity and word list => {word1: polarity1, word2: polarity2, ...}
        const sentimentNegativeWordList = sentiment.negativeWords
                                                        .map(word => word.text);
        const sentimentNegativePolarityList = sentiment.negativeWords
                                                        .map(word => word.polarity);
        const sentimentNegativeWordPolarityDict = zipObj(sentimentNegativeWordList, sentimentNegativePolarityList);

        // fetching sentiment negative and word list => {word1: polarity1, word2: polarity2, ...}
        const sentimentPositiveWordList = sentiment.positiveWords
                                                        .map(word => word.text);
        const sentimentPositivePolarityList = sentiment.positiveWords
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
                    <time> ${ new Date().toLocaleTimeString() } </time>
                </header>
                <div class='row twitter-showbox-content'>
                    <div class='twitter-showbox-prof col-lg-12 row'>
                        <section class='col-lg-3'>
                            <div class='row width-100'>
                                <img class='showbox-profile-img' src='${ userProfileImageURL }' alt="${ userScreenName }'s' profile image." />
                                <span class='twitter-showbox-username'> ${ userScreenName } </span>
                            </div>
                        </section>
                        <section class='twitter-showbox-total col-lg-9'>
                            <div classs='shwobox-stats'>
                                <span> ${ sentimentTotalScore } </span>
                                <span> ${ sentimentValence } </span>
                            </div>
                        </section>
                    </div>
                    <div class='twitter-showbox-sentiment col-lg-12'>
                        <div>

                        </div>
                        <div class="twitter-showbox-sentiment-words">
                            ${ getOuterHTMLText(negWordsHtmlDiv) }
                            ${ getOuterHTMLText(posWordsHtmlDiv) }
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
