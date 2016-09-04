const pug = require('./pug.js');

module.exports = function(map){
  let nav = {

    get: function(url, callback){
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
    },

    activities: function(e){
      if(e){
        e.preventDefault();
      }
      nav.get('/api/strava/activities', function(data){
        document.querySelector('#content > .panel.left').innerHTML = pug.races(data);
        document.querySelectorAll('.stream').forEach((link) => {
          link.addEventListener('click', nav.loadStream);
        });
      });
    },

    athlete: function(e){
      if(e){
        e.preventDefault();
      }
      nav.get('/api/strava/athlete', function(data){
        document.querySelector('#content > .panel.left').innerHTML = pug.athlete(data);
      });
    },

    loadStream: function(e){
      e.preventDefault();
      let id = e.target.getAttribute('data-id');
      nav.get('/api/strava/stream/' + id, function(data){
        map.load(data);
      });
    }

  };

  return nav;
}
