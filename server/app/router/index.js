/**
 * The index of Routes
 */
var geo         = require('./endpoints/geo');
var weather     = require('./endpoints/weather');
var zippo       = require('./endpoints/zippo');


module.exports = function (
    app
    ) {

  app.route('/zippopotomus')
    .post(zippo.potomus);

  app.route('/someWeather')
    .post(weather.some);

  app.route('/allWeather')
    .post(weather.all);
};
