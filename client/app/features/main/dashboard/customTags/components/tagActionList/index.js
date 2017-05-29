// Import internal modules
import controller from './tagActionList.controller';
import directive from './tagActionList.directive';

import tagAction from './tagAction';


export default angular.module("tagActionList" , ['cardItemList', tagAction])


  .controller(controller.UID, controller)
  .directive("tagActionList", directive)
  .name;
