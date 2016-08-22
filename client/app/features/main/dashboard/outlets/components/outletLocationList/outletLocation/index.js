// Import Style
import './outletLocation.scss';


// Import internal modules
import controller from './outletLocation.controller';
import directive from './outletLocation.directive';

import outletLocationList from '../';


export default angular.module("outletLocation" , [
	'cardItem',
	'itemChips',
	'contextual',
	'dialog',
	'snack',
	'spinner',
	'Services',
	outletLocationList,
])


  .controller(controller.UID, controller)
  .directive("outletLocation", directive)
  .name;
