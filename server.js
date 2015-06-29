var express = require('express');
var app = express();
var path = require('path');
var yelp = require('yelp').createClient({
    consumer_key: "0w2RTA4_ReC994Iy9-XzhQ",
    consumer_secret: "4biMNsVK5ISRaZtXklaa_W1wNhg",
    token: "EVY5XPiS-CYgzdEx82qIp-tyaccAThY4",
    token_secret: "oiv-C4YMBNlNa804Jk8H28ICuAk"
});

app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    if("OPTIONS" == req.method) {
        res.send(200);
    } else {
        next();
    }
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + 'public/index.html')).sendStatus(200);
});

app.get('/restaurants/:location', function(req, res) {

    var searcher = {};
    searcher.term = 'Indian';
    searcher.location = req.params.location;

    console.log('here');

    yelp.search(searcher, function(error, data) {
        console.log(error);
        var indianList = [];
        var indian = {};
        for(var i = 0; i < data.businesses.length; i++) {
            indian = {
                name: data.businesses[i].name,
                image: data.businesses[i].image_url,
                rating: data.businesses[i].rating,
                numReview: data.businesses[i].review_count
            };
            indianList.push(indian);
        }
        res.send(indianList);
    });
});

app.listen(3000);