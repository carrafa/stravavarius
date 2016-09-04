module.exports = {

  race: function(data){
    let template = require('./../pug/race.pug');
    return template(data);
  },

  races: function(data){
    let ul = '<ul>'
    let template = require('./../pug/race.pug');
    for(var i = 0; i < data.length; i ++ ){
      ul = ul + template(data[i]);
    }
    return ul + '</ul>';
  },

  athlete: function(data){
    let template = require('./../pug/athlete.pug');
    return template(data);
  }

};
