module.exports = {

  activity: function(data){
    let template = require('./../pug/activity.pug');
    return template(data);
  },

  activities: function(data){
    let ul = '<ul>'
    let template = require('./../pug/activity.pug');
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
