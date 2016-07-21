// Import Style
import './menuSection.scss';


import angular from 'angular';

// Import internal modules
import controller from './menuSection.controller';
import directive from './menuSection.directive';
import directiveNew from './menuSectionNew.directive';

import cardItem from '../../../../../../components/cardItem';
import itemList from '../../components/menuItemList';

import services from '../../../../../../shared';
import dialog from '../../../../../../components/dialog';

import modifierChips from '../../components/modifierChips';


export default angular.module("menuSection" , [cardItem, itemList, services, dialog, modifierChips])


  .controller(controller.UID, controller)
  .directive("menuSection", directive)
  .directive("menuSectionNew", directiveNew)
  .name;
