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

  describe('DailyChallengeDetailCtrl', function () {
    function sharedBehaviorForDailyChallengeRetrieval(context) {
      var scope, $httpBackend, ctrl;

      beforeEach(inject(function (_$httpBackend_, $rootScope, $routeParams, $controller) {
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET('http://localhost:3000/daily-challenges/' + context.api_id + '.json').respond(context.api_data);

        $routeParams.id = context.routeparam_id;
        scope = $rootScope.$new();
        ctrl = $controller('DailyChallengeDetailCtrl', {$scope: scope});
      }));

      it('should fetch the DailyChallenge', function () {
        expect(scope.daily_challenge).toEqualData({});
        $httpBackend.flush();

        expect(scope.daily_challenge).toEqualData(context.api_data);
      });
    }


    describe('without routeparam', function () {
      var context = {
        api_data: {"id": 1, "created_at": "2014-04-18T04:00:00.000Z", "description": "Et non repellat debitis.", "user": {"id": 4, "display_name": "dane.anderson"}, "photos": {"count": 2, "links": [
          {"id": 27, "url": "http://lorempixel.com/640/480/?9391", "user": {"id": 8, "display_name": "justus"}},
          {"id": 394, "url": "http://lorempixel.com/640/480/?5305", "user": {"id": 16, "display_name": "maryjane"}}
        ]}},
        routeparam_id: null,
        api_id: 'latest'
      };

      sharedBehaviorForDailyChallengeRetrieval(context);
    });

    describe('with routeparam', function () {
      var context = {
        api_data: {"id": 2, "created_at": "2014-04-17T04:00:00.000Z", "description": "Optio quae voluptas sint et harum nostrum adipisci iure.", "user": {"id": 4, "display_name": "dane.anderson"}, "photos": {"count": 5, "links": [
          {"id": 59, "url": "http://lorempixel.com/640/480/?9934", "user": {"id": 16, "display_name": "maryjane"}},
          {"id": 131, "url": "http://lorempixel.com/640/480/?5788", "user": {"id": 1, "display_name": "ccb621"}},
          {"id": 310, "url": "http://lorempixel.com/640/480/?4604", "user": {"id": 12, "display_name": "derek"}},
          {"id": 362, "url": "http://lorempixel.com/640/480/?7044", "user": {"id": 10, "display_name": "litzy.hegmann"}},
          {"id": 400, "url": "http://lorempixel.com/640/480/?3786", "user": {"id": 14, "display_name": "eusebio_barton"}}
        ]}},
        routeparam_id: 2,
        api_id: 2
      };

      sharedBehaviorForDailyChallengeRetrieval(context);
    });
  });
});
