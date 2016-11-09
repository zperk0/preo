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
import autoSave from './components/autoSave';
import validHtml from './components/validHtml';

import mocks from './app.modules.mock';

// Import internal modules
import v2Main from './features/main';
import v2Error from './features/error';
import v2Auth from './features/auth';
import v2NotFound from './features/notFound';
import v2EmailSuccess from './features/emailSuccess';

// Import global components
import imageUploader from './components/imageUploader';
import contextual from './components/contextual';

//TODO convert this to ES6
require('./components/sticky/sticky.directive.js');


  angular.module('webapp', [
  /* external */
  'webapp.vendors',
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
  v2EmailSuccess
  ])
  .config(config)
  .run(run)
  .config(routes)
  .name;

  (function _init(){
    let v2 = document.getElementById("webappv2");
    angular.bootstrap( v2, ['webapp']);
  })()

