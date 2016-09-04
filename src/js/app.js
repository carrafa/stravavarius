const map = require('./map.js');
const nav = require('./nav.js')(map);

document.addEventListener('DOMContentLoaded', function(){
  console.log('ow, my browser');
  setListeners();
  nav.activities();
});

function setListeners(){
  document.querySelector('#activities').addEventListener('click', nav.activities);
  document.querySelector('#athlete').addEventListener('click', nav.athlete);
}


