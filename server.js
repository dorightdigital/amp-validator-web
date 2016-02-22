var express = require('express');
var _ = require('lodash');
var app = express();
var validator = require('amp-validator');

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('dist'));
app.use(express.static('assets'));

app.get('/', function (req, res) {
  console.log('rendering homepage');
  res.render('index');
});

app.get('/validate', function (req, res) {
  var urls = [].concat(req.query.url);
  Promise.all(_.map(_.compact(urls), function (url) {
    if (url.indexOf('http:') !== 0 && url.indexOf('https:') !== 0) {
      url = 'http://' + url;
    }
    console.log('validating', url);
    return validator.validate(url).then(function (results) {
      return _.extend({
        url: url
      }, results);
    });
  })).then(function (results) {
    console.log('rendering validation results', results.length);
    res.render('index', {results: results});
  });
});

app.listen(process.env.PORT || 7805);
