// Import Style
import './payments.scss';


// Import internal modules
import controller from './payments.controller';
import routes from './payments.routes';

import v2AppMode from './appMode';
import v2PaymentMethods from './paymentMethods';

angular.module("payments" , ['ui.router', v2AppMode, v2PaymentMethods])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
