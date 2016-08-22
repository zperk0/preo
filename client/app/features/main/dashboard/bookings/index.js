// Import Style
import './bookings.scss';


// Import internal modules
import controller from './bookings.controller';
import routes from './bookings.routes';

import v2BookingList from './bookingList';
import v2BookingMenus from './bookingMenus';
import v2BookingSettings from './bookingSettings';


  angular.module("webapp.bookings" , ['ui.router', v2BookingList, v2BookingMenus, v2BookingSettings])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
