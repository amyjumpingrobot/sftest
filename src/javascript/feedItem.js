(function(){
  module.exports = ['$rootScope', function($rootScope){
    $rootScope.FeedItem = function(user, postedAt, content, childFeedItems) {
      this.user = user;
      this.postedAt = postedAt;
      this.content = content;
      this.childFeedItems = childFeedItems || [];
    }
  }];
}).call(this);
