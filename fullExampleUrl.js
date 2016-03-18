var fs = require('fs'),
  output,
  baseUrl = process.env.BASE_URL || 'http://localhost:7805',
  defaultOutput = baseUrl + '/validate?';

var walk = function (dir, done) {
  var results = [];
  fs.readdir(dir, function (err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      file = dir + '/' + file;
      fs.stat(file, function (err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function (err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
};

walk('assets/examples', function (err, walked) {
  if (err) {
    throw err;
  }
  walked.forEach(function (val) {
    if (val.indexOf('.html') > -1) {
      if (output) {
        output += '&';
      } else {
        output = defaultOutput;
      }
      var urlToAdd = baseUrl + val.replace(/^assets/, '');
      output += 'url=' + encodeURIComponent(urlToAdd);
    }
  });
  console.log(output);
});