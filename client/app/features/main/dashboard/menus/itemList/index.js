// Import Style
import './itemList.scss';


import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './itemList.controller';
import routes from './itemList.routes';

export default angular.module("itemList" , [uirouter])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
