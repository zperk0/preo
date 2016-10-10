// Import Style
import './eventSchedule.scss';


// Import internal modules
import controller from './eventSchedule.controller';
import directive from './eventSchedule.directive';

import eventScheduleList from '../';

export default angular.module("eventSchedule" , [eventScheduleList])


  .controller(controller.UID, controller)
  .directive("eventSchedule", directive)
  .name;
