// Import Style
import './voucherSettings.scss';


// Import internal modules
import controller from './voucherSettings.controller';
import routes from './voucherSettings.routes';
import run from './voucherSettings.run';

import config from './voucherSettings.config';


export default angular.module("voucherSettings" , ['ui.router'])
.config(config)
  .config(routes)
.run(run)
  .controller(controller.UID, controller)
  .name;
