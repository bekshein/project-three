var app = angular.module('VibezApp', ['ngRoute']);

//Header Controller
app.controller('HeaderController', ['$htpp', function($http){
  var controller = this;
  //Get current user from route
  $http.get('/session').success(function(data){
    //setting current user to data.current user because
    // data comes back like {current_user:{email: 'sdfasdf'}}
    controller.current_user = data.current_user;
  })
}]); // end of controller1
