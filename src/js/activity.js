const Song = require('./song.js');
let loadMap = require('./map.js');

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
    loadMap(this.mapOptions);
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
    this.song = new Song(songData);
    this.song.playSong();
    //for(let i = 0; i < this.latLngs.length; i++ ){
      //this.markerIterator(this.latLngs[i], i * 180);
    //}
  }

  markerIterator(latLng, delay){
    let marker = this.marker
    //let ll = new google.maps.LatLng(latLng);
    let ll = latLng;
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

  stopSong(){
    this.song.stop();
  }

}

module.exports = Activity;
