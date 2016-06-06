// Import Style
import './app.scss';
import 'angular-material/angular-material.min.css';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import angularTranslate from 'angular-translate';
import angularAnimate from 'angular-animate';
import angularAria from 'angular-aria';
import angularMaterial from 'angular-material';

// Import base modules
import config from './app.config';
import routes from './app.routes';
import appConstants from 'appConstants';

// Import internal modules
import v2Main from './features/main';


//Issue with ES6 Import, change this when it's fixed https://github.com/moment/moment/issues/2608
window.moment = require('moment/moment.js');


export default angular.module('webapp', [
  /* external */ uirouter, angularTranslate, angularAnimate, angularMaterial, angularAria,
  /* directives */
  /* internal */ v2Main
  ])
  .config(config)
  .config(routes)
  .constant("AppConstants", appConstants)
  .name;
