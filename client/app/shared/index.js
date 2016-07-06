import User from './user.service';
import Venue from './venue.service';
import Utils from './utils.service';
import Labels from './label.service';
import Item from './item.service';
import Filters from './filters';

export default angular.module("PreodayServices" , [Filters])
  .service(User.UID, User)
  .service(Venue.UID, Venue)
  .service(Utils.UID, Utils)
  .service(Labels.UID, Labels)
  .service(Item.UID, Item)
  .name;
