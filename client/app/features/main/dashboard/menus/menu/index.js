// Import Style
import './menu.scss';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import spinner from '../../../../../components/spinner';
import contextual from '../../../../../components/contextual';

// Import internal modules
import controller from './menu.controller';
import routes from './menu.routes';

import menuSectionList from '../menuSectionList';

export default angular.module("menu" , [
  uirouter,
  menuSectionList,
  spinner,
  contextual
])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
