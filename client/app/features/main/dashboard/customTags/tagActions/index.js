import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './tagActions.controller';
import routes from './tagActions.routes';


export default angular.module("tagActions" , [uirouter])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
