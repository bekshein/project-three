var app = angular.module('VibezApp', ['ngRoute']);

app.controller('HeaderController', ['$http', function($http) {
    //get authenticity_token from DOM (rails injects it on load)
    var authenticity_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  var _this = this;
  this.aut = authenticity_token;
  $http.get('/session').success(function(data){
    _this.current_user = data.current_user;
    console.log(_this.current_user)
    console.log("this is AUTHENTICITY TOKEN" + authenticity_token)
  })
}]);

app.controller('PostsController', ['$http', function($http){
  //get authenticity_token from DOM (rails injects it on load)
  var authenticity_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  var _this = this;
  this.aut = authenticity_token;

  this.VIBE_TYPES  = ['sad', 'cool', 'chill', 'happy']
  this.newPostVibe = 'sad';

  $http.get('/session').success(function(data){
    console.log("SESSION BACK:", data.current_user);
    _this.current_user = data.current_user;

    _this.currentUser = {
      email: data.current_user.email,
      username: data.current_user.username,
      password: data.current_user.password
    };

    console.log(_this.current_user)
    console.log("this is AUTHENTICITY TOKEN" + authenticity_token)
  })

  //get posts data and add it to the controller
  this.getPosts = function(){
    // get posts for current user
    $http.get('/posts').success(function(data){
     _this.posts = data.posts;
     console.log(_this.posts)
    });
  } // end of getPosts function
  this.getPosts()

  this.updateUser = function() {
    console.log(_this.currentUser.newPassword);

    var userParams = {
      email: _this.currentUser.email,
      username: _this.currentUser.username
    };

    if (_this.currentUser.newPassword) {
      userParams.password = _this.currentUser.newPassword;
    };


    $http.patch('/users/' + _this.current_user.id, {
      user: userParams,
      authenticity_token: _this.aut
    }).success(function (result) {
      console.log(result);
    })
  }
}]); // end of PostsController

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $locationProvider.html5Mode({ enabled: true });
  $routeProvider.
    when('/', {
      templateUrl: 'angular_templates/login.html',
      controller: 'HeaderController',
      controllerAs: 'ctrl'
    }).
     when('/signup', {
       templateUrl: 'angular_templates/signup.html',
       controller: 'HeaderController',
       controllerAs: 'ctrl'
     }).
     when('/application/feed', {
       templateUrl: 'angular_templates/vboard.html',
       controller: 'PostsController',
       controllerAs: 'pctrl'
     }).
     when('/application/profile', {
       templateUrl: 'angular_templates/profile.html',
       controller: 'PostsController',
       controllerAs: 'pctrl'
     }).
     when('/application/newpost', {
       templateUrl: 'angular_templates/new.html',
       controller: 'PostsController',
       controllerAs: 'pctrl'
     }).
     when('/application/following', {
       templateUrl: 'angular_templates/following.html',
       controller: 'PostsController',
       controllerAs: 'pctrl'
     }).
     when('/application/followers', {
       templateUrl: 'angular_templates/followers.html',
       controller: 'PostsController',
       controllerAs: 'pctrl'
     });
}]);
