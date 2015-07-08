/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  var basePath = '/v2';
  // Insert routes below
  app.use(basePath + '/api/things', require('./api/thing'));
  app.use(basePath + '/api/users', require('./api/user'));

  app.use(basePath + '/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(v2/api|v2/auth|v2/components|v2/app|v2/bower_components|v2/assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route(basePath + '/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
