var soap =          require('soap');
var parseString =   require('xml2js').parseString;

var url = 'http://graphical.weather.gov/xml/DWMLgen/wsdl/ndfdXML.wsdl';
var args = {
				latitude: 0,
				longitude: 0,
        startDate: new Date(), // 2017-01-07
        numDays: 1,
        Unit: 'e',
        format: '12 hourly'
};

/**
 * This is going to take a latitude and longitude,
 * call the National Digital Forecast Database,
 * thread through the pile of XML to find some nice
 * little things to share and send them back
 *
 * Some - some details
 **/
exports.some = function (req, res, next) {
  console.log('body = ' + JSON.stringify(req.body, null, 2));
  soap.createClient(url, function(err, client) {

		if (err) return next();

    args.latitude = req.body.latitude;
    args.longitude = req.body.longitude;

    client.NDFDgenByDay(args, function(err, resWeather, body) {

      parseString(body, function(err, resultOutside){

        var dayWeather = resultOutside['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['ns1:NDFDgenByDayResponse'][0]['dwmlByDayOut'][0]['_'];

        parseString(dayWeather, function(err, result) {
          if (err) return next();
          
          var data = result['dwml']['data'][0];
        
          var moreWeatherInformation = data.moreWeatherInformation[0]['_'];
          var parameters = data.parameters;
          var temperatures = parameters[0]['temperature'];
          var weatherObj = {};
          for (var i = 0; i < temperatures.length; i++) {
            weatherObj[temperatures[i]['name'][0]] = parseInt(temperatures[i]['value'][0]);
          }

          var weather = parameters[0].weather[0];
          weatherObj['summary'] = weather['weather-conditions'][0]['$']['weather-summary']; 
          weatherObj['moreWeatherInformation'] = moreWeatherInformation;

          var icons = parameters[0]['conditions-icon'][0];
          weatherObj['icon'] = icons['icon-link'][0];

          console.log('weatherObj = ' + JSON.stringify(weatherObj, null, 2));

          res.status(200).json(
            weatherObj
          );
        });
      });
    });
  });
};

/**
 * This is going to take a latitude and longitude,
 * call the National Digital Forecast Database,
 * parse all the XML that comes back into JSON and
 * send that all back so the user can look at it
 * and scratch their head if they want to.
 *
 * All - All the weather XML
 *
 * I didn't really write a master detail.  I wrote
 * a here's a few starter masters and you can add your
 * own if you want to.  After you get the master's that
 * you want, you can get a little bit of details.  If
 * that's not enough you can get all the details.  And
 * if you're still not satisfied, you can just click on
 * the link for the NDFD website.
 **/
exports.all = function (req, res, next) {
  console.log('body = ' + JSON.stringify(req.body, null, 2));
  soap.createClient(url, function(err, client) {

		if (err) return next();

    args.latitude = req.body.latitude;
    args.longitude = req.body.longitude;

    client.NDFDgenByDay(args, function(err, resWeather, body) {

      parseString(body, function(err, resultOutside){

        var dayWeather = resultOutside['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['ns1:NDFDgenByDayResponse'][0]['dwmlByDayOut'][0]['_'];

        parseString(dayWeather, 
          (function(err, result){ // closure
            return function(err, result) {
              if (err) return next();
              
              var object = resultOutside;
              delete object['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['ns1:NDFDgenByDayResponse'][0]['dwmlByDayOut'][0]['_'];
              object['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['ns1:NDFDgenByDayResponse'][0]['dwmlByDayOut'][0]['_'] = result;

              // The XML that you get back from the endpoint
              // is rather complex.  Here it is for you in
              // JSON format.
              res.status(200).json(
                object
              );
            };// return function(err, result)));
          })(resultOutside) // end closure
        );
      });
    });
  });
};
