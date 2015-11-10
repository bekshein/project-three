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

app.controller('UserController', ['$http', function($http){
  var controller = this;
  //this fetches posts data and adds it to controller
  this.getPosts = function(){
    // get posts for current User
    $http.get('/posts').success(function(data){
      controller.current_user_posts = data.posts;
    });
  };

  this.updateUser = function(user){
    $http.patch('/users/' + user.id).success(function(data){
      controller.current_user = data.user;
    });
  };

  this.destroyUser = function(user){
    $http.delete('/users/' + user.id).success(function(data) {

    })
  }
  this.getPosts();
}]);

app.controller('FollowController', ['$http', function($http){
  var controller = this;

  this.getFollowers = function(){
    $http.get('/users/'+ user.id +'/followers').success(function(data){
      // controller.current_user_followers = data.followers;
    });
  }

  this.getFollowing = function(){
    $http.get('/users/' + user.id + '/following').success(function(data){
      // controller.current_user_following = data.following;
    });
  }
}])

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
