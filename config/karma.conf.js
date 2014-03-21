module.exports = function(config){
  config.set({
    basePath : '../',

    files : [
      'www/libs.js',
      'www/module.js',
      'www/ng-templates.js',
      'test/lib/**/*.js',
      'test/unit/**/*.js'
    ],

    exclude : [
      'test/lib/angular/angular-scenario.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-script-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }
  });
};
