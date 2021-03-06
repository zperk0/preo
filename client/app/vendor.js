// Import Style

import angular from 'angular';

import "babel-polyfill";

require('jscore/preoday/preoday.min.js');
require('mdPickers/dist/mdPickers.js');
require('angular-sanitize/angular-sanitize.js');
require('angular-material-calendar/dist/angular-material-calendar.js');

import uirouter from 'angular-ui-router';
import angularAnimate from 'angular-animate';
import angularAria from 'angular-aria';
import angularMessages from 'angular-messages';
import angularSortableView from 'angular-sortable-view';
import croppie from 'croppie';
import angularMaterial from 'angular-material';
import angularScroll from 'angular-scroll';
window.$script = require('scriptjs');

//Issue with ES6 Import, change this when it's fixed https://github.com/moment/moment/issues/2608
window.moment = require('moment/moment.js');

require('moment/locale/en-gb.js');
require('moment/locale/nb.js');
require('moment/locale/nl.js');
require('moment/locale/fi.js');
require('moment/locale/da.js');
require('moment/locale/sv.js');
require('moment/locale/fr.js');
require('moment/locale/de.js');
require('moment/locale/es.js');
require('moment/locale/pt.js');

export default angular.module('webapp.vendors', [
    'ui.router',
    'ngAnimate',
    'ngAria',
    'ngMessages',
    'ngMaterial',
    'angular-sortable-view',
    'mdPickers',
    'materialCalendar',
    'duScroll',
  ]);