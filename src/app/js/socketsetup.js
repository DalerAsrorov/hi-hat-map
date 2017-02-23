

let socket = io.connect('http://localhost:8000/');

const getTweets = (event) => {
    // console.log(`Ready: ${event}`);
    socket.emit('topic', "trump");
}

// Action
window.onload = (e) => {
  e.preventDefault();

  socket.on('tweet', (tweet) => {
    console.log("The value of bog is", tweet);
  });
}



