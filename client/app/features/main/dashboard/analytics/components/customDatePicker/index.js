// Import Style
import './customDatePicker.scss';

// Import internal modules
import directive from './customDatePicker.directive';

import bindonce from 'angular-bindonce/bindonce.js';

import extendMoment from 'moment-range/dist/moment-range.js';
window['moment-range'] = require('moment-range/dist/moment-range.js');
window['moment-range'].extendMoment(moment);

export default angular.module("customDatePicker" , ["pasvaz.bindonce"])
  .directive("customDatePicker", directive)
  //.controller(controller.UID, controller)
  .name;
