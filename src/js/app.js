const map = require('./map.js');
const nav = require('./nav.js')(map);
const Song = require('./song.js');

document.addEventListener('DOMContentLoaded', function(){

  console.log('ow, my browser');

  document.querySelector('#athlete').addEventListener('click', nav.athlete);
  document.querySelector('#activities').addEventListener('click', nav.activities);
  nav.activities();
  
  let song = new Song([800, 610, 420, 830, 640, 450, 860, 670, 340]);

  song.playSong();
});


