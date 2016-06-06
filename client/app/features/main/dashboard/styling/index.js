// Import Style
import './styling.scss';


import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './styling.controller';
import routes from './styling.routes';

import mobile from './mobile';
import emails from './emails';
import weborders from './weborders';

export default angular.module("styling" , [uirouter, mobile, emails, weborders])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
