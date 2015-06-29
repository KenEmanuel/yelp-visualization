var yelpApp = angular.module('yelpApp', []);

yelpApp.controller('curryController', function($http) {
    var vm = this;
    vm.message = 'Lets check out some curries';

    vm.submit = function() {
        $http.get('http://localhost:3000/restaurants/' + vm.location)
            .success(function (data) {
                console.log(data);
                vm.data = data;
            })
            .error(function (data) {
                console.log(data);
            });
    }
});