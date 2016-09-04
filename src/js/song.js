class Song {

  constructor(points){
    this.notes = [];
    this.createNotes(points);
  }

  createNotes(points) {

    for( let i = 0; i < points.length; i++ ){
      this.notes.push(this.createNote(points[i]));
    }

  }

  createNote(num){
    return T("sin", {freq: num, mul: 0.5 });
  }

  playSong(){
    for( var i = 0; i < this.notes.length; i++ ){
      let note = this.notes[i];
      this.playNote(note, i * 200, 200);
    }
  }

  playNote(note, delay, noteLength){
    if(delay === 0){
      note.play();
      window.setTimeout(function(){
        note.pause();
      }, noteLength)
    } else {
      window.setTimeout(function(){
        note.play();
        window.setTimeout(function(){
          note.pause();
        }, noteLength);
      }, delay)
    }
  }

}

module.exports = Song;
