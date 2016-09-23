// Import Style
import './eventSchedule.scss';


// Import internal modules
import controller from './eventSchedule.controller';
import directive from './eventSchedule.directive';



export default angular.module("eventSchedule" , [])


  .controller(controller.UID, controller)
  .directive("eventSchedule", directive)
  .name;
