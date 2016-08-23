// Import Style
import './contextualMenu.scss';


// Import internal modules
import controller from './contextualMenu.controller';
import service from './contextualMenu.service';
import directive from './contextualMenu.directive';
import holderDirective from './contextualMenuHolder.directive';

import menuItemSize from './components/menuItemSize';
import modifierItems from './components/modifierItems';
import modifierSelection from './components/modifierSelection';
import menusSelect from './components/menusSelect';

import services from '../../../shared';
import validNumber from '../../../components/validNumber';
import maxIntegerValue from '../../../components/maxIntegerValue';
import compareNumber from '../../../components/compareNumber';


export default angular.module("contextualMenu" , [menuItemSize, menusSelect, modifierItems, modifierSelection, services, validNumber, maxIntegerValue, compareNumber])


  .controller(controller.UID, controller)
  .service(service.UID, service)
  .directive("contextualMenu", directive)
  .directive("contextualMenuHolder", holderDirective)
  .name;
