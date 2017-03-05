import Map from './map.js';
import * as ui from './ui.js';
import * as Request from './request.js';
import * as Paths from './paths.js';
import StorageSystem from './storagesystem.js';

// Action
window.onload = (e) => {
    e.preventDefault();
    const storageSystem = new StorageSystem(window.localStorage);
    let socket = io.connect('http://localhost:8000/');
    let cpOpen;


    // if(storageSystem.getItem('cpOpen'));
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

    $(`#toggleSliderBtn`).on('click', (event) => {
        console.log('CLICKED');
        ui.slideToggleCp('controlPanelWrapper', Map);
    });

    // let input = document.getElementById('pac-input')
    new L.Control.GPlaceAutocomplete({
        position: 'topright',
        callback: (location) => {
            // object of google place is given
            console.log('Location given:', location);
            Map.panTo(location);

        }
    }).addTo(Map);

    socket.on('tweet', (tweet) => {
        console.log('Tweet: ', tweet);
    });


    // Testing area
    let testGeo = '-25.2744,-133.7751'; // Australia
    // console.log('Path:', Paths.getGeoTrends(testGeo));
    console.log(Paths.getGeoTrends(testGeo));
    Request.getRequest(Paths.getGeoTrends(testGeo))
    .then((data) => {
        // const trendsArray = data.data.trends;
        // const trendsNameArray = trendsArray.map((trend) => trend.name);

        if(data.data) {
            let listOfTrends = data.data.trends;
            let geoData = data.geo;
            console.log("Geo Data:", geoData);
            console.log("Trends:", listOfTrends);

            $("#querySearch").easyAutocomplete({
                data: listOfTrends,
                getValue: "name",
                list: {
                    match: {
                        enabled: true
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

        // console.log(trendsNameArray);

    })
    .catch((err) => {
        console.log("Error request", err);
    });

    // Request.getRequest(Utils.getTrendsPlaces(lat, long))
    //     .then((data) => {
    //         console.log("Trends Data");
    //     })
};



