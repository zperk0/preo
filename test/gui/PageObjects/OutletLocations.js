'use strict';

var Utils = require('../utils.js');
var utils = new Utils();

var Settings = require('../settings.js');
var settings = new Settings();

var OutletLocations = function (){
  //var homeUrl = mainUrl;

  var self = this;
  var EC = protractor.ExpectedConditions;

  var addNewButton = element(by.css('button[aria-label="Add New"]'));
  var outletLocationNameTextField = element(by.css('input[name="entityName"]'));
  var numberedLocationsCheckbox = element(by.css('md-checkbox[aria-label="Individially numbered locations"]'));
  var startNumberTextField = element(by.css('input[aria-label="Start number"]'));
  var endNumberTextField = element(by.css('input[aria-label="End number"]'));
  var doneButton = element(by.css('.main-content-right button[aria-label="Done"]'));

  //var moreButton = element(by.css('button[aria-label="more_horiz"]'));
  var deleteOutletButton = element(by.css('button[aria-label="delete"]'));
  var addSubGroupButton = element(by.css('button[aria-label="add"]'));
  var confirmDeleteOutletButton = element(by.css('button.md-primary.md-button.md-ink-ripple[aria-label="Delete"]'));

  var addOutletButton = element(by.css('button[aria-label="Add outlets"]'));

  var loadingMask = element(by.css('.spinner-wrapper'));

  this.waitLoaderLeave = function() {
    browser.wait(EC.invisibilityOf(loadingMask), 10000, 'Loader is still on the screen');
  };

  this.addNewOutletLocation = function(outletLocationName, isNumbered, startNumber, endNumber){
    utils.waitToClick(addNewButton);
    utils.waitToSendKeys(outletLocationNameTextField, outletLocationName);
    if (isNumbered) {
      utils.waitToClick(numberedLocationsCheckbox);
      utils.waitToSendKeys(startNumberTextField, startNumber);
      utils.waitToSendKeys(endNumberTextField, endNumber);
    }
    utils.waitToClick(doneButton);
    utils.waitDisappear(doneButton);
  }

  this.clickOutletLocationMoreButton = function(outletLocationName){
    var outletLocationRow = element(by.cssContainingText('.card-title.ng-scope.ng-isolate-scope.layout-align-start-center.layout-row', outletLocationName));
    utils.waitToClick(outletLocationRow.element(by.css('button[aria-label="more_horiz"')));
    //it has to wait the elements animation
    browser.sleep(500);
  };

  this.deleteOutletLocation = function(outletLocationName){   
    this.clickOutletLocationMoreButton(outletLocationName);
    utils.waitToClick(deleteOutletButton);
    utils.waitToClick(confirmDeleteOutletButton);
    utils.waitDisappear(confirmDeleteOutletButton);
  };

  this.addOutletToLocation = function(outletName, outletLocationName){
    this.waitLoaderLeave();
    utils.waitToClick(addOutletButton);
    var outletToAdd = element(by.cssContainingText('div.outlet-list div.card-title.ng-scope.ng-isolate-scope.layout-align-start-center.layout-row', outletName));
    var targetLocation = element(by.cssContainingText('.card-title.ng-scope.ng-isolate-scope.layout-align-start-center.layout-row', outletLocationName));
    utils.waitUntilReady(outletToAdd);
    //browser.actions().dragAndDrop(outletToAdd,targetLocation).mouseUp().perform();
    browser.actions().mouseDown(outletToAdd).perform();
    browser.sleep(500);
    browser.actions().mouseMove(targetLocation).perform();
    browser.actions().mouseUp().perform();
    this.waitLoaderLeave();    
  }

  this.addSubGroupToOutletLocation = function(outletLocationName, subGroupName){
    this.clickOutletLocationMoreButton(outletLocationName);
    utils.waitToClick(addSubGroupButton);
    utils.waitToSendKeys(outletLocationNameTextField, subGroupName);
    utils.waitToClick(doneButton);
    utils.waitDisappear(doneButton);
  }

  this.goToSubGroup = function(subGroupName){
    var subGroupBreadcrumbLink = element(by.linkText(subGroupName));
    utils.waitToClick(subGroupBreadcrumbLink);
  }

};

module.exports = OutletLocations;
