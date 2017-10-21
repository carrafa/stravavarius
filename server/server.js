'use strict'

const Koa         =   require('koa');
const app         =   new Koa();
const bodyParser  =   require('koa-bodyparser');
const logger      =   require('koa-logger');
const serve       =   require('koa-static');
const session     =   require('koa-session');
const path        =   require('path');
const router      =   require('./router.js');
const dist        =   path.resolve(__dirname, "../dist");

app.keys = ['some_long_taco_string'];

// logging
app.use(logger());

// sessions
app.use(session(app));

// static files
app.use(serve(dist));

// routes
app.use(router);

// listen
var port = 8080;
app.listen(port);
console.log('listening on ', port);
