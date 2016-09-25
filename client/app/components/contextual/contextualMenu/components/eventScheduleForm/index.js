// Import Style
import './eventScheduleForm.scss';


// Import internal modules
import controller from './eventScheduleForm.controller';
import directive from './eventScheduleForm.directive';

import autoOpenCalendar from '../../../../autoOpenCalendar';


export default angular.module("eventScheduleForm" , [autoOpenCalendar])

  .controller(controller.UID, controller)
  .directive("eventScheduleForm", directive)
  .name;
