var request     = require('request');

function getAsUriParameters(data) {
	var url = '';
	for (var prop in data) {
		url += encodeURIComponent(prop) + '=' + 
				encodeURIComponent(data[prop]) + '&';
	}
	return url.substring(0, url.length - 1)
};

/**
 * Really?  You're looking in here?
 *
 * It's a whole route that isn't used by the app.
 * If you give it an address in the United States,
 * it will get the latitude and longitude of the
 * address.
 **/
exports.fetch = function (req, res, next) {
  console.log('geo.fetch')
  console.log(JSON.stringify(req.body, null, 2));

  var url = "https://geocoding.geo.census.gov/geocoder/locations/address?benchmark=Public_AR_Current&format=json&";

	var addressParams = getAsUriParameters(req.body);

	url += addressParams;

	console.log('url = ' + url);

  request(url, function (err, resGeo, body) {
    
    if (err) return next();
    
		if (body) {
			var result = JSON.parse(body);
			result = result.result;

			if (resGeo.statusCode === 200) {
				switch(result.addressMatches.length) {
					case 0:
						res.status(403).json({
							"message":"did not match address"
						});
						break;

					case 1:
						res.status(resGeo.statusCode).json(
							result.addressMatches[0].coordinates
						);
						break;

					case 2:
					default:
						res.status(403).json({
							"message":"matched more than one address"
						});
				}
			}
			else {
				res.status(resGeo.statusCode).json(body);
			}
		}
		else {
			res.status(resGeo.statusCode).json({});
		}
  });
};
