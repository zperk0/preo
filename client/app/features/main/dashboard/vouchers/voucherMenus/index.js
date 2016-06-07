// Import Style
import './voucherMenus.scss';


import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './voucherMenus.controller';
import routes from './voucherMenus.routes';
import run from './voucherMenus.run';

import config from './voucherMenus.config';


export default angular.module("voucherMenus" , [uirouter])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
