
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './customTagList.controller';
import routes from './customTagList.routes';


export default angular.module("customTagListView" , [uirouter])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
