// Import Style
import './redirect.scss';


import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './redirect.controller';
import routes from './redirect.routes';
import run from './redirect.run';

import config from './redirect.config';


export default angular.module("redirect" , [uirouter])
.config(config)
  .config(routes)
.run(run)
  .controller(controller.UID, controller)
  .name;
