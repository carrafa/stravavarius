'use strict';
const Router     =  require('koa-router');
const router     =  new Router();
const strava     =  require('./strava');

router.get('/', async ctx => {
  ctx.body = 'taco';
});

router.use('/strava', strava);

module.exports = router.routes();