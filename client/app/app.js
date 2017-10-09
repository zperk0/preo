// Import Style

import './app.scss';

// node_modules and bower_components are pre-loaded by webpack
import PreodayServices from './shared/services';

// Import base modules
import run from './app.run';
import routes from './app.routes';

//old base
import constants from './app.constants';
import config from './app.config';
import gettext from 'angular-gettext';
import translations from './app.translations';
import dialog from './components/dialog';
import icon from './components/icon';
import snack from './components/snack';
import spinner from './components/spinner';
import fullSpinner from './components/fullSpinner';
import tagList from './components/tagList';
import itemChips from './components/itemChips';
import breadcrumb from './components/breadcrumb';
import validHtml from './components/validHtml';
import faSuspendable from './components/faSuspendable';
import faParentSuspendable from './components/faParentSuspendable';
import refresher from './components/refresher';
import autoSave from './components/autoSave';
import milesOrKms from './components/milesOrKms';
import mocks from './app.modules.mock';
import inlineCalendar from './components/inlineCalendar';

// Import internal modules
import v2Main from './features/main';
import v2Error from './features/error';
import v2Auth from './features/auth';
import v2NotFound from './features/notFound';
import v2EmailSuccess from './features/emailSuccess';
import v2StripeSuccess from './features/stripeSuccess';
import v2Redirect from './features/redirect';

// Import global components
import imageUploader from './components/imageUploader';
import contextual from './components/contextual';

window._release = 'webapp-v2 1.0.34';

require('ng-rollbar');
import rollbar from './rollbar.config.js';

//TODO convert this to ES6
require('./components/sticky/sticky.directive.js');

  angular.module('webapp', [
  /* external */
  'webapp.vendors',
  'tandibar/ng-rollbar',
  /* directives */
  'sticky',
  imageUploader,
  icon,
  tagList,
  itemChips,
  dialog,
  contextual,
  snack,
  spinner,
  fullSpinner,
  breadcrumb,
  autoSave,
  validHtml,
  faSuspendable,
  faParentSuspendable,
  refresher,
  milesOrKms,
  inlineCalendar,
  // /* internal */
  constants,
  config,
  'gettext',
  /* Global services */
  PreodayServices,
  /* Base Features */
  v2Main,
  v2Error,
  v2Auth,
  v2NotFound,
  v2EmailSuccess,
  v2StripeSuccess,
  v2Redirect
  ])
  .config(config)
  .run(run)
  .config(routes)
  .config(['RollbarProvider', rollbar])
  .name;

  (function _init(){
    let v2 = document.getElementById("webappv2");
    angular.bootstrap( v2, ['webapp']);
  })()

