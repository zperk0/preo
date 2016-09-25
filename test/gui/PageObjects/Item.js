'use strict';

var Utils = require('../utils.js');
var utils = new Utils();

var Settings = require('../settings.js');
var settings = new Settings();

var Item = function (){
  var self = this;
  var EC = protractor.ExpectedConditions;

  var addNewButton = element(by.css('button[aria-label="Add Item"]'));

  var itemNameTextField = element(by.css('input[name="entityName"]'));
  var itemDescriptionTextField = element(by.css('textarea[name="entityDescription"]'));
  var singleSizeRadioButton = element(by.css('md-radio-button[aria-label="Single Size"]'));
  var multipleSizesRadioButton = element(by.css('md-radio-button[aria-label="Multiple Sizes"]'));
  var singleSizePriceTextField = element(by.css('input[name="entityPrice"]'));
  var addSizeButton = element(by.css('button[aria-label="Add size"]'));
  var sizeNameTextFields = element.all(by.css('input[name="sizeName"][aria-invalid="true"]'));  
  var sizePriceTextFields = element.all(by.css('input[name="sizePrice"]'));
  var doneButton = element(by.css('.main-content-right button[aria-label="Done"]'));

  this.addNewItem = function(itemName, itemDescription, singleOrMultipleSize, numberOfSizes, sizeName, sizePrice){
    utils.waitToClick(addNewButton);
    utils.waitToSendKeys(itemNameTextField, itemName);
    utils.waitToSendKeys(itemDescriptionTextField, itemDescription);
    if (singleOrMultipleSize == 'single') {
      utils.waitToClick(singleSizeRadioButton);
      utils.waitToSendKeys(singleSizePriceTextField, sizePrice);
      numberOfSizes = 1;
    } else if (singleOrMultipleSize == 'multiple') {
      utils.waitToClick(multipleSizesRadioButton);
      for (var i = numberOfSizes-2; i >= 1; i--) {
        utils.waitToClick(addSizeButton);
        console.log(i);      
      };
      sizeNameTextFields.then(function(items) {
        expect(items.length).toBe(parseInt(numberOfSizes));
        for (var i = numberOfSizes-1; i >= 0; i--) {
          utils.waitToSendKeys(items[i], sizeName);
        };
      });
      sizePriceTextFields.then(function(items) {
        expect(items.length).toBe(parseInt(numberOfSizes));
        for (var i = numberOfSizes-1; i >= 0; i--) {
          utils.waitToSendKeys(items[i], sizePrice);
        };
      });
    };
    utils.waitToClick(doneButton);
    utils.waitDisappear(doneButton);
  }

};

module.exports = Item;
