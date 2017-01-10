// create the module and name it scotchApp
var scotchApp = angular.module('scotchApp', ['ngRoute']);

// configure our routes
scotchApp.config(function($routeProvider) {
  $routeProvider

    // route for the home page
    .when('/', {
      templateUrl : 'pages/questions.html',
      controller  : 'questionController'
    })

    // route for the about page
    .when('/about', {
      templateUrl : 'pages/polls.html',
      controller  : 'pollController'
    })

    .when('/reply/:quest/:questId',{
      templateUrl : 'pages/reply.html',
      controller  : 'replyController'
    })


});

// create the controller and inject Angular's $scope
scotchApp.controller('questionController', function($scope, $http) {

  fetch();

  $scope.page = 1;

  function fetch() {
    $http.get("http://clients.yhatch.com/api/v3/question_response/3i52Hsr4XjGp3cQnp6ydsamx4HIt9ztv/?page=1")
      .then(function(response) {
        $scope.details = response.data;
        //console.log($scope.details);
      });

  }

});

scotchApp.controller('pollController', function($scope) {
  $scope.message = 'Look! I am an about page.';
});

scotchApp.controller('replyController', function($scope, $routeParams, $http) {
  var quesId = $routeParams.questId;
  $http.get("http://clients.yhatch.com/api/v3/reply_response/3i52Hsr4XjGp3cQnp6ydsamx4HIt9ztv/?page=1"+"&question_id="+quesId)
    .then(function(response) {
      $scope.reply = response.data;
      console.log("reply data ",$scope.reply.message);
    });
});

scotchApp.controller('questionDetails', function($scope, $http, $location){
    $scope.replyPage = function(data,questId){
      var qs = data.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/ig,'');
       $location.url('/reply/'+qs+'/'+questId);

    }



});
