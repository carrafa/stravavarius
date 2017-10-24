'use strict';
const Router     =  require('koa-router');
const router     =  new Router();

const strava = require('./../lib/strava');

router.get('/authorize/', async ctx => {
  ctx.session.user = await strava.authenticate(ctx.query.code);
  ctx.redirect('/');
});

router.get('/athlete', async ctx => {
  ctx.body = await strava.getAthlete(ctx.session.user.access_token);
});

router.get('/activities/', async ctx => {
  ctx.body = await strava.getActivities(ctx.session.user.access_token);
});

router.get('/stream/:id', async ctx => {
  ctx.body = await strava.getStream(ctx.session.user.access_token, ctx.params.id);
});

module.exports = router.routes();