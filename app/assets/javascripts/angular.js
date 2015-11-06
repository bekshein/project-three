var app = angular.module('VibezApp', []);

//Controller
app.controller('Controller', ['$http', function($http){
  var authenticity_token     = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
  var controller = this;

  controller.user = data.current_user

 //this fetches article data and adds it to the controller
  var getPost = function(){

    $http.get('/posts').success(function(data){
     //setting current user to data.current user because
     // data comes back like {current_user:{email: 'sdfasdf'}}
     controller.user     = data.current_user
     controller.posts    = data.posts

     console.log(data)
   });
  } // end of getPost
  //fetch post data for current user as Controller initializes
  getPost();

}]); // end of controller1
