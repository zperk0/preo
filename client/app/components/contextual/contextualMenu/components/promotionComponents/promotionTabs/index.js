
// Import internal modules
import controller from './promotionTabs.controller';
import directive from './promotionTabs.directive';

export default angular.module("promotionTabs" , [])


  .controller(controller.UID, controller)
  .directive("promotionTabs", directive)
  .name;
