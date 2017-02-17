import Ember from 'ember';

export default Ember.Route.extend({
  premodel() {
    console.log("here");
  },
  model() {
    var tweetApp = tweetApp || {};
    (function(){
        tweetApp.tweetStream = function(callback) {
            var socket = io.connect();
            var self = this;

            socket.on('tweet', function(data) {
                console.log(data);
                callback(data);
            });
        }
    }());
  }
});
