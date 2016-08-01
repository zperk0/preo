// Import Style
import './outlets.scss';


import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './outlets.controller';
import routes from './outlets.routes';

import outletList from './components/outletList'; //required for drawer
import outletLocationList from './components/outletLocationList'; //required for drawer
import outletLocation from './components/outletLocationList/outletLocation'; //required for drawer
import outletLocationGroup from './components/outletLocationGroup'; //required for drawer
import outletLocations from './outletLocations'; //required for drawer

export default angular.module("outlets" , [uirouter, outletList, outletLocationList, outletLocationGroup, outletLocation, outletLocations])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
