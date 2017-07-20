import Map from './modules/map';
import * as ui from './modules/ui';
import * as Request from './modules/request';
import * as Paths from './modules/paths';
import * as utils from './modules/utils';
import * as MapOps from './modules/mapops';
import * as constants from './modules/constants';
import * as DataProcessing from './modules/dataprocessing';
import { getParameter } from './modules/sentiment-utils';
import Widgets from './modules/widgets';
import DynamicQueue from './classes/dynamic-queue';
import Storage from './classes/storage';
import StorageSystem from './classes/storagesystem';
import Component from './components/component';
import ShowboxComponent from './components/showbox-component';
import WordcloudD3Component from './components/wordcloud-d3-component';
import MapLoaderComponent from './components/map-loader-component';
import WidgetComponent from './components/widget-component';
import WidgetCollectionComponent from './components/widget-collection-component';
import WidgetCollectionContainerComponent from './components/widget-collection-container-component';
import ModalComponent from './components/modal-component';
import Components from './classes/components';
import PanelComponent from './classes/panelcomponent';
import Twitter from './classes/twitter';
import Sentiment from './classes/sentiment';
import Leaflet from './classes/leaflet';
import List from './classes/list';
import R from 'ramda';

$(window).load(function() {
    // Statuc modules
    const storageSystem = new StorageSystem(window.localStorage);
    const twitter = new Twitter('twitter');
    const sentiment = new Sentiment('social_media');
    const leaflet = new Leaflet();

    // Dynamic modules
    let rightComponents = new Components();
    let sentimentQueue = new DynamicQueue();
    let wordcloudQueue = new DynamicQueue();

    // Constants
    const TWITTER_MODES = constants.MAIN.TWITTER_MODES;
    const TWITTER_MODES_INDEX = constants.MAIN.TWITTER_MODES_INDEX;

    // connecting to socket
    let socket = io.connect('http://localhost:8000/');

    // other variables used throughout the code
    let cpOpen;
    let tracker;
    let cpRightList = [];
    let streamStateButtonIsOn = false;

    // Loader object
    const MapLoaderComp = new MapLoaderComponent('mapLoader', '#mapWrapper', 'div', '');
    MapLoaderComp.init();

    // Leaflet components
    let StopButtonL = L.easyButton({
        states: [
            {
                stateName: 'stream-is-on',
                icon: ui.generateWebIcon('fa-stop-circle-o', 'f1-1x', 'sent-neg-2', 'text'),
                title: 'Stop stream',
                onClick: function(control) {
                    const button = control.button;
                    const self = this;

                    twitter.stopStream(() => {
                        $(button).fadeOut(200, () => {
                            L.Util.requestAnimFrame(function() {
                                Map.removeControl(self);
                                streamStateButtonIsOn = false;
                            });
                        });
                    });
                }
            }
        ]
    });

    let sentimentChart = ui.generateChart(
        '#sentimentChart',
        {
            x: 'x',
            columns: [['x', new Date()], ['negative', 0], ['positive', 0], ['total', 0]]
        },
        {
            x: {
                type: 'timeseries',
                tick: {
                    centered: true,
                    format: utils.formatDateToHoursOnly
                }
            }
        }
    );

    /* INTRO LOADER CODE */
    $(() => {
        if (!storageSystem.getItem('firstVisit')) {
            ui.fadeOut('#initLoader', 3000, () => {
                ui.removeElement('#initLoader');
                ui.makeVisible('#mainWrapper', 500);
            });
        } else {
            ui.fadeOut('#initLoader', 550, () => {
                ui.removeElement('#initLoader');
                ui.makeVisible('#mainWrapper', 500);
            });
        }
    });

    storageSystem.setItem('firstVisit', true);
    cpOpen = storageSystem.getItem('cpOpen');

    if (cpOpen == 'false') {
        ui.slideToggleCp('controlPanelWrapper', Map);
    }

    ui.addEventListenerTo('toggleSliderBtn', 'click', event => ui.slideToggleCp('controlPanelWrapper', Map));

    new L.Control.GPlaceAutocomplete({
        position: 'topright',
        callback: function(location) {
            console.log('Location given:', location);
            const lat = location.geometry.location.lat();
            const lng = location.geometry.location.lng();

            // const sanFrancisco = [ '-122.75, 36.8, -121.75, 37.8' ];
            const lastLocation = [`${lng}, ${lat}, ${lng + 1}, ${lat + 1}`];

            storageSystem.setRawItem('lastLocation', lastLocation);
            Map.setView([lat, lng], 8, { animate: true, duration: 2.0 });
        }
    }).addTo(Map);

    socket.on('tweet', tweet => {
        MapLoaderComp.hide();

        let coordinates = tweet.place ? tweet.place.bounding_box.coordinates[0][1] : null;

        if (!streamStateButtonIsOn) {
            StopButtonL.addTo(Map);
            $(StopButtonL.button).show();
            streamStateButtonIsOn = true;
        }

        if (coordinates) {
            const boundingBox = tweet.place.bounding_box;
            const polygonCenter = leaflet.computePolygonCenter(L, boundingBox);
            const coordinates = leaflet.transformLatLngToArray(polygonCenter);
            const user = tweet.user;
            const text = tweet.text;
            const id = tweet.id;
            const created_at = tweet.created_at;
            const mlsTime = tweet.timestamp_ms;
            const data = twitter.processSingle(tweet);

            // 1. Process sentiment based on passed text
            // 2. Draw an object with metadata on the map
            //    and also draw it on the panel (panel is for future work).
            sentiment.processText({ text: text }).then(data => {
                data.geo = coordinates;
                data.tweet = tweet;

                const sentiment = data.sentiment;

                let selectedChartData = DataProcessing.createSentimentDataForChart(data, 'multiple');

                sentimentQueue.enqueue(selectedChartData);

                // we are interested in tweets that have emotions for word cloud
                if (sentiment.value.totalScore !== 0) {
                    wordcloudQueue.enqueue({
                        words: R.concat(
                            getParameter(sentiment, 'positiveWords', 'text'),
                            getParameter(sentiment, 'negativeWords', 'text')
                        ),
                        polarities: R.concat(
                            getParameter(sentiment, 'positiveWords', 'polarity'),
                            getParameter(sentiment, 'negativeWords', 'polarity')
                        )
                    });
                }

                // if(sentimentQueue.size() === 5) {
                let posList = sentimentQueue.queue.map(sentimentObject => sentimentObject.positive),
                    negList = sentimentQueue.queue.map(sentimentObject => sentimentObject.negative),
                    totalList = sentimentQueue.queue.map(sentimentObject => sentimentObject.total),
                    dateList = sentimentQueue.queue.map(sentimentObject => sentimentObject.date);

                // place x before all dates
                posList.unshift('positive');
                negList.unshift('negative');
                totalList.unshift('total');
                dateList.unshift('x');

                sentimentChart.load({
                    columns: [dateList, posList, negList, totalList]
                });

                if (sentimentQueue.size() === 5) {
                    sentimentQueue.dequeue();
                    console.log('P00P2 Queue item removed');
                }

                const renderObject = {
                    data,
                    type: 'twitter'
                };

                MapOps.renderObject(renderObject);
            });
        } else {
            console.log('Passed tweet with no coordinates', tweet);
        }
    });

    function getInfoBasedOnChosenMode(mode, query, lastLocation, twitData) {
        switch (mode) {
        case 'real_time':
            twitter.socketEmit(socket, 'topic', { topic: query, location: lastLocation });
            break;
        case 'specified_time':
            twitter
                    .getData(Paths.getTwitData(), twitData)
                    .then(data => console.log(data))
                    .catch(err => new Error('err', err));
            break;
        default:
            console.log('none of the modes selected');
        }
    }

    ui.onSubmit('#querySearchForm', function(e) {
        e.preventDefault();

        MapLoaderComp.show();

        const query = ui.getInputValue('#querySearch');
        const lat = Map.getCenter().lat;
        const lng = Map.getCenter().lng;
        const twitData = { q: query, geocode: [lat, lng], radius: '25mi' };

        let lastLocation = [`${lng}, ${lat}, ${lng + 1}, ${lat + 1}`];

        if (R.isNil(storageSystem.getItem('lastLocation'))) {
            console.log('Not selected. twitData:', twitData);
            // const testTwitDataItemTest = {q: 'trump', geocode: [37.7749, -122.4194], radius: '25mi'};

            getInfoBasedOnChosenMode('real_time', query, lastLocation, twitData);
        } else {
            console.log('Exists', lastLocation);

            /**

                TODO:
                - This is for General and Selective timing
                - Get data points and draw them on the map

             */
            // const first = MapOps.generateResults([1, 2, 3, 4]);
            // first(lastLocation);

            /**

                TODO:
                - This portion of code is for Socket.io/real time tweet streaming
                - Get location and query and start connecting to the socket

             */
            getInfoBasedOnChosenMode('real_time', query, lastLocation, twitData);
        }

        // last location is savedd
        storageSystem.setRawItem('lastLocation', lastLocation);

        // once query selected:
        // check if location is already selected
        // if yes, then go to that location
        //          and show the results
        // if no, then get the center of the current
        //        location of the screen and show the results.
        //
    });

    // generation
    // ui.generateCpRightPanel('#panelWrapper', {});

    // Testing area
    let testGeo = '-25.2744,-133.7751'; // Australia
    // console.log('Path:', Paths.getGeoTrends(testGeo));
    console.log(Paths.getGeoTrends(testGeo));
    Request.getRequest(Paths.getGeoTrends(testGeo))
        .then(trends => {
            if (trends.data) {
                let listOfTrends = trends.data.trends;
                let geoData = trends.geo;

                $('#querySearch').easyAutocomplete({
                    data: listOfTrends,
                    getValue: 'name',
                    list: {
                        match: {
                            enabled: true
                        },
                        onShowListEvent: function() {
                            switch (storageSystem.getItem('cpOpen')) {
                            case 'false':
                                ui.addClass('.easy-autocomplete-container', 'autocomplete-top');
                                break;
                            case 'true':
                                ui.removeClass('.easy-autocomplete-container', 'autocomplete-top');
                                break;
                            default:
                                ui.removeClass('.easy-autocomplete-container', 'autocomplete-top');
                            }
                        },
                        onKeyEnterEvent: function() {}
                    }
                    // template: {
                    //     type: "custom"
                    //     // method: function(value, item) {
                    //     //     return "<img src='" + item.icon + "' /> | " + item.type + " | " + value;
                    //     // }
                    // }
                });
            } else {
                console.log('no data', data);
            }

            // TODO: implement results widgets
            // const WidgetComp = new WidgetComponent(id, desc, action, icon, data=optional);
            // const WidgetComp1 = new WidgetComponent(id, desc, action, icon, data=optional);
            // let WidgetCollectionComp = new WidgetCollectionComponent(id, [WidgetComp, WidgetComp1]);
            // const resultStageWidgets = Widgets.getResultStageWidgets().map((widget) => {
            //         return new PanelComponent(widget.id, widget.desc, widget.action, widget.data);
            // });

            // const WidgetComp1 = new WidgetComponent('w1', 'Item W1', 'col-lg-2', (item) =>console.log('hi', item), null,['daler', 'asrorov']);
            // const WidgetComp2 = new WidgetComponent('w2', 'Item W2', 'col-lg-2', (item) =>console.log('hi', item), null, ['shukhrat', 'asrorov']);
            // let WidgetCollectionComp = new WidgetCollectionComponent('wCollet', '#panelCompLeft', 'Widgets', [WidgetComp1, WidgetComp2]);
            // WidgetCollectionComp.init();

            let listOfWidgets1 = [],
                listOfWidgets2 = [];
            for (let i = 0; i < 8; i++) {
                const j = i * 10;
                listOfWidgets1.push(
                    new WidgetComponent(
                        'w' + i,
                        'Item W' + i,
                        'col-lg-2',
                        item => console.log('hi', item, i),
                        'fa-twitter',
                        ['daler', 'asrorov, ' + i]
                    )
                );
                listOfWidgets2.push(
                    new WidgetComponent(
                        'w' + j,
                        'Item W' + j,
                        'col-lg-2',
                        item => console.log('hi', item, j),
                        'fa-twitter',
                        ['daler', 'asrorov, ' + j]
                    )
                );
            }

            let WidgetCollectionComp1 = new WidgetCollectionComponent(
                'wCollet1',
                '#panelCompLeft',
                'Widgets 1',
                listOfWidgets1
            );
            let WidgetCollectionComp2 = new WidgetCollectionComponent(
                'wCollet2',
                '#panelCompLeft',
                'Widgets 2',
                listOfWidgets2
            );
            WidgetCollectionComp1.init();
            WidgetCollectionComp2.init();

            let WidgetColContainerComp1 = new WidgetCollectionContainerComponent(
                'wCollectCont1',
                '#panelCompLeft',
                'div',
                [WidgetCollectionComp1, WidgetCollectionComp2]
            );
            WidgetColContainerComp1.init();

            let panelComp1 = new PanelComponent(
                '#topTen',
                'Top 10 Tweets',
                function() {
                    console.log('hi');
                },
                [{ name: 'daler' }, { name: 'michael' }]
            );
            let panelComp2 = new PanelComponent(
                '#topTwenty',
                'Top 10 Retweets',
                function() {
                    console.log('hi');
                },
                [{ lastname: 'asrorov' }, { lastname: 'jojo' }]
            );
            let panelComp3 = new PanelComponent(
                '#topThirty',
                'Top 30 Retweets',
                function() {
                    console.log('hi');
                },
                [{ jorge: 'quero' }, { sandro: 'bolo' }]
            );

            rightComponents.add(panelComp1);
            rightComponents.add(panelComp2);
            rightComponents.add(panelComp3);
            rightComponents.setName('Social Media');
            rightComponents.setId('socMedia');

            console.log('panelComp object:', rightComponents);
            ui.appendDropDownToPanel('#panelCompRightWrapper', rightComponents);
        })
        .catch(err => {
            console.log('Error request', err);
        });

    const arrayOfIndexes = TWITTER_MODES.map((item, index) => index);
    const arrayOfLabels = TWITTER_MODES.map(mode => utils.titleCase(mode.split('_').join(' ')));
    ui.appendRangeSlider('#panelCompMiddle', 'range-selector', 'twitterModes', {
        ticks: arrayOfIndexes,
        ticksLabels: arrayOfLabels,
        min: arrayOfIndexes[0],
        max: arrayOfIndexes[arrayOfIndexes.length - 1],
        step: 1,
        value: arrayOfIndexes[0],
        tooltip: 'hide',
        eventHandlers: {
            change: function(slideEvt) {
                const newMode = slideEvt.value.newValue;
                const prevMode = slideEvt.value.oldValue;
                switch (newMode) {
                case TWITTER_MODES_INDEX['real_time']:
                    break;
                case TWITTER_MODES_INDEX['specified_time']:
                        // check the cache
                        // if location data already exists
                        //      return location from cache
                        // else
                        //      store location in cache in (key, value) pair where key is location and value is tweets
                        //      return location
                    const query = ui.getInputValue('#querySearch');
                    const lat = Map.getCenter().lat;
                    const lng = Map.getCenter().lng;
                    const twitData = { q: query, geocode: [lat, lng], radius: '25mi' };

                    twitter
                            .getData(Paths.getTwitData(), twitData)
                            .then(data => {
                                const [statuses, searchMetadata] = [data.statuses, data.search_metadata];

                                const filteredTweets = twitter.processData(statuses, searchMetadata);

                                filteredTweets.forEach(function(data) {
                                    sentiment
                                        .processText({ text: data.text })
                                        .then(function(sentiment) {
                                            return new Promise((resolve, reject) =>
                                                resolve({ sentiment: sentiment, data: data, type: 'twitter' })
                                            );
                                        })
                                        .then(function(renderObject) {
                                            MapOps.renderObject(renderObject);
                                        });
                                });

                                console.log(filteredTweets);
                            })
                            .catch(err => console.log('getData() - ', err));

                    break;
                default:
                    console.log('none selected');
                }
                console.log('Event: change. Slider object', slideEvt);
            }
        }
    });

    let contextMenu = ui.addContextMenuTo('#mapWrapper', '#mapContextMenu', 'mapContextMenuList', 'contextmenu');
    contextMenu.hide();
    contextMenu.bind();
    contextMenu.appendMenuItem('One', () => console.log('One'), 'click');
    contextMenu.appendMenuItem('Two', () => console.log('Two'), 'click');
    contextMenu.appendMenuItem('Three', () => console.log('Three'), 'click');
    contextMenu.addClassesToAllMenuItems('sup-li');

    // contextMenu.fadeOut();

    // MODAL stuff
    let WordcloudModalComp = new ModalComponent('wordcloudModal', '#wrapper', 'div');
    WordcloudModalComp.init();
    WordcloudModalComp.buildHeader('Hello There');
    // WordcloudModalComp.buildBody(
    //     `<div id='hello'>
    //         <section class='one'>
    //             One
    //         </section>
    //         <section class='two'>
    //             Two
    //         </section>
    //     </div>`);
    //
    // WordcloudModalComp.buildFooter([
    //     {
    //         name: 'Destroy',
    //         type: 'btn btn-info',
    //         dataDismissModal: true,
    //         action: (ev) => { console.log(`Name:s`, ev) }
    //     }, {
    //         name: 'Help',
    //         type: 'btn btn-danger',
    //         dataDismissModal: true,
    //         action: (ev) => { console.log(`Name:`, ev) }
    //     }, {
    //         name: 'Somebody',
    //         type: 'btn btn-primary',
    //         dataDismissModal: true,
    //         action: (ev) => { console.log(`Name:`, ev) }
    //     }
    // ]);
    //
    // WordcloudModalComp.show();

    const tempWords = [
        {
            text: 'Bingo!',
            size: 32,
            color: '#FF00FF'
        },
        {
            text: 'word',
            size: 42,
            color: '#2F4070'
        }
    ];
    let WordCloudD3Container = new Component('#wordcloudD3', '#wordcloudModal', 'div', '');
    let WordcloudD3Comp = new WordcloudD3Component('', '', 'div', '', tempWords);
    WordCloudD3Container.appendChild(WordcloudD3Comp);
    WordcloudD3Comp.draw({
        // size: [200, 200],
        padding: 5
        // rotation: () => ~~(Math.random() * 1)
    });

    WordcloudModalComp.buildBody(WordCloudD3Container.html());
    WordcloudModalComp.show();

    // Request.getRequest(Utils.getTrendsPlaces(lat, long))å
    //     .then((data) => {
    //         console.log("Trends Data");
    //     })

    // post request testing
});
