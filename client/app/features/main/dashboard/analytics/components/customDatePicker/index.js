// Import Style
import './customDatePicker.scss';
import '../../../../../../../../node_modules/angular-mighty-datepicker/build/angular-mighty-datepicker.css';

//import mightyDatepicker from '../../../../node_modules/angular-mighty-datepicker/build/angular-mighty-datepicker.js';

// Import internal modules
import directive from './customDatePicker.directive';
import controller from './customDatePicker.controller';

import bindonce from '../../../../../../../../node_modules/angular-bindonce/bindonce.js';
//import momentRange from '../../../../node_modules/moment-range/lib/moment-range.js';
import mightyDatepicker from '../../../../../../../../node_modules/angular-mighty-datepicker/build/angular-mighty-datepicker.js';

import extendMoment from '../../../../../../../../node_modules/moment-range/dist/moment-range.js';
window['moment-range'] = require('moment-range/dist/moment-range.js');
window['moment-range'].extendMoment(moment);

export default angular.module("customDatePicker" , ["mightyDatepicker"])
  .directive("customDatePicker", directive)
  .controller(controller.UID, controller)
  .name;
