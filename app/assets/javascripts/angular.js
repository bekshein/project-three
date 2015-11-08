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

  //get posts data and add it to the controller
  this.getPosts = function(){
    // get posts for current user
    $http.get('/posts').success(function(data){
     _this.posts = data.posts;
     console.log(data)
    });
  } // end of getPosts function
  this.getPosts()

  //make a post
  $http.post('/posts', {
    //include authenticity_token
      authenticity_token: authenticity_token,
    //values from form
    post: {
      song_title:  this.newPostTitle,
      artist_name: this.newArtistName,
      vibe:        this.newVibe,
      like:        this.newLike
    }
  }).success(function(data){
    _this.current_user_posts.push(data.post);
  });

}]);
