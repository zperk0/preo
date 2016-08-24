// Import Style
import './menuSection.scss';


// Import internal modules
import controller from './menuSection.controller';
import directive from './menuSection.directive';

import cardItem from '../../../../../../components/cardItem';
import itemList from '../../components/menuItemList';

import services from '../../../../../../shared';
import dialog from '../../../../../../components/dialog';

import modifierChips from '../../components/modifierChips';


export default angular.module("menuSection" , [cardItem, itemList, services, dialog, modifierChips])


  .controller(controller.UID, controller)
  .directive("menuSection", directive)
  .name;
