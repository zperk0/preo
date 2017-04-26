// Import Style
import './customDatafilters.scss';


// Import internal modules
import directive from './customDatafilters.directive';
import controller from './customDatafilters.controller';

import customDatePicker from '../../customDatePicker';

export default angular.module("customDatafilters" , [customDatePicker])

  .directive("customDatafilters", directive)
  .controller(controller.UID, controller)
  .name;
