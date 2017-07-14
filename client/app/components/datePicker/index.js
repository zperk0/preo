// Import Style
import './datePicker.scss';
// import '../../../../../../../../node_modules/angular-mighty-datepicker/build/angular-mighty-datepicker.css';
//import 'angular-mighty-datepicker/build/angular-mighty-datepicker.css';

//import mightyDatepicker from '../../../../node_modules/angular-mighty-datepicker/build/angular-mighty-datepicker.js';

// Import internal modules
import directive from './datePicker.directive';
//import controller from './datePicker.controller';

// import bindonce from '../../../../../../../../node_modules/angular-bindonce/bindonce.js';
import bindonce from 'angular-bindonce/bindonce.js';
//import momentRange from '../../../../node_modules/moment-range/lib/moment-range.js';
// import mightyDatepicker from '../../../../../../../../node_modules/angular-mighty-datepicker/build/angular-mighty-datepicker.js';
//import mightyDatepicker from 'angular-mighty-datepicker/build/angular-mighty-datepicker.js';

//import extendMoment from 'moment-range/dist/moment-range.js';
//window['moment-range'] = require('moment-range/dist/moment-range.js');
//window['moment-range'].extendMoment(moment);

export default angular.module("datePicker" , ["pasvaz.bindonce"])
  .directive("datePicker", directive)
  //.controller(controller.UID, controller)
  .name;