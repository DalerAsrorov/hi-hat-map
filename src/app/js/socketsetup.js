

let socket = io.connect('http://localhost:8000/');

const getTweets = (event) => {
    // console.log(`Ready: ${event}`);
    socket.emit('bog', {bog: "Who is it?"});
}

// Action
window.onload = (e) => {
  e.preventDefault();


  socket.on('changeBog', (bog) => {
    console.log("The value of bog is", bog);
  });
}



