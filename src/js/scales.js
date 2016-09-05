'use strict';

const notes = [55,58.27,61.735,65.406,69.296,73.416,77.782,82.407,87.307,92.499,97.999,103.826,110, 116.541,123.471,130.813,138.591,146.832,155.563,164.814,174.614,184.997,195.998,207.652,220, 233.082,246.942,261.626,277.183,293.665,311.127,329.628,349.228,369.994,391.995,415.305,440, 466.164,493.883,523.251,554.365,587.33,622.254,659.255,698.456,739.989,783.991,830.609,880, 932.328,987.767,1046.502,1108.731,1174.659,1244.508,1318.51,1396.913,1479.978,1567.982,1661.219,1760, 1864.655,1975.533,2093.005,2217.461,2349.318,2489.016,2637.02,2793.826,2959.955,3135.963,3322.438,3520];

const keys = {
  A: 440,
  Bb: 466.164,
  B: 493.883,
  C: 523.251,
  Db: 554.365,
  D: 587.33,
  Eb: 622.254,
  E: 659.255,
  F: 698.456,
  Gb: 739.989,
  G: 783.991,
  Gb: 830.609
}

const scales = {
  major: [0, 2, 4, 5, 7, 9, 11, 12],
  minor: [0, 2, 3, 5, 7, 8, 11, 12]
}

module.exports = {
  getScale(scale, key){
    let index = notes.indexOf(keys[key]);
    let scaleNotes = [];
    for(let i = 0; i < scales[scale].length; i ++ ){
      console.log(scales[scale][i]);
      console.log(index + scales[scale][i]);
      scaleNotes.push(notes[index + scales[scale][i]]);
    }
    return scaleNotes;
  }
}
