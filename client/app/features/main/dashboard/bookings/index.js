// Import Style
import './bookings.scss';


import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './bookings.controller';
import routes from './bookings.routes';

import v2BookingList from './bookingList';
import v2BookingMenus from './bookingMenus';
import v2BookingSettings from './bookingSettings';


export default angular.module("bookings" , [uirouter, v2BookingList, v2BookingMenus, v2BookingSettings])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
