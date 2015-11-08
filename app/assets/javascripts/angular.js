var app = angular.module('VibezApp', []);

app.controller('HeaderController', ['$http', function($http) {
  var _this = this;
  $http.get('/session').success(function(data){
    _this.current_user = data.current_user;
    // console.log(_this.current_user)
  })
}]);

app.controller('PostsController', ['$http', function($http){
  //get authenticity_token from DOM (rails injects it on load)
  var authenticity_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  var _this = this;

  this.VIBE_TYPES  = ['sad', 'cool', 'chill', 'happy']
  this.newPostVibe = 'sad';

   //array for getPosts data
    this.vibeData = [];

  //pushing getPosts data in array for filter
    this.pushData = function(vibePushData){
      _this.vibeData.push(vibePushData)
    };

  //get posts data and add it to the controller
  this.getPosts = function(){
    // get posts for current user
    $http.get('/posts').success(function(data){
     _this.posts = data.posts;
     _this.pushData(data.posts)
     console.log(_this.vibeData)
    });
  } // end of getPosts function
  this.getPosts()
}]); // end of PostsController

app.controller('FilterController', ['$http', function($http){
  //get authenticity_token from DOM (rails injects it on load)
  var authenticity_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  var _this = this;

   //array for getPosts data
  this.vibeData = [];

  //pushing getPosts data in array for filter
  this.pushData = function(vibePushData){
        _this.vibeData.push(vibePushData)
      };

  //get posts data and add it to the controller
  this.getPosts = function(){
    // get posts for current user
    $http.get('/posts').success(function(data){
     _this.posts = data.posts;
     _this.pushData(data.posts)
     console.log(_this.vibeData)
    });
  } // end of getPosts function
  getPosts();

  this.vibeIncludes = [];

  this.includeVibe = function(vibe) {
    var i = $.inArray(vibe, _this.vibeIncludes);
    if (i > -1) {
      _this.vibeIncludes.splice(i, 1);
    } else {
      _this.vibeIncludes.push(vibe);
    }
  }

  this.vibeFilter = function(vibe) {
      if(_this.vibeIncludes.length > 0) {
        if ($.inArray(vibe.vibe, _this.vibeIncludes) < 0)
        return;
      }
      return vibe;
  }

}]);
