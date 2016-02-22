var express = require('express');
var Promise = require('bluebird');
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
    return validator.validate(url).then(function (result) {
      if (result.ampVersion.declared === 'none') {
        result.errors = [
          {
            reason: 'This doesn\'t seem to be an AMP document'
          }
        ];
      }
      return _.extend({
        url: url
      }, result);
    }).catch(function (err) {
      console.error(err);
      return {
        url: url,
        errors: [{
          reason: err
        }]
      };
    });
  })).then(function (results) {
    console.log('rendering validation results');
    console.log(results);
    res.render('index', {results: results});
  }).catch(function (err) {
    console.error(err);
    res.redirect('/');
  }).done();
});

app.listen(process.env.PORT || 7805);
