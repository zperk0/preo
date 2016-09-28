// Import Style

require('jscore/preoday/preoday.min.js');
require('mdPickers/dist/mdPickers.js');

import uirouter from 'angular-ui-router';
import angularAnimate from 'angular-animate';
import angularAria from 'angular-aria';
import angularMessages from 'angular-messages';
import angularSortableView from 'angular-sortable-view';
import croppie from 'croppie';
import angularMaterial from 'angular-material';

//Issue with ES6 Import, change this when it's fixed https://github.com/moment/moment/issues/2608
window.moment = require('moment/moment.js');


export default angular.module('webapp.vendors', [
    'ui.router',
    'ngAnimate',
    'ngAria',
    'ngMessages',
    'ngMaterial',
    'angular-sortable-view',
    'mdPickers',
  ]);