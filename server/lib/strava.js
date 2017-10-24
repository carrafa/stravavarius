var unirest = require('unirest');
require('dotenv').config();

module.exports = (function() {
  const strava = {
    baseUrl: 'https://www.strava.com/api/v3',
    CLIENT_ID: process.env.CLIENT_ID,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    CLIENT_SECRET: process.env.CLIENT_SECRET
  };
  
  
  strava.authenticate = async (code) => {
    let url = `https://www.strava.com/oath/token`;
    let payload = {
      client_id: strava.CLIENT_ID,
      client_secret: strava.CLIENT_SECRET,
      code: code
    };
    return new Promise((resolve, reject)=> {
      unirest.post(url).send(payload)
        .end(response => resolve(response.body));
    });
  };
  
  strava.getAthlete = async accessToken => {
    let url = `${strava.baseUrl}/'athlete?access_token=${accessToken}`;
    return new Promise((resolve, reject) => {
      unirest.get(url).end((response) => {
        resolve(response.raw_body);
      });
    });
  };
  
  strava.getActivities = async (accessToken) => {
    let url = `${strava.baseUrl}/activities?access_token=${accessToken}`;
    return new Promise(resolve => {
      unirest.get(url).end(response => resolve(response.raw_body));
    });
  };
  
  strava.getStream = async (accessToken, id) => {
    let url = `${strava.baseUrl}/activities/${id}/streams/latlng?access_token=${accessToken}`;
    return new Promise((resolve, reject) => {
      unirest.get(url).end(response => resolve(response.raw_body));
    })
  };

  return strava;
  
}());