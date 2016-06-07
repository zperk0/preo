// Import Style
import './payments.scss';


import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './payments.controller';
import routes from './payments.routes';

import v2AppMode from './appMode';
import v2PaymentMethods from './paymentMethods';

export default angular.module("payments" , [uirouter, v2AppMode, v2PaymentMethods])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
