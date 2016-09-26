// spec.js
var HomePage = require('./PageObjects/HomePage.js');
var home = new HomePage();

var Modifier = require('./PageObjects/Modifier.js');
var modifier = new Modifier();

var Item = require('./PageObjects/Item.js');
var item = new Item();

var OutletLocations = require('./PageObjects/OutletLocations.js');
var outletLocations = new OutletLocations();

var Outlet = require('./PageObjects/Outlet.js');
var outlet = new Outlet();

var Settings = require('./settings.js');
var settings = new Settings();

describe('Web App V2', function() {

  beforeEach(function(done) {
    browser.ignoreSynchronization = true;
    done();
  });

  it('Should create a complete menu with items and modifiers', function(done) {
    browser.get(settings.mainUrl);
    home.doLogin(settings.username, settings.password);
    // home.goToMyMenus();
    // browser.sleep(3000);

    // items done
    // home.goToItems();
    //item.addNewItem(itemName, itemDescription, singleOrMultipleSize, numberOfSizes, sizeName, sizePrice);
    //item.addNewItem('itemName', 'itemDescription', 'single', '1', 'sizeName', '4.44');
    // item.addNewItem('itemName4', 'itemDescription4', 'multiple', '3', 'sizeName', '7.79');
    // browser.sleep(3000);
    
    // modifiers done
    //home.goToModifiers();
    // //menu.addNewModifier(modifierName, optionalOrMandatory, maxChoices, minChoices, numberOfOptions, optionName, optionPrice);
    //menu.addNewModifier('modifierName', 'optional', '2', '', '2', 'optionName', '9.99');    
    //modifier.addNewModifier('modifierName', 'mandatory', '3', '1', '3', 'optionName', '5.55');
    //browser.sleep(3000);

    // home.goToMyOutlets();
    // //outlet.addNewOutlet = function(outletName, outletDescription, outletDirections, outletMenu);
    // outlet.addNewOutlet('outletName', 'outletDescription', 'outletDirections', 'mymenuEdited');
    // //outlet.addNewOutlet = function(outletName, outletDescription, outletDirections, outletMenu);
    // browser.sleep(3000);

    home.goToOutletLocations();
    //outletLocations.addNewOutletLocation(outletLocationName, isNumbered, startNumber, endNumber);
    // outletLocations.addNewOutletLocation('myAutomatedTestOutletLocation', false, '', '');
    // outletLocations.addSubGroupToOutletLocation('myAutomatedTestOutletLocation', 'First Auto Subgroup');
    // outletLocations.addNewOutletLocation('Sub Outlet Location', false, '', '');
    // outletLocations.addSubGroupToOutletLocation('Sub Outlet Location', 'Second Auto Subgroup');
    // outletLocations.addNewOutletLocation('Sub Sub Outlet Location', true, '1', '25');
    // outletLocations.addNewOutletLocation('Sub Sub Outlet Location', true, '26', '50');
    // outletLocations.addNewOutletLocation('Sub Sub Outlet Location', true, '51', '100');
    // outletLocations.goToSubGroup('Please choose your venue!');
    // outletLocations.deleteOutletLocation('myAutomatedTestOutletLocation');
    // browser.sleep(3000);
    // expect(true).toBe(true);
    outletLocations.addOutletToLocation('Cinema', 'AUTOTEST');
    // outletLocations.addOutletToLocation('Collection Point A ', 'AUTOTEST');
    //expect(checkout.orderConfirmation.getText()).toContain("Thanks for your order");
    done();
  });


});
