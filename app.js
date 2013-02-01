var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    general = require('./lib/general'),
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
  app.set('port', 3001);
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// General
app.get('/', general.ping);

app.get('/routes', function (req, res) {
  res.send(app.routes);
});

// Users
app.get('/users', users.list);
app.post('/users', users.create);
app.get('/users/:id', users.get);
app.put('/users/:id', users.update);

// Slides
app.get('/slides/:organization/slides', slides.list);
app.post('/slides/:organization/slides', slides.create);
app.get('/slides/:organization/slides/:id', slides.get);
app.put('/slides/:organization/slides/:id', slides.update);
app.delete('/slides/:organization/slides/:id', slides.delete);

// Locations
app.get('/locations', locations.list);
app.post('/locations', locations.create);
app.get('/locations/:organization/:location', locations.get);
app.put('/locations/:organization/:location', locations.update);
app.delete('/locations/:organization/:location', locations.delete);

// Organizations
app.get('/organizations', organizations.list);
app.post('/organizations', organizations.create);
app.get('/organizations/:id', organizations.get);
app.put('/organizations/:id', organizations.update);
app.delete('/organizations/:id', organizations.delete);


app.listen(app.get('port'));
console.log('Listening on port ' + app.get('port'));

process.on('uncaughtException', function (err) {
  console.log(err);
});