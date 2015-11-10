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

  //get posts data and add it to the controller
  this.getPosts = function(){
    // get posts for current user
    $http.get('/posts').success(function(data){
     _this.posts = data.posts;
     console.log(_this.posts)
    });
  } // end of getPosts function
  this.getPosts()
}]); // end of PostsController

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $locationProvider.html5Mode({ enabled: true });
  $routeProvider.
    when('/', {
      templateUrl: 'angular_templates/login.html.erb',
      controller: 'HeaderController',
      controllerAs: 'ctrl'
    }).
     when('/signup', {
       templateUrl: 'angular_templates/signup.html.erb',
       controller: 'HeaderController',
       controllerAs: 'ctrl'
     }).
     when('/application/feed', {
       templateUrl: 'angular_templates/vboard.html.erb',
       controller: 'PostsController',
       controllerAs: 'pctrl'
     }).
     when('/application/profile', {
       templateUrl: 'angular_templates/profile.html.erb',
       controller: 'PostsController',
       controllerAs: 'pctrl'
     }).
     when('/application/newpost', {
       templateUrl: 'angular_templates/new.html.erb',
       controller: 'PostsController',
       controllerAs: 'pctrl'
     }).
     when('/application/following', {
       templateUrl: 'angular_templates/following.html.erb',
       controller: 'PostsController',
       controllerAs: 'pctrl'
     }).
     when('/application/followers', {
       templateUrl: 'angular_templates/followers.html.erb',
       controller: 'PostsController',
       controllerAs: 'pctrl'
     });
}]);
