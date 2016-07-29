import base from '../../app.base';

import User from './user/user.service';
import Venue from './venue/venue.service';
import Utils from './utils/utils.service';
import Labels from './label/label.service';
import Item from './item/item.service';
import Modifier from './modifier/modifier.service';
import Outlet from './outlet/outlet.service';
import OutletLocation from './outlet/outlet-location.service';

import uirouter from 'angular-ui-router';

export default angular.module("Services" , [base, uirouter])
  .service(User.UID, User)
  .service(Venue.UID, Venue)
  .service(Utils.UID, Utils)
  .service(Labels.UID, Labels)
  .service(Item.UID, Item)
  .service(Modifier.UID, Modifier)
  .service(Outlet.UID, Outlet)
  .service(OutletLocation.UID, OutletLocation)
  .name;
