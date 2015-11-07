var app = angular.module('VibezApp', []);

app.controller('HeaderController', ['$http', function($http) {
  var _this = this;
  $http.get('/session').success(function(data){
    _this.current_user = data.current_user;
    console.log(_this.current_user)
  })
}]);
