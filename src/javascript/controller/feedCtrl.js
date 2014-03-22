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
      $scope.feedItemConversation = null;
      $scope.feedItemConversationText = null;
      $scope.feedPostText = null;
      $scope.feedLastUpdateTime = 0;
      $scope.feedItemToDelete = null;

      $scope.$deleteModal = $(".feed-item-delete-modal-container");
      $scope.$feedContainer = $(".feed-items-container");
      $scope.$feedItemsPane = $(".feed-items-pane");
      $scope.$feedItemConversationPane = $(".feed-item-conversation-pane");
      $scope.$feedItemConversationSubmit = $(".feed-conversation-post-submit");
      $scope.$feedItemConversationText = $(".feed-conversation-post-text");
      $scope.$feedPostSubmit = $(".feed-post-submit");
      $scope.$feedPostText = $(".feed-post-text");
      $scope.$navMenu = $(".user-nav-bar");
      $scope.$userNavBarControls = $(".controls");
      $scope.$userMenu = $(".user-nav-bar .user-menu");
      $scope.$userThumb = $(".user-nav-bar .user-thumb");

      $scope.logOut = g.logOut;
      $scope.thumbUrl = g.thumbUrl;

      $scope.canDeletePost = function(feedItemUser) {
        return $scope.user.id == feedItemUser.id;
      }
      $scope.closeConversation = function() {
        $scope.showConversationPane(false);
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
      $scope.feedItemConversationSubmit = function () {
        if ($scope.feedItemConversationText && $scope.feedItemConversationText!='') {
          var $oldValue = $scope.$feedItemConversationSubmit.html();

          $scope.$feedItemConversationText.attr({disabled: true});
          $scope.$feedItemConversationSubmit.attr({disabled: true}).html("").addClass("submitting");

          $timeout(function() {
            $scope.feedItemConversation.childFeedItems.push(new $rootScope.FeedItem($scope.user, new Date().getTime(), $scope.feedItemConversationText));
            $scope.feedItemConversationText = '';

            $scope.$feedItemConversationText.attr({disabled: false});
            $scope.$feedItemConversationSubmit.attr({disabled: false}).html($oldValue).removeClass("submitting");
          }, 1000);
        }
      }
      $scope.feedItemDelete = function(feedItem) {
        $scope.feedItemToDelete = feedItem;
        $scope.showDeleteModal();
      }
      $scope.feedPostSubmit = function(parentFeedItem) {
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
      $scope.showConversationPane = function (show) {
        $scope.$userNavBarControls.toggleClass('inactive', !show);
        $scope.$feedItemsPane.toggleClass('inactive', show);
        $scope.$feedItemConversationPane.toggleClass('active', show);
      }

      $scope.showDeleteModal = function() {
        $scope.$deleteModal.fadeIn();

        $(window).on('keyup', $scope.watchKeysForDeleteModal.bind(this));
      }
      $scope.toggleMenu = function() {
        $scope.$userMenu.toggleClass('active');
      }
      $scope.updateContainerHeight = function() {
        $scope.$feedContainer.height($(window).height());
      }
      $scope.viewConversation = function(feedItem) {
        $scope.feedItemConversation = feedItem;
        $scope.showConversationPane(true);
      }
      $scope.watchKeysForDeleteModal = function(ev) {
        var keyCode = ev.keyCode || ev.charCode;

        switch(keyCode) {
          case 13: $scope.deleteFeedItemNow(); break;
          case 27: $scope.dismissDeleteModal(); break;
        }
      }

      function init() {
        $scope.updateContainerHeight();
        $(window).on('resize', $scope.updateContainerHeight.bind(this));

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
