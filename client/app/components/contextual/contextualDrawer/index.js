// Import Style

import './contextualDrawer.scss';

// Import internal modules
import service from './contextualDrawer.service';

import controller from './items/contextualDrawer.items.controller';
import directive from './items/contextualDrawer.items.directive';

import modController from './modifiers/contextualDrawer.modifiers.controller';
import modDirective from './modifiers/contextualDrawer.modifiers.directive';

import outletsController from './outlets/contextualDrawer.outlets.controller';
import outletsDirective from './outlets/contextualDrawer.outlets.directive';

import outletLocationsController from './outletLocations/contextualDrawer.outletLocations.controller';
import outletLocationsDirective from './outletLocations/contextualDrawer.outletLocations.directive';

import eventOutletLocationsController from './eventOutletLocations/contextualDrawer.eventOutletLocations.controller';
import eventOutletLocationsDirective from './eventOutletLocations/contextualDrawer.eventOutletLocations.directive';

import deliveryZonesController from './deliveryZones/contextualDrawer.deliveryZones.controller';
import deliveryZonesDirective from './deliveryZones/contextualDrawer.deliveryZones.directive';

import venueDetailsController from './venueDetails/contextualDrawer.venueDetails.controller';
import venueDetailsDirective from './venueDetails/contextualDrawer.venueDetails.directive';

import deliveryZonesEditController from './deliveryZonesEdit/contextualDrawer.deliveryZonesEdit.controller';
import deliveryZonesEditDirective from './deliveryZonesEdit/contextualDrawer.deliveryZonesEdit.directive';

import styleController from './style/contextualDrawer.style.controller';
import styleDirective from './style/contextualDrawer.style.directive';
import styleEmailsController from './style/contextualDrawer.styleEmails.controller';
import styleEmailsDirective from './style/contextualDrawer.styleEmails.directive';
import styleRowDirective from './style/row/contextualDrawer.style-row.directive';

import eventsImportController from './eventsImport/contextualDrawer.eventsImport.controller';
import eventsImportDirective from './eventsImport/contextualDrawer.eventsImport.directive';

import cardItemList from '../../cardItemList';


export default angular.module("contextualDrawer" , [cardItemList])
  .service(service.UID, service)

  .controller(controller.UID, controller)
  .directive("contextualDrawerItem", directive)

  .controller(modController.UID, modController)
  .directive("contextualDrawerModifier", modDirective)

  .controller(outletsController.UID, outletsController)
  .directive("contextualDrawerOutlets", outletsDirective)

  .controller(outletLocationsController.UID, outletLocationsController)
  .directive("contextualDrawerOutletLocations", outletLocationsDirective)

  .controller(eventOutletLocationsController.UID, eventOutletLocationsController)
  .directive("contextualDrawerEventOutletLocations", eventOutletLocationsDirective)

  .controller(deliveryZonesController.UID, deliveryZonesController)
  .directive("contextualDrawerDeliveryZones", deliveryZonesDirective)

  .controller(venueDetailsController.UID, venueDetailsController)
  .directive("contextualDrawerVenueDetails", venueDetailsDirective)

  .controller(deliveryZonesEditController.UID, deliveryZonesEditController)
  .directive("contextualDrawerDeliveryZonesEdit", deliveryZonesEditDirective)

  .controller(styleController.UID, styleController)
  .directive("contextualDrawerStyle", styleDirective)

  .controller(styleEmailsController.UID, styleEmailsController)
  .directive("contextualDrawerStyleEmails", styleEmailsDirective)

  .directive("drawerStyleRow", styleRowDirective)

  .controller(eventsImportController.UID, eventsImportController)
  .directive("contextualDrawerEventsImport", eventsImportDirective)

  .name;
