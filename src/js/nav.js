const pug = require('./pug.js');
const Activity = require('./activity.js');
const api = require('./api.js');

let nav = {

  activities: function(e){
    if(e) { e.preventDefault(); }
    api.getActivities(function(data){
      document.querySelector('#content > .panel.left').innerHTML = pug.activities(data);
      document.querySelectorAll('.play').forEach((link) => {
        link.addEventListener('click', nav.loadStream);
      });
    });

  },

  athlete: function(e){

    e.preventDefault();
    api.getAthlete(function(data){
      document.querySelector('#content > .panel.left').innerHTML = pug.athlete(data);
    });

  },

  loadStream: function(e){

    e.preventDefault();
    let id = e.target.getAttribute('data-id');
    let stopButton = e.target.nextSibling;

    api.getActivityStream(id, function(data){
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

