// Import Style
import './taxGroupList.scss';


// Import internal modules
import controller from './taxGroupList.controller';
import directive from './taxGroupList.directive';
import taxGroup from './taxGroup';

export default angular.module("taxGroupList" , [taxGroup])

  .controller(controller.UID, controller)
  .directive("taxGroupList", directive)
  .name;
