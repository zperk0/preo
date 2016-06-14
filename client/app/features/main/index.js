// Import Style
import './main.scss';


import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './main.controller';
import routes from './main.routes';

import v2Dashboard from './dashboard';
import v2Analytics from './analytics';
import v2Account from './account';

import navbar from '../../components/navbar';
import toolbar from '../../components/toolbar';
import contextualMenu from '../../components/contextualMenu';

export default angular.module("main" , [uirouter, v2Dashboard, v2Analytics, v2Account, navbar, toolbar, contextualMenu])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
