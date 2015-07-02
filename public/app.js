var yelpApp = angular.module('yelpApp', []);

yelpApp.controller('yelpController', function($http) {
    var vm = this;
    vm.message = 'Lets check out some cuisines';
    vm.foodTypes = [];
    vm.submit = function() {
        vm.foodTypes = [vm.foodOne, vm.foodTwo];
        var businesses = [];
        for (var k = 0; k < vm.foodTypes.length; k++) {
            $http.get('http://localhost:3000/restaurants/' + vm.location + '/' + vm.foodTypes[k])
                .success(function(data) {
                    vm.data = data;
                    for(var i = 0; i < data.length; i++) {
                        var business = {};
                        business.name = data[i].name;
                        business.reviews = data[i].numReview;
                        business.totalReviews = 'From ' + data[i].numReview + ' reviews';
                        business.categories = data[i].category;
                        business.rating = 'Rating: ' + data[i].rating + ' stars';
                        if(data[i].rating === 5) {
                            business.color = '#ffa500';
                        } else if(data[i].rating === 4.5) {
                            business.color = '#ffb732';
                        } else if(data[i].rating === 4) {
                            business.color = '#ffc966';
                        } else if(data[i].rating === 3.5) {
                            business.color = '#ffd27f';
                        } else if(data[i].rating === 3.0) {
                            business.color = '#ffdb99';
                        } else if(data[i].rating <= 2.5) {
                            business.color = '#ffedcc';
                        }
                        businesses.push(business);
                    }
                    for(var j = 0; j < businesses.length; j++) {
                        for(var m = 0; m < businesses[j].categories.length; m++) {
                            for(var n = 0; n < businesses[j].categories[m].length; n++) {
                                if(j < 20 && vm.foodOne == businesses[j].categories[m][n]) {
                                    businesses[j].group = vm.foodOne;
                                } else if(j < 20 && vm.foodTwo == businesses[j].categories[m][n]) {
                                    businesses[j].group = vm.foodTwo;
                                } else if(j >= 20 && j < 40
                                    && vm.foodOne == businesses[j].categories[m][n]) {
                                    businesses[j].group = vm.foodOne;
                                } else if(j >= 20 && j < 40
                                    && vm.foodTwo == businesses[j].categories[m][n]) {
                                    businesses[j].group = vm.foodTwo;
                                }
                            }
                        }
                    }
                    var visualization = d3plus.viz()
                        .container('div#viz')
                        .data(businesses)
                        .type('bubbles')
                        .id(['group', 'name', 'rating', 'totalReviews'])
                        .depth(1)
                        .size('reviews')
                        .color('color')
                        .height(600)
                        .draw();
                })
                .error(function (data) {
                    console.log(data);
                });
        }
    }
});