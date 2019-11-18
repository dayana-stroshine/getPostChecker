// Enable use of Express.js
var express = require('express');

// Include required middleware
var app = express();
var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
var bodyParser = require('body-parser');

// Allow bodyParser to use URL encoded query string or JSON data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enable omission of handlebars at end of file names
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Set port for code to be run on
app.set('port', 4306);

// First I create a GET route to the home of the page since I will
// not need multiple pages for this application
app.get('/', function (req, res) {
  // I initialize the qParams array which will store the objects
  // containing the names and values of the GET requests
  var qParams = [];

  // Then I loop through every string in the GET request and
  // save it as an object to the qParams array
  for (var p in req.query) {
    qParams.push({ 'name': p, 'value': req.query[p] })
  }

  // As in the lecture, this is for debugging purposes, so that
  // I know that the GET requests were received and stored
  console.log(qParams);
  console.log(req.query);

  // I create a context object and save the qParams array
  // to a data member of context called dataList. This dataList
  // will be referred to in the views
  var context = {};
  context.dataList = qParams;
  
  // Lastly I render the doGet view and pass it the context object
  res.render('doGet', context);
});

// The POST implementation is the same as in the GET implementation except
// I call app.post() and the POST requests are accessed with req.body
// instead of req.query
app.post('/', function (req, res) {
  var qParams = [];

  for (var p in req.body) {
    qParams.push({ 'name': p, 'value': req.body[p] })
  }

  console.log(qParams);
  console.log(req.body);

  var context = {};
  context.dataList = qParams;

  res.render('doPost', context);
});

// Unknown route 404 handling
app.use(function (req, res) {
  res.status(404);
  res.render('404');
});

// Error 505 handling
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

// Listening function implementation and prints statement to know code ran
app.listen(app.get('port'), function () {
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
