// Import Style
import './userSelectItem.scss';


// Import internal modules
import controller from './userSelectItem.controller';
import directive from './userSelectItem.directive';

export default angular.module("userSelectItem" , [])


  .controller(controller.UID, controller)
  .directive("userSelectItem", directive)
  .name;
