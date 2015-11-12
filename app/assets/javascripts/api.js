var app = angular.module('SoundCloudTester', []);
app.controller('TrackController', ['$http', function($http) {

  this.tracks = [];
  this.searchString = "";
  this.client_id = 'b5bc5954389edc0ac2a8c023851af762';


  this.makeCall = function() {
    console.log(this);
    var ctrlObj = this;
    var endpoint = 'http://api.soundcloud.com/tracks?q=';
    endpoint += this.searchString + "&client_id=" + this.client_id;
    var promise = $http.get(endpoint);
    promise.success(function(data) {
      console.log(angular.element('.play'));
      ctrlObj.tracks = data;
      // ctrlObj.widge = "https://w.soundcloud.com/player/?url=" + tracks.permalink_url;
      // angular.element('.play').on('click', function(e) {
      //   console.log(e);
      //   angular.element('.iframe').attr('src', "https://w.soundcloud.com/player/?url=" + tracks.permalink_url);
      //   // angular.element('#iframe').attr('src', "https://w.soundcloud.com/player/?url=" + tracks.permalink_url);
      // });
    });
    promise.error(function(error){
      console.log("error - " + error);
    });
  };
  this.getPlayer = function() {
    var url = "https://w.soundcloud.com/player/?url="
    var el = angular.element(event.target)
    var permalink_url = el.data('url');
    var iframeId = el.data('id');
    var iframe = angular.element('#iframe' + iframeId);
    url = url + permalink_url;
    iframe.attr('src', url);
    iframe.attr('width', "500");
    iframe.attr('height', "180");
    // angular.element('.play').on('click', function(e) {
    //   console.log('EVENT' + e);
    //   console.log('EVENT' + angular.element('.play'));
    //   console.log('EVENT' + angular.element('.iframe'));
    // });
    // var ctrlObj2 = this;
    // console.log("this is controller object 2" + ctrlObj2);
    // var url = angular.element('button').target.id;
    // console.log(url);
    // var endpoint2 = "http://soundcloud.com/oembed?format=json&url='"
    // endpoint2 += url + "&client_id=" + this.client_id;
    // var promise2 = $http.get(endpoint2);
    // promise2.success(function(data) {
    //   var widgetRt = 'https://w.soundcloud.com/player/?url=';
    //   console.log(data);
    //   return 'src="' + widgetRt + this.url + '"';
    //   // angular.element('button').on('click', function() {
    //   //   angular.element('#iframe').attr('src', this.widgetRt + this.url)
    //   // });
    // });
    // promise2.error(function(error) {
    //   console.log("error - " + error);
    // });
  };
}]);

//
// $('li').on('click', function(event) {
//   console.log(event);
//   console.log(app.getPlayer);
//   console.log(event.target.id);
//   (event.target.id);
// });



// http://api.soundcloud.com/resolve.json?url=
