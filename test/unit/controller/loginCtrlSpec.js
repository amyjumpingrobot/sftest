'use strict';

describe('controllers', function() {
  beforeEach(module('app'));

  describe('LoginCtrl', function() {
    it('should have users', inject(function($controller) {
      var scope = {},
          ctrl = $controller('LoginCtrl', {$scope:scope});

      expect(scope.users.length).not.toBe(0);
      expect(scope.users[0].id).not.toBe(0);
    }));
  });
});
