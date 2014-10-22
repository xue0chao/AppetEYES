'use strict';

var Yelp = require("yelp").createClient({
  consumer_key: "6aF2JYQRdQrbgRQHYkK86w", 
  consumer_secret: "b0hAqq9PriGum0aEcCggGIHE8pA",
  token: "4DjcSZE8GvNMNx3Z2un5pX5zW60fIEjK",
  token_secret: "adG7at7uR42AVbSeV6zEjshFRdE"
});

exports.refinedSearch = function(req, res) {
  //Receives request made by the YELPER service with category * location
  console.log('This is your request sir',req.params);
  //Parses the request to separate Category from Location
  var params = req.params[0].split('*');
  var category = params[0];
  var location = params[1];
  console.log(category,location);
  console.log('Seaching for food locations');
  //The Yelp api expects requests in the form of : Category*Location 
  Yelp.search({term: category, location: location}, function(error, data) {
    console.log(error);
    var result = data;
    var arr = [];
    for(var i =0 ; i < result.businesses.length;i++ ){
      console.log('This is your data',result['businesses'][i].image_url.replace('ms.jpg','l.jpg'),result['businesses'][i].id);
      arr.push({
        link:result.businesses[i].image_url.replace('ms.jpg','l.jpg'),
        name:result['businesses'][i].id
      });
    }
    return res.json(200,arr);
  });
};
