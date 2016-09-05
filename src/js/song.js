let Tone = require('tone');
let Scales = require('./scales.js');

class Song {

  constructor(points){
    this.melody = [];
    this.instruments = {};
    this.index = 0;
    this.createMelody(points);
  }

  createMelody(points) {
    let scale = Scales.getScale('phrygian', 'D');
    for( let i = 0; i < points.length; i++ ){
      let note = this.convertLatToNote(points[i]);
      let freq = scale[Math.floor(Math.random()*scale.length)];// ok, random for now just to make sure scales are working
      this.melody.push({freq: freq, dur: 200});
    }
    this.createSynth(this.melody[0]);
  }

  findClosestNote(note, array){
    let diff = 10000;
    let returnNote = note;
    for(let i = 0; i < array.length; i++ ){
      let newDiff = Math.abs(array[i] - note);
      if( newDiff < diff) {
        returnNote = array[i];
      }
    };
    return returnNote;
  }

  createNote(num){
    //return T("sin", {freq: num, mul: 0.5 });
  }

  createSynth(note){
    this.instruments.synth = new Tone.MonoSynth({
      oscillator: {
        type: "square"
      },
      envelope: {
        attack: 0.1
      }
    }).toMaster();
  }

  playSong(){
    this.instruments.synth.triggerAttack(this.melody[0].freq, 0, 0.5);
    let self = this;
    this.loop = new Tone.Loop(function(time){
      if( self.index >= self.melody.length - 1 ) {
        self.instruments.synth.dispose();
        self.loop.stop();
        self.loop.dispose();
      } else {
        self.index = self.index + 1;
        self.instruments.synth.setNote(self.melody[self.index].freq);
      }
    }, "16n").start(0);
    Tone.Transport.start();
  }

  convertLatToNote(lat){
    let l = lat.toString();
    let n = l.substr(l.length - 3, l.length);
    return parseInt(n);
  }

  stop(){
    this.instruments.synth.dispose();
    this.loop.stop();
    this.loop.dispose();
  }

}

module.exports = Song;
