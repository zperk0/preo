
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './myTags.controller';
import routes from './myTags.routes';


export default angular.module("myTags" , [uirouter])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
