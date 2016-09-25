// conf.js
exports.config = {
  framework: 'jasmine',
  //seleniumServerJar: '/usr/local/lib/node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-2.53.1.jar',
  //chromeDriver: './selenium/chromedriver',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['spec.js'],
  //chromeOnly: true,
  params: {
  	env: 'demo'
  },
  capabilities: {
    browserName: 'chrome'
  },

  onPrepare: function() {
     browser.driver.manage().window().maximize();
  },

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 300000,
    isVerbose: true,
    keepAlive: true,
    includeStackTrace: true
  }
}
