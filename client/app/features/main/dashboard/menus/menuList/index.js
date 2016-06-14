// Import Style
import './menuList.scss';


import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './menuList.controller';
import routes from './menuList.routes';

export default angular.module("menuList" , [uirouter])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
