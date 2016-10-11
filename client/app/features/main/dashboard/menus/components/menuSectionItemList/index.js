// Import Style
import './menuSectionItemList.scss';


// Import internal modules
import controller from './menuSectionItemList.controller';
import directive from './menuSectionItemList.directive';

import cardItemList from '../../../../../../components/cardItemList'

export default angular.module("menuSectionItemList" , [cardItemList])


  .controller(controller.UID, controller)
  .directive("menuSectionItemList", directive)
  .name;
