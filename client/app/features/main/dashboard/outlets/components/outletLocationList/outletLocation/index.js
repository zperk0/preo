// Import Style
import './outletLocation.scss';


import angular from 'angular';

// Import internal modules
import controller from './outletLocation.controller';
import directive from './outletLocation.directive';

import outletLocationList from '../';

import base from '../../../../../../../app.base';

import cardItem from '../../../../../../../components/cardItem';
import itemChips from '../../../../../../../components/itemChips';
import contextual from '../../../../../../../components/contextual';
import dialog from '../../../../../../../components/dialog';
import snack from '../../../../../../../components/snack';
import spinner from '../../../../../../../components/spinner';

import services from '../../../../../../../shared';

import errorService from '../../../../../../../features/error';


export default angular.module("outletLocation" , [
	base,
	cardItem,
	itemChips,
	contextual,
	dialog,
	snack,
	spinner,
	services,
	errorService,
	outletLocationList,
])


  .controller(controller.UID, controller)
  .directive("outletLocation", directive)
  .name;
