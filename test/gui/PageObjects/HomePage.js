'use strict';

var Utils = require('../utils.js');
var utils = new Utils();

var Settings = require('../settings.js');
var settings = new Settings();

var HomePage = function (){
  //var homeUrl = mainUrl;

  var self = this;
  var EC = protractor.ExpectedConditions;

  var usernameField = element(by.css("input[name='username']"));
  var passwordField = element(by.css("input[name='password']"));
  var signInButton = element(by.buttonText('Sign In'));

  var loadingMask = element(by.css('.spinner-wrapper'));

  var menusButton = element(by.css('.md-button.md-ink-ripple[aria-label="Open Menus interactions menu"]'));
  var myMenusButton = element(by.css('.md-button.ng-scope[title="My menus"]'));
  var itemsButton = element(by.css('button.md-button.ng-scope[title="Items"]'));
  var modifiersButton = element(by.css('.md-button.ng-scope[title="Modifiers"]'));
  var outletsButton = element(by.css('.md-button.md-ink-ripple[aria-label="Open Outlets interactions menu"]'));
  var myOutletsButton = element(by.css('.md-button.ng-scope[title="My Outlets"]'));
  var outletLocationsButton = element(by.css('.md-button.ng-scope[title="Outlet Locations"]'));

  this.doLogin = function(username, password) {
    utils.waitToSendKeys(usernameField, username);
    utils.waitToSendKeys(passwordField, password);
    utils.waitToClick(signInButton);
    utils.waitDisappear(signInButton);
  }

  this.waitLoaderLeave = function() {
    browser.wait(EC.invisibilityOf(loadingMask), 10000, 'Loader is still on the screen');
    //browser.wait(EC.invisibilityOf(loadingOverlay), 5000, 'Overlay is still on the screen');
  };

  this.goToMyMenus = function(){
    this.waitLoaderLeave();
    utils.waitToClick(menusButton);
    utils.waitToClick(myMenusButton);
    this.waitLoaderLeave();
    utils.waitToClick(menusButton);
  }

  this.goToItems = function(){
    this.waitLoaderLeave();
    utils.waitToClick(menusButton);
    utils.waitToClick(itemsButton);
    this.waitLoaderLeave();
    utils.waitToClick(menusButton);
  }

  this.goToModifiers = function(){
    this.waitLoaderLeave();
    utils.waitToClick(menusButton);
    utils.waitToClick(modifiersButton);
    this.waitLoaderLeave();
    utils.waitToClick(menusButton);
  }

  this.goToMyOutlets = function(){
    this.waitLoaderLeave();
    utils.waitToClick(outletsButton);
    utils.waitToClick(myOutletsButton);
    this.waitLoaderLeave();
    utils.waitToClick(outletsButton);
  }

  this.goToOutletLocations = function(){
    this.waitLoaderLeave();
    utils.waitToClick(outletsButton);
    utils.waitToClick(outletLocationsButton);
    this.waitLoaderLeave();
    utils.waitToClick(outletsButton);
  }


  this.selectDay = function(day){
    utils.waitUntilReady(dayDropdown);
    var dayElement = element(by.cssContainingText("div[name='day'] li[ng-repeat='option in collection']", day));
    dayElement.isPresent().then(function(exists){
        if (!exists && day == 'Today') {
          dayElement = element(by.cssContainingText("div[name='day'] li[ng-repeat='option in collection']", 'Tomorrow'))
        }
        utils.waitElementPresence(dayElement);
        dayElement.click();
      })
  };

  this.selectTime = function(time){
    utils.waitUntilReady(this.timeDropdown);
    var timeElement = element(by.cssContainingText("div[name='time'] li[ng-repeat='option in collection']", time));
    timeElement.isPresent().then(function(exists){
      if (!exists) {
        timeElement = element(by.cssContainingText("div[name='time'] li[ng-repeat='option in collection']", '23:45'));
      };
      utils.waitElementPresence(timeElement);
      timeElement.click();
    })    
  };

  this.selectCard = function(card){
    utils.waitUntilReady(cardDropdown);
    var cardElement = element(by.cssContainingText("div[name='card'] li[ng-repeat='option in collection']", card));
    utils.waitElementPresence(cardElement);
    cardElement.getText().then(function(text) {
      if (text == card) {
        cardElement.click();
      }
    })
  };

  this.selectAddress = function(address){
    utils.waitUntilReady(addressDropdown);
    var addressElement = element(by.cssContainingText("div[name='address'] li[ng-repeat='option in collection']", address));
    utils.waitElementPresence(addressElement);
    addressElement.click();
  };

  var placeOrderButton = element(by.buttonText('Place My Order'));



  this.selectCollectionSlot = function(slot) {
    utils.waitUntilReady(dayDropdown);
    var slotElement = element(by.cssContainingText("div[name='day'] li[ng-repeat='option in collection']", slot));
    utils.waitElementPresence(slotElement);
    slotElement.click();
  }

  this.selectService = function(service) {
    if (service == 'collection') {
      utils.waitToClick(collectionRadioButton);
      this.waitLoaderLeave();
    } else if (service == 'delivery') {
      utils.waitToClick(deliveryRadioButton);
      this.waitLoaderLeave();
    };
  }

  this.fillServiceInformation = function(service, day, time, address) {
    this.waitLoaderLeave();
    if (service == 'event') {
      this.selectCollectionSlot(day); //day = collectionSlot
    } else {
      this.selectService(service);
      this.selectDay(day);
      this.selectTime(time);
      if (service == 'delivery') {
        this.selectAddress(address);
      };
    }
  }

  this.fillPaymentInformation = function(paymentMode, cardNumber) {
    this.waitLoaderLeave();
    if (paymentMode == 'cash') {
      utils.waitToClick(cashRadioButton);
    } else if (paymentMode == 'card') {
      utils.waitToClick(cardRadioButton);
      this.selectCard(cardNumber);
    };
  }

  this.placeOrder = function() {
    this.waitLoaderLeave();
    utils.waitToClick(placeOrderButton);
    utils.waitDisappear(placeOrderButton);
  }

};

module.exports = HomePage;
