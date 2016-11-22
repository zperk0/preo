// Import Style
import './openingHoursList.scss';


// Import internal modules
import controller from './openingHoursList.controller';
import directive from './openingHoursList.directive';

import openingHour from './openingHour';

export default angular.module("openingHoursList" , [openingHour])


  .controller(controller.UID, controller)
  .directive("openingHoursList", directive)
  .name;
