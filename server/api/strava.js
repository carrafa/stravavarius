'use strict';

const unirest = require('unirest');
require('dotenv').config();
const CLIENT_ID = process.env.CLIENT_ID;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

module.exports = function(router) {

  let baseUrl = 'https://www.strava.com/api/v3/';

  router.get('/api/strava/authorize/', function*(){
    let Request = unirest.post('https://www.strava.com/oauth/token');
    let code = this.query.code; 
    this.session.user = yield new Promise((resolve, reject)=>{
      Request.send({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code
      }).end((response) => {
        resolve(response.body);
      })
    });
    this.redirect('/');
  });

  router.get('/api/strava/athlete', function *(){
    let url = baseUrl + 'athlete?access_token=' + this.session.user.access_token;
    this.body = yield new Promise((resolve, reject) => {
      unirest.get(url).end((response) => {
        resolve(response.raw_body);
      });
    });
  });

  router.get('/api/strava/activities/', function *(){
    let url = baseUrl + 'activities?access_token=' + this.session.user.access_token;
    this.body = yield new Promise((resolve, reject) => {
      unirest.get(url).end((response) => {
        resolve(response.raw_body);
      });
    }); 
  });

  router.get('/api/strava/stream/:id', function *(){
    let url = baseUrl + 'activities/' + this.params.id + '/streams/latlng?access_token=' + this.session.user.access_token;
    this.body = yield new Promise((resolve, reject) => {
      unirest.get(url).end((response) =>{
        resolve(response.raw_body);
      });
    });
  });

};
