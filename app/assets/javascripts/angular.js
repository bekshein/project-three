var app = angular.module('VibezApp', ['ngRoute']);

// Main Controller to access everything
app.controller('ParentController', ['$http', '$scope',
function ($http, $scope) {
  $scope.authenticity_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  $scope.aut                = $scope.authenticity_token;

  var _this = this;

  $http.get('/session').success(function(data){
    $scope.current_user = data.current_user;
  });
}]);

app.controller('HeaderController', ['$http', '$scope', function($http, $scope) {
    // get authenticity_token from DOM (rails injects it on load)
  var authenticity_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  var _this = this;
  this.aut = authenticity_token;
  $http.get('/session').success(function(data){
    _this.current_user = data.current_user;
    console.log(_this.current_user)
    console.log("this is AUTHENTICITY TOKEN" + authenticity_token)
  })
}]);

app.controller('UserController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams){
  // get authenticity_token from DOM (rails injects it on load)
  var authenticity_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  var _this = this;
  this.aut = authenticity_token;

  this.getUserPosts = function () {
    $http.get('/users/' + $scope.current_user.id).success(function(data){
      _this.userposts = data.posts
      _this.current_user = data.current_user;
      console.log(data);
    })
  }

  this.getUser = function () {
    $http.get('/users/' + $routeParams.id).success(function(data){
      _this.founduser = data;
      console.log(data);
    })
  }

  this.updateUser = function(user){
    $http.patch('/users/' + $scope.current_user.id + '/edit').success(function(data){
      _this.current_user = data.user;
    });
  };

  this.destroyUser = function(user){
    $http.delete('/users/' + user.id).success(function(data) {

    })
  }

  this.getFollowers = function(){
    $http.get('/users/' + $scope.current_user.id + '/followers').success(function(data){
      _this.followers = data.followers.users;
    });
  } // end of getFollowers function

  this.getFollowing = function(){
    $http.get('/users/' + $scope.current_user.id + '/following').success(function(data){
      _this.following = data.following.users;
    });
  } // end of getFollowing function

  this.createFollow = function(){
    $http.post('/relationships').then(function(response) {

    })
  }
  this.destroyFollow = function(other_user){
    $http.delete('/relationships/' + other_user.id).then(function(response) {

    })
  }

  this.getUserPosts();
  this.getUser();
  this.getFollowers();
  this.getFollowing();
}]); // end of UserController

app.controller('PostsController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams){
  // get authenticity_token from DOM (rails injects it on load)
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
     _this.current_user = data.current_user;
     console.log(_this.posts)
    });
  } // end of getPosts function

  this.getUserPosts = function () {
    $http.get('/users/' + $scope.current_user.id).success(function(data){
      _this.userposts = data.posts
      console.log(data);
    })
  }

    this.tracks = [];
    this.searchString = "";
    this.client_id = 'b5bc5954389edc0ac2a8c023851af762';


    this.makeCall = function() {
      console.log(this.searchString)
      var ctrlObj = this;
      var endpoint = 'http://api.soundcloud.com/tracks?q=';
      endpoint += this.searchString + "&client_id=" + this.client_id;
      var promise = $http.get(endpoint);
      promise.success(function(data) {
        console.log(data);
        // console.log(angular.element('.play'));
        ctrlObj.tracks = data;
      });
      promise.error(function(error){
        console.log("error - " + error);
      });
    };
    this.getPlayer = function() {
      var url = "https://w.soundcloud.com/player/?url="
      var el = angular.element(event.target)
      var permalink_url = el.data('url');
      // var iframeId = el.data('id');
      var iframe = angular.element('.iframe');
      url = url + permalink_url;
      iframe.attr('src', url);
      iframe.attr('width', "500");
      iframe.attr('height', "180");
    };
    this.chooseSong = function() {
      var el = angular.element(event.target)
      var title = el.data('title');
      var permalink_url = el.data('url')
      var trackInput = angular.element('#track-input');
      trackInput.attr('value', title);
      var sourceInput = angular.element('#source-input');
      sourceInput.attr('value', permalink_url);
      angular.element('ul').remove();
      console.log(title)
    };

  this.getPosts()
  this.getUserPosts();
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
     when('/users/:id', {
       templateUrl: 'angular_templates/show.html',
       controller: 'UserController',
       controllerAs: 'userCtrl'
     }).
     when('/application/feed', {
       templateUrl: 'angular_templates/vboard.html',
       controller: 'PostsController',
       controllerAs: 'pctrl'
     }).
     when('/application/profile', {
       templateUrl: 'angular_templates/profile.html',
       controller: 'UserController',
       controllerAs: 'userCtrl'
     }).
     when('/application/newpost', {
       templateUrl: 'angular_templates/new.html',
       controller: 'PostsController',
       controllerAs: 'pctrl'
     }).
     when('/application/following', {
       templateUrl: 'angular_templates/following.html',
       controller: 'UserController',
       controllerAs: 'userCtrl'
     }).
     when('/application/followers', {
       templateUrl: 'angular_templates/followers.html',
       controller: 'UserController',
       controllerAs: 'userCtrl'
     });
}]);
