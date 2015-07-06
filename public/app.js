var yelpApp = angular.module('yelpApp', []);

yelpApp.controller('yelpController', function($http) {
    var vm = this;
    vm.foodTypes = [];

    vm.keypressHandler = function(event, nextIdx){
        if(event.keyCode == 13) {
            angular.element(document.querySelector('#f_' + nextIdx))[0].focus();
        }
    };

    vm.displaySearch = function(event) {
        if(event.keyCode == 13) {
            angular.element(document.querySelector('#foodInput')).css('display', 'block');
            angular.element(document.querySelector('#locationInput')).css('display', 'none');
        }
    };

    vm.showSearch = function() {
        angular.element(document.querySelector('#foodInput')).css('display', 'block');
    };

    vm.enter = function(event) {
        if(event.keyCode == 13) {
            angular.element(document.querySelector('#foodInput')).css('display', 'none');
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
                                business.reviewBlurb = 'From ' + data[i].numReview + ' reviews';
                                business.group = data[i].category;
                                business.rating = 'Rating: ' + data[i].rating + ' stars';
                                if(data[i].rating >= 4.5) {
                                    business.color = '#c11c17';
                                } else if(data[i].rating === 4) {
                                    business.color = '#de5003';
                                } else if(data[i].rating === 3.5) {
                                    business.color = '#e27a1d';
                                } else if(data[i].rating === 3.0) {
                                    business.color = '#e6aa19';
                                } else if(data[i].rating <= 2.5) {
                                    business.color = '#f9f1ba';
                                }
                                businesses.push(business);
                            }
                            vm.visualization = d3plus.viz()
                                .container('#viz')
                                .data(businesses)
                                .type('bubbles')
                                .id(['group', 'name', 'rating', 'reviewBlurb'])
                                .depth(1)
                                .size('reviews')
                                .color('color')
                                .height(600)
                                .draw();
                            vm.visualize = d3plus.viz()
                                .container('#pie')
                                .data(businesses)
                                .type('pie')
                                .id(['group', 'rating', 'name'])
                                .size('reviews')
                                .color('color')
                                .height(600)
                                .draw()
                        })
                        .error(function (data) {
                            console.log(data);
                        });
                }
            }
        };
});