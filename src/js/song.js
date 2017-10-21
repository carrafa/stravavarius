let Tone = require('tone');
let Scales = require('./scales.js');

class Song {

  constructor(points){
    this.melody = [];
    this.harmony = [];
    this.instruments = {};
    this.index = 0;
    this.setVolume(-10);
    this.createRhythm(points);
    this.createMelody(points);
    this.createHarmony(points);
    
  }

  setVolume(level) {
    let vol = new Tone.Volume(level);
    vol.toMaster();
  }

  createRhythm(points){
    //this.createDrumKit();
    // other stuff maybe?
  }

  createMelody(points) {
    let scale = Scales.getScale('major', 'D', 2);
    for( let i = 0; i < points.length; i++ ){
      let note = this.convertLatToNote(points[i]);
      let freq = scale[Math.floor(Math.random()*scale.length)];// ok, random for now just to make sure scales are working
      this.melody.push({freq: freq, dur: 200});
    }
    this.createInstrument('synth', this.melody[0]);
  }

  createHarmony(points){
    let scale = Scales.getScale('major', 'D', 3);
    for( let i = 0; i < points.length; i++ ){
      let freq = scale[Math.floor(Math.random()*scale.length)];
      this.harmony.push({freq: freq, dur: 200});
    }
    this.createInstrument('synth2', this.harmony[0]);
    let distortion = new Tone.Distortion(0.8).toMaster();
    this.instruments['synth2'].connect(distortion);
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

  createInstrument(instrument){
    this.instruments[instrument] = new Tone.FMSynth({
      oscillator: {
        type: "sine"
      },
      envelope: {
        attack: 0.01
      }
    });
    this.instruments[instrument].volume.value = -6;
    this.instruments[instrument].toMaster();
  }

  createDrumKit(){
    let samples = ['/audio/c_hh.wav', '/audio/clap.wav', '/audio/k.wav', '/audio/o_hh.wav', '/audio/snare_1.wav', '/gaudio/snare_2.wav', '/gaudio/tom_1.wav', '/gaudio/tom_2.wav/'];
    this.instruments.drums = [];
    for(let i = 0; i < samples.length; i ++ ){
      this.instruments.drums.push(new Tone.Sampler(samples[i], null, ).toMaster());
    }
  }


  playSong(){
    this.instruments.synth.triggerAttack(this.melody[0].freq, 0, 0.5);
    this.instruments['synth2'].triggerAttack(this.harmony[0].freq, 0, 0.5);
    let self = this;
    this.loop = new Tone.Loop(function(time){
      if( self.index >= self.melody.length - 1 ) {
        for(var prop in self.instruments){
          if(prop !== 'drums'){
              self.instruments[prop].dispose();
          }
        }
        self.loop.stop();
        self.loop.dispose();
      } else {
        self.index = self.index + 1;
        if(self.index % 2 === 0){
          self.instruments.synth.setNote(self.melody[self.index].freq);
        }
        self.instruments.synth2.setNote(self.harmony[self.index].freq);
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
