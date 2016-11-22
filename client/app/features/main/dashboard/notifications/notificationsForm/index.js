// Import Style
import './notificationsForm.scss';


// Import internal modules
import controller from './notificationsForm.controller';
import directive from './notificationsForm.directive';
import notificationDirective from './notification.directive';



export default angular.module("notificationsForm" , [])


  .controller(controller.UID, controller)
  .directive("notificationsForm", directive)
  .directive("notification", notificationDirective)
  .name;
