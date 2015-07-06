var express = require('express');
var app = express();
var path = require('path');
var yelpKey = require('./key.js');
var yelp = require('yelp').createClient(yelpKey.apiKey);

app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    if('OPTIONS' == req.method) {
        res.send(200);
    } else {
        next();
    }
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + 'public/index.html')).sendStatus(200);
});

app.get('/restaurants/:location/:foodTypes', function(req, res) {
    var searcher = {};
    searcher.term = req.params.foodTypes;
    searcher.location = req.params.location;

    yelp.search(searcher, function(error, data) {
        console.log(error);
        var restaurantList = [];
        var restaurant = {};
        for(var i = 0; i < data.businesses.length; i++) {
            restaurant = {
                name: data.businesses[i].name,
                rating: data.businesses[i].rating,
                numReview: data.businesses[i].review_count,
                category: searcher.term
            };
            restaurantList.push(restaurant);
        }
        res.send(restaurantList);
    });
});

app.listen(3000);