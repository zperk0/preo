// Import Style

require('jscore/preoday/preoday.min.js');

import 'angular-material/angular-material.min.css';
import './app.scss';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import angularTranslate from 'angular-translate';
import angularAnimate from 'angular-animate';
import angularAria from 'angular-aria';
import angularMaterial from 'angular-material';
import angularMessages from 'angular-messages';
import angularSortableView from 'angular-sortable-view';

// Import base modules
import config from './app.config';
import run from './app.run';
import routes from './app.routes';
import broadcastEvents from './app.broadcastEvents.constants';
import PreodayServices from './shared';


// Import internal modules
import v2Main from './features/main';
import v2Error from './features/error';
import v2Auth from './features/auth';
import v2NotFound from './features/notFound';

// Import global components
import dialog from './components/dialog';
import snack from './components/snack';
import spinner from './components/spinner';



//Issue with ES6 Import, change this when it's fixed https://github.com/moment/moment/issues/2608
window.moment = require('moment/moment.js');


export default angular.module('webapp', [
  /* external */
  uirouter,
  angularMaterial,
  angularTranslate,
  angularAnimate,
  angularAria,
  angularMessages,
  'angular-sortable-view',
  /* directives */
  dialog,
  snack,
  spinner,
  // /* internal */
  PreodayServices,
  v2Main,
  v2Error,
  v2Auth,
  v2NotFound
  ])
  .config(config)
  .run(run)
  .config(routes)
  .constant("BroadcastEvents", broadcastEvents)
  .name;
