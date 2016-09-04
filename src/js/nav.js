const pug = require('./pug.js');
const Song = require('./song.js');

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


module.exports = function(map){

  let nav = {
    activities: function(e){
      if(e) { e.preventDefault(); }
      get('/api/strava/activities', function(data){
        document.querySelector('#content > .panel.left').innerHTML = pug.activities(data);
        document.querySelectorAll('.stream').forEach((link) => {
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
      get('/api/strava/stream/' + id, function(data){
        console.log(data);
        map.load(data);
        let songData = (function(data){
          let a = [];
          for( let i = 0; i < data.length; i++ ){
            a.push(data[i][0]*10);
          }
          return a;
        }(data[0].data));
        let song = new Song(songData);
        song.playSong();
      });
    }

  };

  return nav;
}
