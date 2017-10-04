import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './notes.controller';
import routes from './notes.routes';

export default angular.module("notes" , [uirouter])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
