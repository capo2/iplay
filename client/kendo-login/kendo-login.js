'use strict';

angular.module('myApp.kendoLogin', ['ngRoute', 'kendo.directives' ])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/kendo-login', {
    templateUrl: 'kendo-login/kendo-login.html',
    controller: 'KendoLoginCtrl'
  });
}])

.controller('KendoLoginCtrl', function($scope) {
      $scope.validate = function(event) {
        event.preventDefault();

        if ($scope.validator.validate()) {
          $scope.validationMessage = "Supi!";
          $scope.validationClass = "valid";
        } else {
          $scope.validationMessage = "Form is invalid";
          $scope.validationClass = "invalid";
        }
      }
});