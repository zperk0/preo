// Import Style
import './menuItem.scss';


// Import internal modules
import controller from './menuItem.controller';
import directive from './menuItem.directive';
import directiveNew from './menuItemNew.directive';

import cardItem from '../../../../../../../components/cardItem';
import modifierChips from '../../modifierChips';

import menuSectionItemList from '../../menuSectionItemList';



export default angular.module("menuItem" , [cardItem, modifierChips, menuSectionItemList])


  .controller(controller.UID, controller)
  .directive("menuItem", directive)
  .directive("menuItemNew", directiveNew)
  .name;
