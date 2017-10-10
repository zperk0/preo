// Import Style
import './userSelectList.scss';


// Import internal modules
import controller from './userSelectList.controller';
import directive from './userSelectList.directive';

import userSelectItem from './userSelectItem'

export default angular.module("userSelectList" , [userSelectItem])

  .controller(controller.UID, controller)
  .directive("userSelectList", directive)
  .name;
