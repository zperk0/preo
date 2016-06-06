// Import Style
import './venueSettings.scss';


import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './venueSettings.controller';
import routes from './venueSettings.routes';

export default angular.module("venueSettings" , [uirouter])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
