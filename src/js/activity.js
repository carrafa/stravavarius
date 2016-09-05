const Song = require('./song.js');
let map;

class Activity {

  constructor(data){
    this.data = data;
    this.latLngs = this.getLatLngs(data);
    this.marker;
    this.song;
    this.mapOptions = {
      center: this.latLngs[0],
      zoom: 15
    };
    this.loadMap();
  }

  drawHeatmap (){
    let points = this.latLngs;
    let heatmapData = [];
    for(var i = 0; i < points.length; i++ ){
      heatmapData.push(new google.maps.LatLng( points[i].lat, points[i].lng ));
    }
    let heatmap = new google.maps.visualization.HeatmapLayer({ 
      data: heatmapData,
      radius: 5
    });
    heatmap.setMap(map);
  }

  drawRoute(){
    console.log('drawing route');
    let coords = this.latLngs;
    this.path = new google.maps.Polyline({
      path: coords,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    this.path.setMap(map);
  }

  playSong (){
    let songData = this.getSongData(this.data);
    this.song = new Song(songData);
    this.song.playSong();
  }

  stopSong(){
    this.song.stop();
  }

  markerIterator(){
    this.dropMarker(this.latLngs[0]);
    let self = this;
    let id = window.setInterval(function(){
      self.moveMarker(self.latLngs[self.song.index]);
      console.log(self.song.index);
    }, 100);
  }

  dropMarker(latLng){
    let ll = new google.maps.LatLng(latLng.lat, latLng.lng);
    this.marker = new google.maps.Marker({
      position: ll,
      map: map
    });
  }

  moveMarker(latLng){
    let ll = new google.maps.LatLng(latLng.lat, latLng.lng);
    this.marker.setPosition(ll);
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

  loadMap(callback) {
    if( map === undefined ) {
      let key = "AIzaSyClUt1HHvi5XFKUcXfYx6QwBl6ktpz6_Ww";
      let rightPanel = document.querySelector('#content > .panel.right');
      let mapEl = document.createElement('div');
      mapEl.id = 'map';
      rightPanel.appendChild(mapEl);

      let self = this;
      google.load('maps', '3', {
        'other_params': 'key=' + key + '&libraries=visualization',
        'callback': self.initMap.bind(self)
      });

    } else {
      console.log('map already loaded');
      map.setCenter(this.mapOptions.center);
      this.drawRoute();
    }
  }

  initMap(){
    let options = this.mapOptions;
    map = new google.maps.Map(document.querySelector('#map'), options);
    this.drawRoute();
    this.markerIterator();
  }
}

module.exports = Activity;
