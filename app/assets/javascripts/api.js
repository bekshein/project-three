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
    var iframe = angular.element('#iframe');
    url = url + permalink_url;
    iframe.attr('src', url);
    iframe.attr('width', "500");
    iframe.attr('height', "180");
  };
}]);
