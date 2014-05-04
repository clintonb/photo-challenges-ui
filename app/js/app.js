'use strict';


// Declare app level module which depends on filters, and services
angular.module('photoChallenges', [
  'ngRoute',
  'photoChallenges.filters',
  'photoChallenges.services',
  'photoChallenges.directives',
  'photoChallenges.controllers'
]).config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/challenges', {templateUrl: 'partials/challenge-list.html', controller: 'ChallengeListCtrl'});
  $routeProvider.when('/challenges/new', {templateUrl: 'partials/challenge-create.html', controller: 'ChallengeCreateCtrl'});
  $routeProvider.when('/challenges/:id', {templateUrl: 'partials/challenge-detail.html', controller: 'ChallengeDetailCtrl'});
  $routeProvider.otherwise({redirectTo: '/challenges'});
}]);
