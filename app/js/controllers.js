'use strict';

/* Controllers */

var controllers = angular.module('photoChallenges.controllers', []);

controllers.controller('ChallengeListCtrl', ['$scope', 'Challenge', function ($scope, Challenge) {
  $scope.challenges = Challenge.query();
  $scope.orderProp = '-created_at';
}]);

controllers.controller('ChallengeDetailCtrl', ['$scope', '$routeParams', 'Challenge', function ($scope, $routeParams, Challenge) {
  $scope.challenge = Challenge.get({id: $routeParams.id}, function (challenge) {
  });
}]);

controllers.controller('ChallengeCreateCtrl', ['$scope', '$routeParams', 'Challenge', function ($scope, $routeParams, Challenge) {
}]);

controllers.controller('DailyChallengeDetailCtrl', ['$scope', '$routeParams', 'DailyChallenge', function ($scope, $routeParams, DailyChallenge) {
  $scope.daily_challenge = DailyChallenge.get({id: $routeParams.id || 'latest'}, function (daily_challenge) {
    $scope.challenge = daily_challenge.challenge;
  });
}]);
