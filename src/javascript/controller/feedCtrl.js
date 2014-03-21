(function(){
  module.exports = ['$rootScope', '$scope', '$timeout', '$interval', '$location', 'appGlobals', 'feedModel',
    function($rootScope, $scope, $timeout, $interval, $location, g, feedModel){
      if (!g.isLoggedIn()) {
        $location.url('/');
        return;
      }

      $scope.feedUpdateIntervalSecs = 5;

      $scope.user = g.getLoggedInUser();
      $scope.feed = feedModel;
      $scope.feedPostText = null;
      $scope.feedLastUpdateTime = 0;
      $scope.feedItemToDelete = null;

      $scope.$deleteModal = $(".feed-item-delete-modal-container");
      $scope.$feedPostSubmit = $(".feed-post-submit");
      $scope.$feedPostText = $(".feed-post-text");
      $scope.$navMenu = $(".user-nav-bar");
      $scope.$userMenu = $(".user-nav-bar .user-menu");
      $scope.$userThumb = $(".user-nav-bar .user-thumb");

      $scope.logOut = g.logOut;
      $scope.thumbUrl = g.thumbUrl;

      $scope.canDeletePost = function(feedItemUser) {
        return $scope.user.id == feedItemUser.id;
      }
      $scope.deleteFeedItemNow = function() {
        $scope.dismissDeleteModal();

        for (var idx = 0; idx < $scope.feed.length; idx++) {
          if ($scope.feed[idx].postedAt == $scope.feedItemToDelete.postedAt) {
            $scope.feed.splice(idx, 1);
            return;
          }
        }
      }
      $scope.dismissDeleteModal = function() {
        $scope.$deleteModal.fadeOut();
        $(window).off('keyup', $scope.watchKeysForDeleteModal);
      }
      $scope.feedItemDelete = function(feedItem) {
        $scope.feedItemToDelete = feedItem;
        $scope.showDeleteModal();
      }
      $scope.feedPostSubmit = function() {
        if ($scope.feedPostText && $scope.feedPostText!='') {
          var $oldValue = $scope.$feedPostSubmit.html();

          $scope.$feedPostText.attr({disabled: true});
          $scope.$feedPostSubmit.attr({disabled: true}).html("").addClass("submitting");

          $timeout(function() {
            $scope.feed.push(new $rootScope.FeedItem($scope.user, new Date().getTime(), $scope.feedPostText));
            $scope.feedPostText = '';

            $scope.$feedPostText.attr({disabled: false});
            $scope.$feedPostSubmit.attr({disabled: false}).html($oldValue).removeClass("submitting");
          }, 1000);
        }
      }
      $scope.showDeleteModal = function() {
        $scope.$deleteModal.fadeIn();

        $(window).on('keyup', $scope.watchKeysForDeleteModal.bind(this));
      }
      $scope.toggleMenu = function() {
        $scope.$userMenu.togglewClass('active');
      }
      $scope.watchKeysForDeleteModal = function(ev) {
        var keyCode = ev.keyCode || ev.charCode;

        switch(keyCode) {
          case 13: $scope.deleteFeedItemNow(); break;
          case 27: $scope.dismissDeleteModal(); break;
        }
      }

      function init() {
        $scope.$on('feed-post-submit', $scope.feedPostSubmit);
        $scope.$navMenu.on('mouseleave', function() {
          $scope.$userMenu.removeClass('active');
        });
        $scope.$userThumb.on('mouseenter', function(){
          $scope.$userMenu.addClass('active');
        });

        $interval(function() {
          $scope.feedLastUpdateTime = new Date().getTime();
        }, $scope.feedUpdateIntervalSecs * 1000);

        $scope.$navMenu.addClass('active');
      }

      $timeout(init, 100);
    }
  ];
}).call(this);
