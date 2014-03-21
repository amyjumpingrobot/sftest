(function(){
  // Filters
  var appFilters = angular.module('appFilters', []);

  appFilters.filter('prettyDate', function() {
    return function(input) {
      var secondsAgo = (new Date().getTime() - input)/1000;
      var minutesAgo = secondsAgo/60;
      var hoursAgo = minutesAgo/60;
      var daysAgo = hoursAgo/24;

      if (secondsAgo < 5) {
        return 'Now'
      } else if (secondsAgo < 30) {
        return '30 seconds ago'
      } else if (secondsAgo <= 60) {
        return 'About a minute ago'
      } else if (minutesAgo <= 60) {
        return Math.floor(minutesAgo) + ' minutes ago'
      } else if (hoursAgo <= 24) {
        return Math.floor(hoursAgo) + ' hours ago'
      } else {
        return Math.floor(daysAgo) + ' days ago'
      }
    }
  });

  appFilters.filter('prettyCommentsCTA', function(){
    return function(comments) {
      if (!comments || comments.length == 0) {
        return 'Comment';
      } else if (comments.length == 1) {
        return '1 Comment';
      } else {
        return comments.length + ' Comments';
      }
    }
  });
}).call(this);
