(function(){
  module.exports = ['$scope', '$window', '$interval', '$location', '$cookieStore', 'appGlobals', 'appModel', 'usersModel',
  function($scope, $window, $interval, $location, $cookieStore, g, appModel, usersModel){
    if (g.isLoggedIn()) {
      $location.url('feed');
      return;
    }

    $scope.users = usersModel;

    $scope.setUser = g.setUser;
    $scope.thumbUrl = g.thumbUrl;
  }];
}).call(this);
