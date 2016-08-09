// Import Style
import './outletLocations.scss';


import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './outletLocations.controller';
import routes from './outletLocations.routes';

import services from '../../../../../shared';

export default angular.module("outletLocations" , [uirouter, services])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
