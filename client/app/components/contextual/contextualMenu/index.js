// Import Style
import './contextualMenu.scss';


// Import internal modules
import controller from './contextualMenu.controller';
import service from './contextualMenu.service';
import directive from './contextualMenu.directive';
import holderDirective from './contextualMenuHolder.directive';

import menuItemBasic from './components/menuItemBasic';
import menuItemSize from './components/menuItemSize';
import modifierItems from './components/modifierItems';
import modifierSelection from './components/modifierSelection';
import menusSelect from './components/menusSelect';
import collectionSlotBasic from './components/collectionSlotBasic';
import collectionSlotAdvanced from './components/collectionSlotAdvanced';
import collectionSlotsSelect from './components/collectionSlotsSelect';
import eventBasic from './components/eventBasic';
import eventScheduleForm from './components/eventScheduleForm';
import taxGroupSelect from './components/taxGroupSelect';
import menuItemAdvanced from './components/menuItemAdvanced';
import userRoleSelect from './components/userRoleSelect';
import promotionComponents from './components/promotionComponents';
import externalEventList from './components/externalEventList';

import services from '../../../shared';
import validNumber from '../../../components/validNumber';
import validPrice from '../../../components/validPrice';
import validPercentage from '../../../components/validPercentage';
import maxIntegerValue from '../../../components/maxIntegerValue';
import minIntegerValue from '../../../components/minIntegerValue';
import compareNumber from '../../../components/compareNumber';
import venueCurrency from '../../../components/venueCurrency';


export default angular.module("contextualMenu" , [
	menuItemBasic,
	menuItemSize,
	menusSelect,
	modifierItems,
	modifierSelection,
	collectionSlotBasic,
	collectionSlotAdvanced,
	collectionSlotsSelect,
	eventBasic,
  eventScheduleForm,
	taxGroupSelect,
	menuItemAdvanced,
	userRoleSelect,
	services,
	validNumber,
  validPrice,
	validPercentage,
	maxIntegerValue,
	minIntegerValue,
	compareNumber,
  promotionComponents,
  externalEventList,
	venueCurrency
])

  .controller(controller.UID, controller)
  .service(service.UID, service)
  .directive("contextualMenu", directive)
  .directive("contextualMenuHolder", holderDirective)
  .name;
