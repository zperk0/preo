// Import Style
import './eventScheduleForm.scss';


// Import internal modules
import controller from './eventScheduleForm.controller';
import directive from './eventScheduleForm.directive';


export default angular.module("eventScheduleForm" , [])

  .controller(controller.UID, controller)
  .directive("eventScheduleForm", directive)
  .name;
