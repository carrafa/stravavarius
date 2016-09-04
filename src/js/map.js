 let map = {

  key: "AIzaSyClUt1HHvi5XFKUcXfYx6QwBl6ktpz6_Ww", 

  initMapOptions: {
    center: {
      lat: 40.732784,
      lng: -73.975941
    },
    zoom: 13
  },
  
  load: function (data){
    map.data = data;
    let mapEl = document.createElement('div');
    mapEl.id = 'map';
    document.querySelector('#content > .panel.right').appendChild(mapEl);
    let self = this;
    google.load('maps', '3', {
      'other_params': 'key=' + self.key + '&libraries=visualization',
      'callback': self.init
    });
  },

  init: function () {
    let options = map.initMapOptions;
    map.map = new google.maps.Map(document.querySelector('#map'), options);
    map.addPoints(map.data);
  },

  addPoints: function(points){
    let heatmapData = [];
    for(var i = 0; i < points[0].data.length; i++ ){
      heatmapData.push(new google.maps.LatLng( points[0].data[i][0], points[0].data[i][1]));
    }
    let heatmap = new google.maps.visualization.HeatmapLayer({ 
      data: heatmapData,
      radius: 5
    });
    heatmap.setMap(map.map);
  }

};

module.exports = map;
