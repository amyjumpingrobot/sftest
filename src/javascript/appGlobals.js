(function(){
  module.exports = ['$location', '$cookieStore', 'appModel', 'usersModel',
  function($location, $cookieStore, appModel, usersModel) {
    var exports = {
      getLoggedInUser: function() {
        return exports.getUserById($cookieStore.get("userId"));
      },
      getUserById: function(id) {
        var users = usersModel.slice(0);

        return users.filter(function(user){
          return user.id == id;
        })[0];
      },
      isEnterKeyEvent: function($event) {
        return $event && ($event.keyCode || $event.charCode) == 13;
      },
      isLoggedIn: function() {
        return $cookieStore.get("userId");
      },
      logOut: function() {
        $cookieStore.remove("userId");
        $location.url('login');
      },
      setUser: function(user) {
        $cookieStore.put("userId", user.id);
        $location.url('feed');
      },
      thumbUrl: function(user) {
        return appModel.profilePhotosBase + (user ? user.thumb : "avatar_120.png");
      }
    };

    return exports;
  }];
}).call(this);
