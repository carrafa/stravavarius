const Song = require('./song.js');

class Activity {

  constructor(data){
    this.data = data;
    this.latLngs = this.getLatLngs(data);
    this.map;
    this.marker;
    this.key = "AIzaSyClUt1HHvi5XFKUcXfYx6QwBl6ktpz6_Ww";
    this.mapOptions = {
      center: this.latLngs[0],
      zoom: 15
    };
    this.loadMap();
  }

  loadMap (){
    let mapEl = document.createElement('div');
    mapEl.id = 'map';
    document.querySelector('#content > .panel.right').appendChild(mapEl);
    let self = this;
    google.load('maps', '3', {
      'other_params': 'key=' + self.key + '&libraries=visualization',
      'callback': self.initMap.bind(self)
    });
  }
 
  initMap () {
    let options = this.mapOptions;
    this.map = new google.maps.Map(document.querySelector('#map'), options);
    this.addPoints(this.latLngs);
    this.marker = this.addMarker(options.center);
    this.playSong();
  }

  addPoints (points){
    let heatmapData = [];
    for(var i = 0; i < points.length; i++ ){
      heatmapData.push(new google.maps.LatLng( points[i].lat, points[i].lng ));
    }
    let heatmap = new google.maps.visualization.HeatmapLayer({ 
      data: heatmapData,
      radius: 5
    });
    heatmap.setMap(this.map);
    this.playSong();
  }

  playSong (){
    let songData = this.getSongData(this.data);
    let song = new Song(songData);
    song.playSong();
    for(let i = 0; i < this.latLngs.length; i++ ){
      this.markerIterator(this.latLngs[i], i * 180);
    }
  }

  markerIterator(latLng, delay){
    let marker = this.marker
    let ll = new google.maps.LatLng(latLng);
    if(delay === 0 ){
      marker.setPosition(ll);
    } else {
      window.setTimeout(function(){
        marker.setPosition(ll);
      }, delay);
    }
  }

  addMarker(map, latLng){
    let ll = new google.maps.LatLng(latLng);
    return new google.maps.Marker({
      position: ll,
      map: map
    });
  }

  getSongData(data){
    let a = [];
    for( let i = 0; i < data[0].data.length; i++ ){
      a.push(data[0].data[i][0]*10);
    }
    return a;
  }

  getLatLngs(data){
    let a = [];
    for( let i = 0; i < data[0].data.length; i++ ){
      a.push({
        lat: data[0].data[i][0],
        lng: data[0].data[i][1]
      });
    }
    return a;
  }

}

module.exports = Activity;
