'use strict';

function url_base64_decode(str) {
  var output = str.replace('-', '+').replace('_', '/');
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += '==';
      break;
    case 3:
      output += '=';
      break;
    default:
      throw 'Illegal base64url string!';
  }
  return window.atob(output);
}

angular.module('myApp.simpleLogin', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/simple-login', {
    templateUrl: 'simple-login/simple-login.html',
    controller: 'SimpleLoginCtrl'
  });
}])

.controller('SimpleLoginCtrl', function($scope, $http, $window) {
  console.log("Hello from Home!");

  $scope.user = {username: 'stefan.giegerich', password: 'versata!'};
  $scope.isAuthenticated = false;
  $scope.welcome = '';
  $scope.message = '';

  $scope.submit = function () {
    $http
        .post('/authenticate', $scope.user)
        .success(function (data, status, headers, config) {
          $window.sessionStorage.token = data.token;
          $scope.isAuthenticated = true;
          var encodedProfile = data.token.split('.')[1];
          var profile = JSON.parse(url_base64_decode(encodedProfile));
          $scope.welcome = 'Servus ' + profile.first_name + ' ' + profile.last_name;
        })
        .error(function (data, status, headers, config) {
          delete $window.sessionStorage.token;
          $scope.isAuthenticated = false;


          $scope.error = 'Error: Invalid user or password';
          $scope.welcome = '';
        });
  };

  $scope.logout = function () {
    $scope.welcome = '';
    $scope.message = '';
    $scope.isAuthenticated = false;
    delete $window.sessionStorage.token;
  };

  $scope.callRestricted = function () {
    $http({url: '/api/restricted', method: 'GET'})
        .success(function (data, status, headers, config) {
          $scope.message = $scope.message + ' ' + data.name;
        })
        .error(function (data, status, headers, config) {
          alert(data);
        });
  };

});