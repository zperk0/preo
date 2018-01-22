// Import Style
import './marketingCheckbox.scss';

// Import internal modules
import controller from './marketingCheckbox.controller';
import directive from './marketingCheckbox.directive';

export default angular.module('marketingCheckbox' , [])
  .controller(controller.UID, controller)
  .directive('marketingCheckbox', directive)
  .name;
