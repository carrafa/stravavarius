'use strict';

const unirest = require('unirest');
require('dotenv').config();
const CLIENT_ID = process.env.CLIENT_ID;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const Router     =  require('koa-router');
const router     =  new Router();

const baseUrl = 'https://www.strava.com/api/v3/';

router.get('/authorize/', async ctx => {
  let Request = unirest.post('https://www.strava.com/oauth/token');
  let code = ctx.query.code;
  ctx.session.user = await new Promise((resolve, reject)=>{
    Request.send({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: code
    }).end((response) => {
      resolve(response.body);
    })
  });
  ctx.redirect('/');
});

router.get('/athlete', async ctx => {
  let url = baseUrl + 'athlete?access_token=' + ctx.session.user.access_token;
  ctx.body = await new Promise((resolve, reject) => {
    unirest.get(url).end((response) => {
      resolve(response.raw_body);
    });
  });
});

router.get('/activities/', async ctx => {
  let url = baseUrl + 'activities?access_token=' + ctx.session.user.access_token;
  ctx.body = await new Promise((resolve, reject) => {
    unirest.get(url).end((response) => {
      resolve(response.raw_body);
    });
  }); 
});

router.get('/stream/:id', async ctx => {
  let url = baseUrl + 'activities/' + ctx.params.id + '/streams/latlng?access_token=' + ctx.session.user.access_token;
  ctx.body = await new Promise((resolve, reject) => {
    unirest.get(url).end((response) =>{
      resolve(response.raw_body);
    });
  });
});

module.exports = router.routes();