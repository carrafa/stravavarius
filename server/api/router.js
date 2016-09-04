'use strict';

const router = require('koa-router')();
const path   = require('path');
const pug    = require('pug');


// index
router.get('/', function *(next) {
  if( this.session.user === undefined ) {
    this.body = pug.compileFile(path.resolve(__dirname, './../../src/login.pug'))();
  } else {
    let template = pug.compileFile(path.resolve(__dirname, './../../src/home.pug'));
    this.body = template(this.session.user.athlete);
  }
});

require('./api.js')(router);
require('./strava.js')(router);

module.exports = router;
