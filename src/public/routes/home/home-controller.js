angular.module('homeController', [])

    .controller('HomeCtrl', function ($scope, appName) {
      $scope.homeState = {};
      $scope.homeState.appName = appName;
      $scope.homeState.answer = 'yes';
    });
