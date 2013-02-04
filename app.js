var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    general = require('./lib/general'),
    authentication = require('./lib/authentication'),
    users = require('./lib/users'),
    slides = require('./lib/slides'),
    locations = require('./lib/locations'),
    organizations = require('./lib/organizations');

mongoose.set('debug', true);
mongoose.connect("mongodb://ten:123@linus.mongohq.com:10016/ten-api");
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function callback () {
  console.log("Mongoose Connection Open");
});

app.configure(function () {
  app.disable('x-powered-by');
  app.set('port', 3001);
  app.use(express.logger('dev'));
  app.use(express.compress());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  // routes
  app.use(app.router);
  // catch exceptions
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.use(general.notfound);
  app.use(general.catchError);
});

app.configure('development', function(){
  app.set('master api key', 'http://localhost:3001/');
})

app.configure('production', function(){
  app.set('api server', 'https://ten-api.jit.su/');
})

// General
app.get('/', general.ping);

app.get('/routes', function (req, res) {
  res.send(app.routes);
});

// Users
app.get('/users', authentication.authenticate, users.list);
app.post('/users', users.create);
app.get('/users/:username', authentication.authenticate, users.get);
app.put('/users/:username', authentication.authenticate, users.update);

// Slides
app.get('/slides/:organization/slides', authentication.authenticate, slides.list);
app.post('/slides/:organization/slides', authentication.authenticate, slides.create);
app.get('/slides/:organization/slides/:id', authentication.authenticate, slides.get);
app.put('/slides/:organization/slides/:id', authentication.authenticate, slides.update);
app.delete('/slides/:organization/slides/:id', authentication.authenticate, slides.delete);

// Locations
app.get('/locations/:organization', authentication.authenticate, locations.list);
app.post('/locations/:organization', authentication.authenticate, locations.create);
app.get('/locations/:organization/:location', authentication.authenticate, locations.get);
app.put('/locations/:organization/:location', authentication.authenticate, locations.update);
app.delete('/locations/:organization/:location', authentication.authenticate, locations.delete);

// Organizations
app.get('/organizations', authentication.authenticate, organizations.list);
app.post('/organizations', authentication.authenticate, organizations.create);
app.get('/organizations/:organization', authentication.authenticate, organizations.get);
app.put('/organizations/:organization', authentication.authenticate, organizations.update);
app.delete('/organizations/:organization', authentication.authenticate, organizations.delete);


app.listen(app.get('port'));
console.log('Listening on port ' + app.get('port'));

process.on('uncaughtException', function (err) {
  console.log(err);
});