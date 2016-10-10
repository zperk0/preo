// Import Style
import './eventScheduleList.scss';


// Import internal modules
import controller from './eventScheduleList.controller';
import directive from './eventScheduleList.directive';

export default angular.module("eventScheduleList" , ['cardItemList'])


  .controller(controller.UID, controller)
  .directive("eventScheduleList", directive)
  .name;
