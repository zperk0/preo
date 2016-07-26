// Import Style
import './menuList.scss';


import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './menuList.controller';
import routes from './menuList.routes';

import menuCardList from '../components/menuCardList';

export default angular.module("menuList" , [uirouter, menuCardList])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
