'use strict';

describe('controllers', function () {
  beforeEach(function () {
    this.addMatchers({
      toEqualData: function (expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  beforeEach(module('photoChallenges'));
  beforeEach(module('photoChallenges.controllers'));


  describe('ChallengeListCtrl', function () {
    var scope, ctrl, $httpBackend;
    var challenges = [
      {id: 1, description: "Photograph an interesting cloud.", created_at: "2014-04-19T00:03:47.631Z", photos: {count: 8}, user: {id: 1, display_name: "ccb621"}, likes: 1},
      {id: 2, description: "Photograph a car.", created_at: "2014-03-19T00:03:47.631Z", photos: {count: 0}, user: {id: 1, display_name: "ccb621"}, likes: 2}
    ];

    beforeEach(inject(function (_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('http://localhost:3000/challenges.json').
          respond(challenges);

      scope = $rootScope.$new();
      ctrl = $controller('ChallengeListCtrl', {$scope: scope});
    }));


    it('should create "challenges" model with 2 challenges fetched from xhr', function () {
      expect(scope.challenges).toEqualData([]);
      $httpBackend.flush();

      expect(scope.challenges).toEqualData(challenges);
    });


    it('should set the default value of orderProp model', function () {
      expect(scope.orderProp).toBe('-created_at');
    });
  });

  describe('ChallengeDetailCtrl', function () {
    var scope, $httpBackend, ctrl,
        testChallengeData = function () {
          return {id: 1, description: "Photograph an interesting cloud.", created_at: "2014-04-19T00:03:47.631Z", photos: {count: 8}, user: {id: 1, display_name: "ccb621"}, likes: 1}
        };


    beforeEach(inject(function (_$httpBackend_, $rootScope, $routeParams, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('http://localhost:3000/challenges/1.json').respond(testChallengeData());

      $routeParams.id = 1;
      scope = $rootScope.$new();
      ctrl = $controller('ChallengeDetailCtrl', {$scope: scope});
    }));


    it('should fetch challenge detail', function () {
      expect(scope.challenge).toEqualData({});
      $httpBackend.flush();

      expect(scope.challenge).toEqualData(testChallengeData());
    });
  });
});
