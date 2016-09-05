const pug = require('./pug.js');
const Activity = require('./activity.js');

function get(url, callback){
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = function(){
    if( this.status >= 200 && this.status < 400 ) {
      callback(JSON.parse(this.response));
    }
  };
  request.onerror = function(){
    console.log('error with request at ', url);
  };
  request.send();
}

let nav = {

  activities: function(e){
    if(e) { e.preventDefault(); }
    get('/api/strava/activities', function(data){
      document.querySelector('#content > .panel.left').innerHTML = pug.activities(data);
      document.querySelectorAll('.play').forEach((link) => {
        link.addEventListener('click', nav.loadStream);
      });
    });
  },

  athlete: function(e){
    if(e) { e.preventDefault(); }
    get('/api/strava/athlete', function(data){
      document.querySelector('#content > .panel.left').innerHTML = pug.athlete(data);
    });
  },

  loadStream: function(e){
    e.preventDefault();
    let id = e.target.getAttribute('data-id');
    let stopButton = e.target.nextSibling;
    get('/api/strava/stream/' + id, function(data){

      let activity = new Activity(data);
      activity.playSong();

      stopButton.addEventListener('click', function(e){
        e.preventDefault();
        activity.stopSong();
      });
    });
  }

};

module.exports = nav;

