import angularMaterial from 'angular-material';

import constants from './app.constants';
import config from './app.config';
import gettext from 'angular-gettext';
import translations from './app.translations';
import dialog from './components/dialog';
import icon from './components/icon';
import snack from './components/snack';
import spinner from './components/spinner';
import tagList from './components/tagList';


export default angular.module('webapp.base', [
    angularMaterial,
    constants,
    config,
    dialog,
    icon,
    snack,
    tagList,
    spinner,
    'gettext'
  ])
  .name;
