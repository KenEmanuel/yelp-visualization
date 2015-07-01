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
                        business.value = data[i].numReview;
                        business.rating = 'Rating: ' +data[i].rating + ' stars';
                        if(data[i].rating === 5) {
                            business.color = '#ffd700';//gold
                        } else if(data[i].rating === 4.5) {
                            business.color = '#ff0000';//red
                        } else if (data[i].rating === 4) {
                            business.color = '#0000ff';//blue
                        } else if (data[i].rating === 3.5) {
                            business.color = '#7f00ff';//purple
                        } else {
                            business.color = '#ffffff';
                        }
                        businesses.push(business);
                    }
                    for(var j = 0; j < businesses.length; j++) {
                        if(j < 20) {
                            businesses[j].group = vm.foodOne;
                        } else if (j >= 20 && j < 40) {
                            businesses[j].group = vm.foodTwo;
                        }
                    }
                    console.log(businesses);

                    var visualization = d3plus.viz()
                        .container('div#viz')
                        .data(businesses)
                        .type('bubbles')
                        .id(['group', 'name', 'rating'])
                        .depth(1)
                        .size('value')
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