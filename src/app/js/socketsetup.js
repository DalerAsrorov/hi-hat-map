

let socket = io.connect('http://localhost:8000/');

const getTweets = (event) => {
    // console.log(`Ready: ${event}`);
    socket.emit('topic', "trump");
}

// Action
window.onload = (e) => {
  e.preventDefault();

  // let input = document.getElementById('pac-input')

  new L.Control.GPlaceAutocomplete({
    position: "topright",
    callback: (location) => {
        // object of google place is given
        console.log('Location given:', location);
        mainMap.panTo(location);

    }
  }).addTo(mainMap);

  socket.on('tweet', (tweet) => {
    console.log("Tweet: ", tweet);
  });
}



