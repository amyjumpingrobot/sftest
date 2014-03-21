(function(){
  module.exports = ['$location', '$cookieStore', 'appModel', 'usersModel',
  function($location, $cookieStore, appModel, usersModel) {
    return {
      getLoggedInUser: function() {
        var userId = $cookieStore.get("userId"),
            users = usersModel.slice(0);

        return users.filter(function(user){
          return user.id == userId;
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
        return appModel.profilePhotosBase + user.thumb;
      }
    }
  }];
}).call(this);
