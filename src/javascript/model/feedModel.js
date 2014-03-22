(function(){
  module.exports = ['$rootScope', 'appGlobals', 'feedItem', function($rootScope, appGlobals, feedItem) {
    var now = new Date().getTime();

    return [
      new $rootScope.FeedItem(
        appGlobals.getUserById(10),
        now - (5*60*60*1000),
        "Does anyone have recent customer testimonials for the new Southbend ranges? I've got a meeting later today with Moderna Bistro. Thanks.",
        [
          new $rootScope.FeedItem(
            appGlobals.getUserById(30),
            now - (5*60*1000),
            "You should reach out to Frank"
            ),
          new $rootScope.FeedItem(
            appGlobals.getUserById(40),
            now - (5*60*1000) - (15*1000),
            "Maybe Carol knows?"
            )
        ]
        ),
      new $rootScope.FeedItem(
        appGlobals.getUserById(20),
        now - (2*24*60*60*1000),
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor."
        ),
      new $rootScope.FeedItem(
        appGlobals.getUserById(30),
        now - (6*24*60*60*1000),
        "Collaboratively brand high-quality services rather than intermandated web services. Credibly engage long-term high-impact sources and principle-centered channels. Authoritatively e-enable bleeding-edge networks whereas error-free vortals.",
        [
          new $rootScope.FeedItem(
            appGlobals.getUserById(10),
            now - (2*24*60*60*1000),
            "Collaboratively deliver premium resources whereas one-to-one ideas?"
            ),
          new $rootScope.FeedItem(
            appGlobals.getUserById(40),
            now - (2*24*60*60*1000) + (1*60*60*1000),
            "Credibly unleash interdependent solutions via bleeding-edge processes!"
            ),
          new $rootScope.FeedItem(
            appGlobals.getUserById(30),
            now - (2*24*60*60*1000) + (5*60*1000),
            "Dynamically envisioneer unique channels and clicks-and-mortar paradigms. Efficiently brand resource-leveling process improvements whereas interoperable core competencies."
            )
        ]
        ),
      new $rootScope.FeedItem(
        appGlobals.getUserById(40),
        now - (9*24*60*60*1000),
        "Uniquely embrace cross-platform content before principle-centered action items. Seamlessly streamline frictionless action items via multimedia based leadership. Objectively expedite top-line quality vectors with proactive data."
        ),
      new $rootScope.FeedItem(
        appGlobals.getUserById(20),
        now - (60*24*60*60*1000),
        "Rapidiously integrate equity invested initiatives and principle-centered supply chains. Proactively mesh technically sound e-markets rather than standardized systems. Enthusiastically orchestrate best-of-breed expertise via enterprise-wide e-markets. "
        )
    ];
  }];
}).call(this);