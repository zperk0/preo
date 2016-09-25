'use strict';

var Utils = require('../utils.js');
var utils = new Utils();

var Settings = require('../settings.js');
var settings = new Settings();

var Modifier = function (){
  //var homeUrl = mainUrl;

  var self = this;
  var EC = protractor.ExpectedConditions;

  var addNewButton = element(by.css('button[aria-label="Add New"]'));

  var modifierNameTextField = element(by.css('input[name="entityName"]'));
  var optionalRadioButton = element(by.css('md-radio-button[aria-label="Optional"]'));
  var mandatoryRadioButton = element(by.css('md-radio-button[aria-label="Mandatory"]'));
  var minSelectionTextField = element(by.id('minChoices'));
  var maxSelectionTextField = element(by.id('maxChoices'));
  var addOptionButton = element(by.css('button[aria-label="Add option"]'));
  var optionNameTextFields = element.all(by.css('input[name="itemName"]'));
  var optionPriceTextFields = element.all(by.css('input[name="itemPrice"]'));
  var doneButton = element(by.css('.main-content-right button[aria-label="Done"]'));

  this.addNewModifier = function(modifierName, optionalOrMandatory, maxChoices, minChoices, numberOfOptions, optionName, optionPrice){
    browser.sleep(5000);
    utils.waitToClick(addNewButton);
    utils.waitToSendKeys(modifierNameTextField, modifierName);
    if (optionalOrMandatory == 'optional') {
      utils.waitToClick(optionalRadioButton);
      utils.waitToSendKeys(maxSelectionTextField, maxChoices);
    } else if (optionalOrMandatory == 'mandatory') {
      utils.waitToClick(mandatoryRadioButton);
      utils.waitToSendKeys(maxSelectionTextField, maxChoices);
      utils.waitToSendKeys(minSelectionTextField, minChoices);
    };
    for (var i = numberOfOptions; i > 1; i--) {
      utils.waitToClick(addOptionButton);      
    };
    optionNameTextFields.then(function(items) {
      expect(items.length).toBe(parseInt(numberOfOptions));
      for (var i = numberOfOptions-1; i >= 0; i--) {
        utils.waitToSendKeys(items[i], optionName);
      };
    });
    optionPriceTextFields.then(function(items) {
      expect(items.length).toBe(parseInt(numberOfOptions));
      for (var i = numberOfOptions-1; i >= 0; i--) {
        utils.waitToSendKeys(items[i], optionPrice);
      };
    });
    utils.waitToClick(doneButton);
    utils.waitDisappear(doneButton);
  }

};

module.exports = Modifier;
