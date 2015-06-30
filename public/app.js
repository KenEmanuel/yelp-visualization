var yelpApp = angular.module('yelpApp', []);

yelpApp.controller('curryController', function($http) {
    var vm = this;
    vm.message = 'Lets check out some curries';

    vm.submit = function() {
        $http.get('http://localhost:3000/restaurants/' + vm.location)
            .success(function (data) {
                console.log(data);
                vm.data = data;
                var ratings = [];

                for (var i = 0; i < data.length; i++) {
                    var rating = {};
                    rating.name = data[i].name;
                    rating.group = 'Indian';
                    rating.value = data[i].numReview;
                    rating.rating = 'Rating: ' +data[i].rating + ' stars';
                    ratings.push(rating);
                }
                console.log(ratings);

                var visualization = d3plus.viz()
                    .container("div#viz")
                    .data(ratings)
                    .type("bubbles")
                    .id(["group", "name", 'rating'])
                    .depth(1)
                    .size("value")
                    .color("group")
                    .height(600)
                    .draw();
            })
            .error(function (data) {
                console.log(data);
            });
    }
});