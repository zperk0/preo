// Import Style
import './deliverySettingsFields.scss';


// Import internal modules
import controller from './deliverySettingsFields.controller';
import directive from './deliverySettingsFields.directive';

export default angular.module("deliverySettingsFields" , [])


  .controller(controller.UID, controller)
  .directive("deliverySettingsFields", directive)
  .name;
