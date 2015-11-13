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


  //get users data and add it to the controller
  this.getUsers = function(){
    $http.get('/users').success(function(data){
     _this.users = data.users;
    });
  } // end of getUsers function

  this.getUserPosts = function(){
    // get posts for current user
    $http.get('/users/' + $scope.$parent.current_user.id).success(function(data){
      _this.userposts = data.posts;
      console.log(data);
    })
  } // end of getUserPosts function

  this.getFollowers = function(){
    $http.get('/users/' + $scope.$parent.current_user.id + '/followers').success(function(data){
      console.log("!!!!!!!!");
      console.log($scope.$parent.current_user.id);
      console.log(data);
      _this.followers = data.followers.users;
    });
  } // end of getFollowers function

  this.getFollowing = function(){
    $http.get('/users/' + $scope.$parent.current_user.id + '/following').success(function(data){
      _this.following = data.following.users;
    });
  } // end of getFollowing function

  this.getOtherUser = function(){
    $http.get('/users/' + $routeParams.id).success(function(data){
      _this.founduser = data;
      _this.founduserposts = data.posts;
      console.log(data);
    })
  } // end of getOtherUser function

  this.getOtherFollowers = function(){
    $http.get('/users/' + $routeParams.id + '/followers').success(function(data){
      _this.ofollowers = data.followers.users;
    });
  } // end of getOtherFollowers function

  this.getOtherFollowing = function(){
    $http.get('/users/' + $routeParams.id + '/following').success(function(data){
      _this.ofollowing = data.following.users;
    });
  } // end of getOtherFollowing function

  this.createFollow = function(){
    console.log($scope.userCtrl.founduser)
    console.log($scope.$parent.current_user)
    $http.post('/relationships', {
      authenticity_token: authenticity_token,
      relationship: {
        followed_id: $scope.userCtrl.founduser.id,
        follower_id: $scope.$parent.current_user.id
      }
    }).success(function(data) {
      console.log(data);
    }).error(function(err){
      console.log(err);
    })
  }

  this.destroyFollow = function(other_user){
    $http.delete('/relationships/' + $routeParams.id).then(function(response) {

    })
  }

  this.getUsers();
  this.getUserPosts();
  this.getFollowers();
  this.getFollowing();

  this.getOtherUser();
  this.getOtherFollowers();
  this.getOtherFollowing();

}]); // end of UserController

app.controller('PostsController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams){
<<<<<<< HEAD
  var controller = this
  // get authenticity_token from DOM (rails injects it on load)
  var authenticity_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
=======
>>>>>>> c51ca7c6791339c8395c0168138b35819dbcacd8
  var _this = this;
  this.VIBE_TYPES  = ['sad', 'cool', 'chill', 'happy'];
<<<<<<< HEAD
  this.newPostVibe = 'sad';
  this.permalink = "";
  this.title = "";
=======
  // get authenticity_token from DOM (rails injects it on load)
  this.authenticity_token = $('meta[name="csrf-token"]').attr('content');
  this.newPostTitle = $('#track-input');
  this.newPostSource = $('#source-input');
  this.newPostVibe = $('select');
>>>>>>> c51ca7c6791339c8395c0168138b35819dbcacd8

  //get posts data and add it to the controller
  this.getPosts = function(){
    $http.get('/posts').success(function(data){
     _this.posts = data.posts;
     _this.current_user = data.current_user;
     console.log(_this.posts)
    });
  } // end of getPosts function

  this.createPost = function(){
    // _this.current_user_posts.push({
    //   title: this.newPostTitle,
    //   source: this.newPosztSource,
    //   vibe: this.newPostVibe,
    // });
    // make a post to /posts
    $http.post('/posts', {
      authenticity_token: this.authenticity_token,
      // values from form
      post: {
<<<<<<< HEAD
        title: controller.newPostTitle,
        source: controller.newPostSource,
        vibe: controller.newPostVibe
=======
        title: this.newPostTitle.val(),
        source: this.newPostSource.val(),
        vibe: this.newPostVibe.val()
>>>>>>> c51ca7c6791339c8395c0168138b35819dbcacd8
      }
    }).success(function(data){
      console.log("THIS IS THAT DATTTAA", data)
      // _this.current_user_posts.pop();
<<<<<<< HEAD
      // console.log($scope.$parent.current_user.newPostTitle)
=======
>>>>>>> c51ca7c6791339c8395c0168138b35819dbcacd8
      _this.getPosts();
    });
  }


    this.tracks = [];
    this.searchString = "";
    this.client_id = 'b5bc5954389edc0ac2a8c023851af762';
    this.permalink = "";
    this.title = "";


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
      var permalink_url = el.data('url');
      var trackInput = angular.element('#track-input');
      trackInput.attr('value', title);
      var sourceInput = angular.element('#source-input');
      sourceInput.attr('value', permalink_url);
      angular.element('.search-remove').remove();

    };

  this.getPosts()


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
     when('/application/users', {
       templateUrl: 'angular_templates/users.html',
       controller: 'UserController',
       controllerAs: 'userCtrl'
     }).
     when('/users/:id', {
       templateUrl: 'angular_templates/show.html',
       controller: 'UserController',
       controllerAs: 'userCtrl'
     }).
     when('/posts', {
       templateUrl: 'angular_templates/new.html',
       controller: 'PostsController',
       controllerAs: 'pctrl'
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
