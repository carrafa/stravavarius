let map;
let initMapOptions;
let key = "AIzaSyClUt1HHvi5XFKUcXfYx6QwBl6ktpz6_Ww";

let initMap = function () {
  map = new google.maps.Map(document.querySelector('#map'), initMapOptions);
};

module.exports = function(mapOptions, callback){
  initMapOptions = mapOptions;
  if( map === undefined ) {
    let rightPanel = document.querySelector('#content > .panel.right');
    let mapEl = document.createElement('div');
    mapEl.id = 'map';
    rightPanel.appendChild(mapEl);

    google.load('maps', '3', {
      'other_params': 'key=' + key + '&libraries=visualization',
      'callback': initMap
    });

  } else {
    console.log('map already loaded');
    // recenter the map with mapOptions;
  }
}
