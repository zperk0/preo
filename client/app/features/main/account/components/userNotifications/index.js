// Import Style
import './userNotifications.scss';


// Import internal modules
import controller from './userNotifications.controller';
import directive from './userNotifications.directive';



export default angular.module("userNotifications" , [])


  .controller(controller.UID, controller)
  .directive("userNotifications", directive)
  .name;
