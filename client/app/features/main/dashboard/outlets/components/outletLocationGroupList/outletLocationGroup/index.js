// Import Style
import './outletLocationGroup.scss';



// Import internal modules
import controller from './outletLocationGroup.controller';
import directive from './outletLocationGroup.directive';


export default angular.module("outletLocationGroup" , ['cardItem'])


  .controller(controller.UID, controller)
  .directive("outletLocationGroup", directive)
  .name;
