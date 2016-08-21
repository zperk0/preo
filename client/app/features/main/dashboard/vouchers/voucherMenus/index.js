// Import Style
import './voucherMenus.scss';


// Import internal modules
import controller from './voucherMenus.controller';
import routes from './voucherMenus.routes';
import run from './voucherMenus.run';

import config from './voucherMenus.config';


export default angular.module("voucherMenus" , ['ui.router'])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
