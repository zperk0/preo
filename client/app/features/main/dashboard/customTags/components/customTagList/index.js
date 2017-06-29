// Import internal modules
import controller from './customTagList.controller';
import directive from './customTagList.directive';

import customTag from './customTag';


export default angular.module("customTagList" , ['cardItemList', customTag])


  .controller(controller.UID, controller)
  .directive("customTagList", directive)
  .name;
