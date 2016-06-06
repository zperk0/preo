// Import Style
import './dashboard.scss';


import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './dashboard.controller';
import routes from './dashboard.routes';

import v2Bookings from './bookings';
import v2Events from './events';
import v2Menus from './menus';
import v2Notifications from './notifications';
import v2Outlets from './outlets';
import v2Payments from './payments';
import v2Promotions from './promotions';
import v2Styling from './styling';
import v2venueSettings from './venueSettings';
import v2Vouchers from './vouchers';


//Directives


export default angular.module("dashboard" , [uirouter,
  v2Bookings, v2Events, v2Menus, v2Notifications, v2Outlets, v2Payments, v2Promotions, v2Styling, v2venueSettings, v2Vouchers])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
