// Import Style
import './venueLocation.scss';


import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './venueLocation.controller';
import routes from './venueLocation.routes';
import run from './venueLocation.run';

import config from './venueLocation.config';


export default angular.module("venueLocation" , [uirouter])
.config(config)
  .config(routes)
.run(run)
  .controller(controller.UID, controller)
  .name;
