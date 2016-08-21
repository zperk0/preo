// Import Style
import './outletLocationGroupList.scss';


// Import internal modules
import controller from './outletLocationGroupList.controller';
import directive from './outletLocationGroupList.directive';

export default angular.module("outletLocationGroupList" , ['cardItemList'])


  .controller(controller.UID, controller)
  .directive("outletLocationGroupList", directive)
  .name;
