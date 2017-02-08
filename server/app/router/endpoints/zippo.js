var request =       require('request');

/**
 * I really like the name of the service I'm using:
 * zippopotom.us.  It was just what I wanted.  I
 * can send it a zipcode, and it will give me a
 * latitude and longitude (I need that for the
 * weather service), and the city and stat that I 
 * want for the frontend.
 **/
exports.potomus = function (req, res, next) {
  console.log('zippo.potomus');
  var url = "http://api.zippopotam.us/us/" + req.body.zipcode;
  request(url, function (err, body) {

    if (err) return next();
    
    var data = {};
		if (body.statusCode === 200) {
      var zippo = JSON.parse(body.body);
      data.zip = zippo['post code'];
      data.location = zippo.places[0]['place name'] + ', ' + zippo.places[0]['state abbreviation'];
      data.latitude = parseFloat(zippo.places[0]['latitude']);
      data.longitude = parseFloat(zippo.places[0]['longitude']);

      res.status(200).json(data);
    }
    else {
      data.message = 'Invalid zipcode';
      res.status(403).json(data);
    }
  });
};
