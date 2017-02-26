import Map from './map.js';
import * as ui from './ui.js'

// Action
window.onload = (e) => {
    e.preventDefault();

    let socket = io.connect('http://localhost:8000/');

    function getTweets(event) {
        // console.log(`Ready: ${event}`);
        socket.emit('topic', "trump");
    };

    $(`#downSliderBtn`).on('click', (event) => {
        console.log('CLICKED');
        ui.slideDown();
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
        columnsonsole.log('Tweet: ', tweet);
    });
};



