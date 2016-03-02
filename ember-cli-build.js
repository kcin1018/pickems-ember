/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    emberCliFontAwesome: {
      useScss: true
    }
  });

  app.import('bower_components/tether/dist/js/tether.min.js');
  app.import('bower_components/bootstrap/dist/js/bootstrap.min.js');

  return app.toTree();
};
