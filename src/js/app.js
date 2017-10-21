const nav = require('./nav.js')
const Song = require('./song.js');

document.addEventListener('DOMContentLoaded', function(){

  console.log('ow, my browser');

  document.querySelector('#athlete').addEventListener('click', nav.athlete);
  document.querySelector('#activities').addEventListener('click', nav.activities);
  nav.activities();
  introSong();
  toggleLogin();
 });

function introSong(){ 
  let song = new Song([800, 610, 420, 830, 640, 450, 860, 670, 340]);
  song.playSong();
}

function toggleLogin() {
  if(!nav.athlete) {
    document.getElementById('login').display = 'block';
    document.getElementById('content').display = 'none';
  } else {
    document.getElementById('login').display = 'none';
    document.getElementById('content').display = 'block';
  }
}