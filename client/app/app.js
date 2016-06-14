// Import Style

require('jscore/preoday/preoday.min.js');

import './app.scss';
import 'angular-material/angular-material.min.css';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import angularTranslate from 'angular-translate';
import angularAnimate from 'angular-animate';
import angularAria from 'angular-aria';
import angularMaterial from 'angular-material';
import angularMessages from 'angular-messages';
import dndLists from 'angular-drag-and-drop-lists';

// Import base modules
import config from './app.config';
import run from './app.run';
import routes from './app.routes';
import appConstants from 'appConstants';
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



//Issue with ES6 Import, change this when it's fixed https://github.com/moment/moment/issues/2608
window.moment = require('moment/moment.js');


export default angular.module('webapp', [
  /* external */ uirouter, angularTranslate, angularAnimate, angularMaterial, angularAria, angularMessages,'dndLists',
  /* directives */ dialog, snack,
  /* internal */ PreodayServices, v2Main, v2Error, v2Auth, v2NotFound
  ])
  .config(config)
  .run(run)
  .config(routes)
  .constant("AppConstants", appConstants)
  .constant("BroadcastEvents", broadcastEvents)
  .name;
