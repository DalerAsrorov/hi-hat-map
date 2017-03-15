import Map from './modules/map.js';
import * as ui from './modules/ui.js';
import * as Request from './modules/request.js';
import * as Paths from './modules/paths.js';
import * as utils from './modules/utils.js';
import StorageSystem from './classes/storagesystem.js';
import PanelComponent from './classes/panelcomponent.js';
import Components from './classes/components.js';

// Action
$(window).load(() => {
    const storageSystem = new StorageSystem(window.localStorage);
    let socket = io.connect('http://localhost:8000/');
    let cpOpen,
        cpRightList =[];

    let rightComponents = new Components();

    console.log(storageSystem.getItem('firstVisit'));

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
    console.log('cpOpen:::', cpOpen);
    if(cpOpen == 'false') {
        console.log("Should slide: cpOpen", cpOpen);
        ui.slideToggleCp('controlPanelWrapper', Map);
    }


    function getTweets(event) {
        // console.log(`Ready: ${event}`);
        socket.emit('topic', "trump");
    };


    ui.addEventListenerTo('toggleSliderBtn', 'click', (event) => {
        ui.slideToggleCp('controlPanelWrapper', Map);
    });

    // let input = document.getElementById('pac-input')
    new L.Control.GPlaceAutocomplete({
        position: 'topright',
        callback: function(location) {
            // object of google place is given
            console.log('Location given:', location);
            const lat = location.geometry.location.lat();
            const lng = location.geometry.location.lng();
            Map.setView([lat, lng], 8, {animate: true, duration: 2.0});

        }
    }).addTo(Map);

    socket.on('tweet', (tweet) => {
        console.log('Tweet: ', tweet);
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
                                   $('.easy-autocomplete-container').addClass('autocomplete-top');
                                   break;
                                case 'true':
                                   $('.easy-autocomplete-container').removeClass('autocomplete-top');
                                   break;
                                default:
                                   $('.easy-autocomplete-container').removeClass('autocomplete-top');
                            };
                        },
                        onKeyEnterEvent: function() {
                            console.log("HEY KEYBOARD");
                            return "HELLO";
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

            // (function() {
            //     // for(let i = 0; i < 10; i++) {
            //     //     ui.addElementToPanel
            //     //     (
            //     //         '#panelCompRightWrapper',
            //     //         {},
            //     //         "Button " + i,
            //     //         $('<a></a>'),
            //     //         'menu btn btn-secondary',
            //     //         'col-lg-4'
            //     //     );
            //     // }

            //     // undefined by default will place 'div' element

            //     // ui.addElementTo('')

            // }());

            // console.log('Should reach here...');
            // let dropdown = ui.addContainerToContainer('#panelCompRightWrapper', 'favorites', undefined, 'dropdown show');
            // let $a = ui.addContainerToContainer(dropdown.attr('id'), undefined, $('<a>'), 'btn btn-secondary dropdown-toggle');
            // ui.addTextTo($a, $a.attr('id'));

            //target, dropdownName, dropdownID, dataList


            let panelComp1 = new PanelComponent('#topTen',
                                               'Top 10 Tweets',
                                               function(){console.log('hi')},
                                               [{"name":"daler"}, {"name":"michael"}]);
            let panelComp2 = new PanelComponent('#topTwenty',
                                                'Top 10 Retweets',
                                                function(){console.log('hi')},
                                                [{"lastname":"asrorov"}, {"lastname":"jojo"}])
            rightComponents.add(panelComp1);
            rightComponents.add(panelComp2);
            rightComponents.setName('Social Media');
            rightComponents.setId('socMedia');

            console.log("panelComp object:", rightComponents);
            ui.appendDropDownToPanel('#panelCompRightWrapper', rightComponents)

    })
    .catch((err) => {
        console.log("Error request", err);
    });

    // Request.getRequest(Utils.getTrendsPlaces(lat, long))
    //     .then((data) => {
    //         console.log("Trends Data");
    //     })
});
