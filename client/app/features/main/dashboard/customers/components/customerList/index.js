// Import internal modules
import controller from './customerList.controller';
import directive from './customerList.directive';

import customerItem from './customerItem';


export default angular.module("customerList" , ['cardItemList', customerItem])


  .controller(controller.UID, controller)
  .directive("customerList", directive)
  .name;
