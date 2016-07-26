// Import Style

require('jscore/preoday/preoday.min.js');

import 'angular-material/angular-material.min.css';
import 'croppie/croppie.css';
import './app.scss';

// node_modules and bower_components are pre-loaded by webpack
import angular from 'angular';
import uirouter from 'angular-ui-router';
import angularAnimate from 'angular-animate';
import angularAria from 'angular-aria';
import angularMessages from 'angular-messages';
import angularSortableView from 'angular-sortable-view';
import croppie from 'croppie';



// Import base modules
import config from './app.config';
import run from './app.run';
import routes from './app.routes';
import PreodayServices from './shared';


// Import internal modules
import v2Main from './features/main';
import v2Error from './features/error';
import v2Auth from './features/auth';
import v2NotFound from './features/notFound';

// Import global components
import dialog from './components/dialog';
import icon from './components/icon';
import snack from './components/snack';
import spinner from './components/spinner';
import imageUploader from './components/imageUploader';
import tagList from './components/tagList';
import contextual from './components/contextual';

import base from './app.base';

//TODO convert this to ES6
require('./components/sticky/sticky.directive.js');


//Issue with ES6 Import, change this when it's fixed https://github.com/moment/moment/issues/2608
window.moment = require('moment/moment.js');


export default angular.module('webapp', [
  /* external */
  uirouter,
  angularAnimate,
  angularAria,
  angularMessages,
  'angular-sortable-view',
  /* directives */
  dialog,
  icon,
  snack,
  spinner,
  'sticky',
  imageUploader,
  tagList,
  contextual,
  // /* internal */
  base,
  PreodayServices,
  v2Main,
  v2Error,
  v2Auth,
  v2NotFound
  ])
  .config(config)
  .run(run)
  .config(routes)
  .name;

window.DEBUG = true;
