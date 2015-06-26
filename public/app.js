var yelpApp = angular.module('yelpApp', []);

yelpApp.controller('curryController', function($http) {
    var vm = this;
    vm.message = 'Lets check out some curries';

    //var foodTypes = ['Indian', 'Chinese', 'American'];
    //
    //for (var i = 0; i < foodTypes.length; i++) {
        $http.get('http://localhost:3000/restaurants')
            .success(function(data) {
            vm.image = data.image;
            vm.name = data.name;
            vm.rating = data.rating;
            vm.numReview = data.numReview;
        });
    //}
});