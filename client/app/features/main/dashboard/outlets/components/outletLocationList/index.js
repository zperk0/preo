// Import Style
import './outletLocationList.scss';


// Import internal modules
import controller from './outletLocationList.controller';
import directive from './outletLocationList.directive';

export default angular.module("outletLocationList" , ['cardItemList'])


  .controller(controller.UID, controller)
  .directive("outletLocationList", directive)
  .name;
