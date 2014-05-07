'use strict';

/* Directives */


var directives = angular.module('photoChallenges.directives', []);

directives.directive('appVersion', ['version', function (version) {
  return function (scope, elm, attrs) {
    elm.text(version);
  };
}]);

directives.directive('photoGrid', function () {
  return {
    restrict: 'E',
    scope: {
      photos: '='
    },
    templateUrl: 'partials/photo-grid.html'
  };
});

directives.directive('challengeHeader', function () {
  return {
    restrict: 'E',
    scope: {
      challenge: '='
    },
    templateUrl: 'partials/challenge-header.html'
  };
});
