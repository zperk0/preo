import angularMaterial from 'angular-material';

import constants from './app.constants';
import config from './app.config';
import gettext from 'angular-gettext';
import translations from './app.translations';


export default angular.module('webapp.base', [
    angularMaterial,
    constants,
    config,
    'gettext'
  ])
  .name;
