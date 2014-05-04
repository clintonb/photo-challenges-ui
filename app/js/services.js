'use strict';

var services = angular.module('photoChallenges.services', ['ngResource']);

services.value('version', '0.1');

services.factory('Challenge', ['$resource',
  function ($resource) {
    return $resource('http://localhost:3000/challenges/:id.json');
  }
]);
