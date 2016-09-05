let Tone = require('tone');

class Song {

  constructor(points){
    this.melody = [];
    this.instruments = {};
    this.index = 0;
    this.createMelody(points);
  }

  createMelody(points) {
    for( let i = 0; i < points.length; i++ ){
      let note = this.convertLatToNote(points[i]);
      this.melody.push({freq: note, dur: 200});
    }
    this.createSynth(this.melody[0]);
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

  playNote(note, delay, noteLength){
  }

  convertLatToNote(lat){
    let l = lat.toString();
    let n = l.substr(l.length - 3, l.length);
    return parseInt(n);
  }

  stop(){
    console.log('hi');
    for(var i = 0; i < this.notes.length; i ++ ){
      this.notes[i].pause();
    }
  }

}

module.exports = Song;
