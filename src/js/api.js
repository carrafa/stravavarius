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

module.exports = {

  getActivities: function(callback){
    get('/api/strava/activities', function(data){
      callback(data);
    });
  },

  getAthlete: function(callback){
    get('/api/strava/athlete', function(data){
      callback(data);
    });
  },

  getActivityStream: function(id, callback){
    get('/api/strava/stream/' + id, function(data){
      callback(data);
    });
  }

}
