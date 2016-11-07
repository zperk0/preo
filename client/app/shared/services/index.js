import User from './user/user.service';
import Venue from './venue/venue.service';
import Utils from './utils/utils.service';
import Labels from './label/label.service';
import Item from './item/item.service';
import Modifier from './modifier/modifier.service';
import Outlet from './outlet/outlet.service';
import OutletLocation from './outlet/outlet-location.service';
import Menu from './menu/menu.service';
import Feature from './feature/feature.service';
import CollectionSlot from './events/collectionSlot.service';
import Event from './events/event.service';
import EventSchedule from './events/eventSchedule.service';
import DateUtils from './dateUtils/dateUtils.service';
import Taxes from './taxes/taxes.service';
import StyleService from './style/style.service';
import deliveryZones from './deliveryZones/deliveryZones.service';
import Maps from './maps/maps.service';

export default angular.module("Services" , ['ui.router'])
  .service(User.UID, User)
  .service(Venue.UID, Venue)
  .service(Utils.UID, Utils)
  .service(Labels.UID, Labels)
  .service(Item.UID, Item)
  .service(Modifier.UID, Modifier)
  .service(Outlet.UID, Outlet)
  .service(OutletLocation.UID, OutletLocation)
  .service(Menu.UID, Menu)
  .service(Feature.UID, Feature)
  .service(CollectionSlot.UID, CollectionSlot)
  .service(Event.UID, Event)
  .service(StyleService.UID, StyleService)
  .service(Maps.UID, Maps)
  .service(deliveryZones.UID, deliveryZones)
  .service(Taxes.UID, Taxes)
  .service(EventSchedule.UID, EventSchedule)
  .service(DateUtils.UID, DateUtils)
  .name;
