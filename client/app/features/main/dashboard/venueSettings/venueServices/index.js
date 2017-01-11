// Import Style
import './venueServices.scss';

// Import internal modules
import controller from './venueServices.controller';
import routes from './venueServices.routes';

import deliverySettingsFields from './components/deliverySettingsFields';

export default angular.module("venueServices" , ['ui.router', deliverySettingsFields])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
