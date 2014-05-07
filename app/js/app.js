'use strict';


// Declare app level module which depends on filters, and services
angular.module('photoChallenges', [
  'mgcrea.ngStrap',
  'ngRoute',
  'photoChallenges.filters',
  'photoChallenges.services',
  'photoChallenges.directives',
  'photoChallenges.controllers'
]).config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/challenges', {templateUrl: 'partials/challenge-list.html', controller: 'ChallengeListCtrl'});
  $routeProvider.when('/challenges/new', {templateUrl: 'partials/challenge-create.html', controller: 'ChallengeCreateCtrl'});
  $routeProvider.when('/challenges/:id', {templateUrl: 'partials/challenge-detail.html', controller: 'ChallengeDetailCtrl'});
  $routeProvider.when('/daily-challenges', {templateUrl: 'partials/challenge-detail.html', controller: 'DailyChallengeDetailCtrl'});
  $routeProvider.when('/daily-challenges/all', {templateUrl: 'partials/daily_challenge-list.html', controller: 'DailyChallengeListCtrl'});
  $routeProvider.when('/daily-challenges/:id', {templateUrl: 'partials/challenge-detail.html', controller: 'DailyChallengeDetailCtrl'});
  $routeProvider.when('/photos', {templateUrl: 'partials/photo-list.html', controller: 'PhotoListCtrl'});
  $routeProvider.when('/photos/:id', {templateUrl: 'partials/photo-detail.html', controller: 'PhotoDetailCtrl'});
  $routeProvider.otherwise({redirectTo: '/daily-challenges'});
}]);
