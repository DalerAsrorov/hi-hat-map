import Map from './modules/map.js';
import * as ui from './modules/ui.js';
import * as Request from './modules/request.js';
import * as Paths from './modules/paths.js';
import * as utils from './modules/utils.js';
import * as MapOps from './modules/mapops.js';
import * as constants from './modules/constants.js';
import * as DataProcessing from './modules/dataprocessing.js';
import DynamicQueue from './classes/dynamic-queue.js';
import Storage from './classes/storage.js';
import StorageSystem from './classes/storagesystem.js';
import Component from './components/component.js';
import ShowboxComponent from './components/showbox-component.js';
import WordcloudD3Component from './components/wordcloud-d3-component.js';
import Components from './classes/components.js';
import PanelComponent from './classes/panelcomponent.js';
import Twitter from './classes/twitter.js';
import Sentiment from './classes/sentiment.js';
import Leaflet from './classes/leaflet.js';
import List from './classes/list.js';
import R from 'ramda';

$(window).load(function() {
    console.log('Rollup watch running...');
    // Statuc modules
    const storageSystem = new StorageSystem(window.localStorage);
    const twitter = new Twitter('twitter');
    const sentiment = new Sentiment('social_media');
    const leaflet = new Leaflet();

    // Dynamic modules
    let rightComponents = new Components();
    let sentimentQueue = new DynamicQueue();

    // Constants
    const TWITTER_MODES = constants.MAIN.TWITTER_MODES;
    const TWITTER_MODES_INDEX = constants.MAIN.TWITTER_MODES_INDEX;

    // connecting to socket
    let socket = io.connect('http://localhost:8000/');

    // other variables used throughout the code
    let cpOpen,
        tracker,
        cpRightList = [];


    let sentimentChart = ui.generateChart('#sentimentChart', {
        x: 'x',
        columns: [
            ['x', new Date()],
            ['negative', 0],
            ['positive', 0],
            ['total', 0]
        ]
    }, {
        x: {
            type: 'timeseries',
            tick: {
                centered: true,
                format: utils.formatDateToHoursOnly
            }
        }
    });

    /* INTRO LOADER CODE */
    $(() => {
        if(!storageSystem.getItem('firstVisit')) {
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
    if(cpOpen == 'false') {
        ui.slideToggleCp('controlPanelWrapper', Map);
    }

    ui.addEventListenerTo('toggleSliderBtn', 'click', (event) => ui.slideToggleCp('controlPanelWrapper', Map));

    new L.Control.GPlaceAutocomplete({
        position: 'topright',
        callback: function(location) {
            console.log('Location given:', location);
            const lat = location.geometry.location.lat();
            const lng = location.geometry.location.lng();

            // const sanFrancisco = [ '-122.75, 36.8, -121.75, 37.8' ];
            const lastLocation = [`${lng}, ${lat}, ${lng+1}, ${lat+1}`];

            storageSystem.setRawItem('lastLocation', lastLocation);
            Map.setView([lat, lng], 8, {animate: true, duration: 2.0});
        }
    }).addTo(Map);


    const socketStarted = true;
    socket.on('tweet', (tweet) => {
        let coordinates = tweet.place ? tweet.place.bounding_box.coordinates[0][1] : null;
        if(coordinates) {
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
            sentiment.processText({text: text})
            .then((data) => {
                data.geo = coordinates;
                data.tweet = tweet;

                let selectedChartData = DataProcessing.createSentimentDataForChart(data, 'multiple');

                sentimentQueue.enqueue(selectedChartData);

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
                    columns: [
                        dateList,
                        posList,
                        negList,
                        totalList
                    ]
                });

                // load new data after each time the queue size reaches 5
                if(sentimentQueue.size() === 5) {
                    sentimentQueue.dequeue();
                    console.log('P00P2 Queue item removed');
                }
                // }

                console.log('P00P sentimentChart after if statement', sentimentQueue, ' size:', sentimentQueue.size());

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
        switch(mode) {
            case 'real_time':
                twitter.socketEmit(socket, 'topic', {topic: query, location: lastLocation});
                break;
            case 'specified_time':
                twitter.getData(Paths.getTwitData(), twitData)
                .then((data) => console.log(data))
                .catch((err) => new Error('err', err));
                break;
            default:
                console.log('none of the modes selected');

        }
    }

    ui.onSubmit('#querySearchForm', function(e) {
        e.preventDefault();
        const query = ui.getInputValue('#querySearch');
        const lat = Map.getCenter().lat;
        const lng = Map.getCenter().lng;
        const twitData = {q: query, geocode: [lat, lng], radius: '25mi'};

        let lastLocation = [`${lng}, ${lat}, ${lng+1}, ${lat+1}`];

        if(R.isNil(storageSystem.getItem('lastLocation'))) {
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
        };

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
    .then((data) => {
        if(data.data) {
            let listOfTrends = data.data.trends;
            let geoData = data.geo;

            $("#querySearch").easyAutocomplete({
                data: listOfTrends,
                getValue: 'name',
                list: {
                    match: {
                        enabled: true
                    },
                    onShowListEvent: function() {
                        switch(storageSystem.getItem('cpOpen')) {
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
                    onKeyEnterEvent: function() {

                    }
                }
                // template: {
                //     type: "custom"
                //     // method: function(value, item) {
                //     //     return "<img src='" + item.icon + "' /> | " + item.type + " | " + value;
                //     // }
                // }
            });

        } else {
            console.log("no data", data);
        }

        let panelComp1 = new PanelComponent('#topTen',
                                           'Top 10 Tweets',
                                           function(){console.log('hi')},
                                           [{'name':'daler'}, {'name':'michael'}]);
        let panelComp2 = new PanelComponent('#topTwenty',
                                            'Top 10 Retweets',
                                            function(){console.log('hi')},
                                            [{'lastname':'asrorov'}, {'lastname':'jojo'}]);
        let panelComp3 = new PanelComponent('#topThirty',
                                'Top 30 Retweets',
                                function(){ console.log('hi') },
                                [{'jorge':'quero'}, {'sandro':'bolo'}]);

        rightComponents.add(panelComp1);
        rightComponents.add(panelComp2);
        rightComponents.add(panelComp3);
        rightComponents.setName('Social Media');
        rightComponents.setId('socMedia');

        console.log("panelComp object:", rightComponents);
        ui.appendDropDownToPanel('#panelCompRightWrapper', rightComponents);

    })
    .catch((err) => {
        console.log("Error request", err);
    });

    const arrayOfIndexes = TWITTER_MODES.map((item, index) => index);
    const arrayOfLabels = TWITTER_MODES.map((mode) => utils.titleCase(mode.split('_').join(' ')));
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
                switch(newMode) {
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
                        const twitData = {q: query, geocode: [lat, lng], radius: '25mi'};


                        twitter.getData(Paths.getTwitData(), twitData)
                        .then((data) => {
                            const [statuses, searchMetadata] = [data.statuses, data.search_metadata];

                            const filteredTweets = twitter.processData(statuses, searchMetadata);

                            filteredTweets.forEach(function(data) {
                                sentiment.processText({text: data.text})
                                .then(function(sentiment) {
                                    return new Promise((resolve, reject) => resolve({sentiment: sentiment, data: data, type: 'twitter'}))
                                })
                                .then(function(renderObject) {
                                    MapOps.renderObject(renderObject);
                                });
                            });

                            console.log(filteredTweets);
                        })
                        .catch((err) => console.log('getData() - ', err))

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
    contextMenu.appendMenuItem('One', ()=> console.log('One'), 'click');
    contextMenu.appendMenuItem('Two', ()=> console.log('Two'), 'click');
    contextMenu.appendMenuItem('Three', ()=> console.log('Three'), 'click');
    contextMenu.addClassesToAllMenuItems('sup-li');

    // const list = new List('contextMenuList', 'contextMenuList');
    // list.bindTo(contextMenu.$html());
    // list.addItem('One', ()=>console.log('One'), 'click');
    // list.addItem('Two', ()=>console.log('Two'), 'click');
    // list.addItem('Three', ()=>console.log('Three'), 'click');
    // list.addClassesToAllItems('sup-li');

    // contextMenu.fadeOut();


    // WORDCLOUD STUFF

    // var cloud = d3.layout.cloud;
    //
    // var fill = d3.scale.category20();
    //
    // var layout = cloud()
    //     .size([500, 500])
    //     .words([
    //       "Hello", "world", "normally", "you", "want", "more", "words",
    //       "than", "this"].map(function(d) {
    //       return {text: d, size: 10 + Math.random() * 90, test: "haha"};
    //     }))
    //     .padding(5)
    //     .rotate(function() { return ~~(Math.random() * 1) * 90; })
    //     .font("Impact")
    //     .fontSize(function(d) { return d.size; })
    //     .on("end", draw);
    //
    // layout.start();
    //
    // function draw(words) {
    //   d3.select("#wordcloudD3").append("svg")
    //       .attr("width", layout.size()[0])
    //       .attr("height", layout.size()[1])
    //     .append("g")
    //       .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
    //     .selectAll("text")
    //       .data(words)
    //     .enter().append("text")
    //       .style("font-size", function(d) { return d.size + "px"; })
    //       .style("font-family", "Impact")
    //       .style("fill", function(d, i) { return '#000'; })
    //       .attr("text-anchor", "middle")
    //       .attr("transform", function(d) {
    //         return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
    //       })
    //       .text(function(d) { return d.text; });
    // }
    const tempWords = [ "Hello", "world", "normally", "you", "want", "more", "words", "than", "this"]
    let WordcloudD3Comp = new WordcloudD3Component(
        '#wordcloudD3',
        '',
        '',
        '',
        tempWords
    );
    WordcloudD3Comp.draw({
        size: [200, 200],
        padding: 5,
        
    });

        console.log(WordcloudD3Comp);

    // Request.getRequest(Utils.getTrendsPlaces(lat, long))å
    //     .then((data) => {
    //         console.log("Trends Data");
    //     })

    // post request testing
});
