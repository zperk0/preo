// Import Style
import './menuItemList.scss';


// Import internal modules
import controller from './menuItemList.controller';
import directive from './menuItemList.directive';

import menuItem from './menuItem'
import cardItemList from '../../../../../../components/cardItemList'

export default angular.module("menuItemList" , [cardItemList, menuItem])


  .controller(controller.UID, controller)
  .directive("menuItemList", directive)
  .name;
