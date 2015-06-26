var yelpApp = angular.module('yelpApp', []);

yelpApp.controller('curryController', function($http) {
    var vm = this;
    vm.food = [];
    vm.message = 'Lets check out some curries';

    var foodTypes = ['indian', 'chinese', 'american'];


    var submit = function() {
        for (var i = 0; i < foodTypes.length; i++) {
            $http.get('http://localhost:3000/restaurants/' + vm.location + '/' + foodTypes[i])
                .success(function (data) {
                    vm.food = data
                })
                .error(function (data) {
                    console.log(data);
                });
        }
    }
});