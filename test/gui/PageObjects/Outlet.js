'use strict';

var Utils = require('../utils.js');
var utils = new Utils();

var Settings = require('../settings.js');
var settings = new Settings();

var Outlet = function (){
  //var homeUrl = mainUrl;

  var self = this;
  var EC = protractor.ExpectedConditions;

  var addNewButton = element(by.css('button[aria-label="Add New"]'));
  var outletNameTextField = element(by.css('input[name="entityName"]'));
  var outletDescriptionTextField = element(by.css('input[name="entityDescription"]'));
  var outletDirectionsTextField = element(by.css('input[name="entityDirections"]'));
  var doneButton = element(by.css('.main-content-right button[aria-label="Done"]'));

  this.addNewOutlet = function(outletName, outletDescription, outletDirections, outletMenu){
    utils.waitToClick(addNewButton);
    utils.waitToSendKeys(outletNameTextField, outletName);
    utils.waitToSendKeys(outletDescriptionTextField, outletDescription);
    utils.waitToSendKeys(outletDirectionsTextField, outletDirections);
    var outletMenuRadioButton = element(by.cssContainingText('md-radio-button.md-primary.ng-scope', outletMenu));
    utils.waitToClick(outletMenuRadioButton);
    utils.waitToClick(doneButton);
    utils.waitDisappear(doneButton);
  }

};

module.exports = Outlet;
