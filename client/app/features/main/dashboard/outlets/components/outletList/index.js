// Import Style
import './outletList.scss';


// Import internal modules
import controller from './outletList.controller';
import directive from './outletList.directive';

import outlet from './outlet';


export default angular.module("outletList" , ['cardItemList', outlet])


  .controller(controller.UID, controller)
  .directive("outletList", directive)
  .name;
