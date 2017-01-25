// Import Style
import './staticMenuItem.scss';


// Import internal modules
import controller from './staticMenuItem.controller';
import directive from './staticMenuItem.directive';

import cardItem from '../../../../../../components/cardItem';
import modifierChips from '../modifierChips';

import menuSectionItemList from '../menuSectionItemList';



export default angular.module("staticMenuItem" , [cardItem, modifierChips, menuSectionItemList])


  .controller(controller.UID, controller)
  .directive("staticMenuItem", directive)
  .name;
