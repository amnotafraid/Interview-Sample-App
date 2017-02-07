var request     = require('request');
var aLocations = [
	{ id: 1, zip: 61801, location: 'Urbana, IL', latitude: 40.10243, longitude: -88.19666 },
	{ id: 2, zip: 75230, location: 'Dallas, TX', latitude: 32.90351, longitude: -96.771194 },
	{ id: 3, zip: 20500, location: 'Washington, DC', latitude: 38.898754, longitude: -77.03535 },
	{ id: 4, zip: 98804, location: 'Bellevue, WA', latitude: 47.616505, longitude: -122.20169 },
	{ id: 5, zip: 80301, location: 'Boulder, CO', latitude: 40.059013, longitude: -105.21812 }
];

function getAsUriParameters(data) {
	var url = '';
	for (var prop in data) {
		url += encodeURIComponent(prop) + '=' + 
				encodeURIComponent(data[prop]) + '&';
	}
	return url.substring(0, url.length - 1)
};

exports.locations = function (req, res, next) {
  console.log('geo.locations');
  res.status(200).json(aLocations);
};

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
