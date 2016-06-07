// Import Style
import './voucherSettings.scss';


import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './voucherSettings.controller';
import routes from './voucherSettings.routes';
import run from './voucherSettings.run';

import config from './voucherSettings.config';


export default angular.module("voucherSettings" , [uirouter])
.config(config)
  .config(routes)
.run(run)
  .controller(controller.UID, controller)
  .name;
