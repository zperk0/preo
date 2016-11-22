// Import Style
import './userSettings.scss';


// Import internal modules
import controller from './userSettings.controller';
import directive from './userSettings.directive';



export default angular.module("userSettings" , [])


  .controller(controller.UID, controller)
  .directive("userSettings", directive)
  .name;
