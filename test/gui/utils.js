var fs = require('fs');

var Utils = function(){

  var EC = protractor.ExpectedConditions;

  this.getTimeLabel = function(){
    var d = new Date;
    return d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + ':' + d.getMilliseconds();
  };

  this.waitToClick = function(elm){
    browser.wait(EC.presenceOf(elm), 10000, 'Element is not present: ' + elm.locator());
    browser.wait(EC.visibilityOf(elm),10000,'The element is still not visible: ' + elm.locator());
    browser.wait(EC.elementToBeClickable(elm),10000,'The element is still not clickable: ' + elm.locator());
    elm.click();
  };

  this.waitElementPresence = function(elm){
    browser.wait(EC.presenceOf(elm), 10000, 'Element is not present: ' + elm.locator());
  }

  this.waitToSendKeys = function (elm, content){
    //browser.wait(EC.elementToBeClickable(elm),10000,'The element is still not clickable: ' + elm.locator());
    browser.wait(EC.visibilityOf(elm),10000,'The element is still not visible: ' + elm.locator());
    elm.clear();
    elm.sendKeys(content);
  };

  this.waitDisappear = function(elm){
    browser.wait(EC.not(EC.presenceOf(elm)),10000,'The element is still present: ' + elm.locator());
  };

  /****
   Wait until a given element is present and visible;
   ****/
  this.waitUntilReady = function(elm) {
    browser.wait(EC.presenceOf(elm), 10000, 'Element is not present: ' + elm.locator());
    browser.wait(EC.visibilityOf(elm),10000,'The element is still not visible: ' + elm.locator());
    browser.wait(EC.elementToBeClickable(elm),10000,'The element is still not clickable: ' + elm.locator());    
  };

  //Save a screeshot named timestamp and the given name into /tmp/screenshots folder
  this.takeScreenshot = function(filename){
    browser.takeScreenshot().then(function(png) {
      var d = new Date().getTime()
      d = filename ? d+"-" +filename : d ;

      var stream = fs.createWriteStream('/tmp/screenshots/' + d + '.png');
      stream.write(new Buffer(png, 'base64'));
      stream.end();
    });
  };

};


module.exports = Utils;
