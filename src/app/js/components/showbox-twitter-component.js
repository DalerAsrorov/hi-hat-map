import ShowboxComponent from './component.js';
import { convertToDOMElement } from '../modules/ui.js';

export default class ShowboxTwitterComponent extends ShowboxComponent {
    constructor(id, parent, nodeType='div', content, data) {
        super(id, parent, nodeType, content);
        this.data = data;
    }

    generate() {
        const testString = 'Daler Asrorov';
        const testString2 = 'William Sallivan';

        // id, parent, nodeType, content
        const template =
            `<div class='showbox-wrapper twitter-showbox-wrapper'>
                <header class='twitter-showbox-header'>
                    <span> ${testString} </span>
                    <span> ${testString2} </span>
                </header>
                <div class='twitter-showbox-content'>
                    <div>
                        <section class='twitter-showbox-prof'>
                            <img src='' alt="${testString}'s profile image" />
                            <span class='twitter-showbox-username'>${testString2}</span>
                        </section>
                        <section class='twitter-showbox-total'>
                        </section>
                    </div>
                    <div class='twitter-showbox-sentiment'>
                        <div>
                            ${testString}
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
