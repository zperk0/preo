// Import Style
import './outletList.scss';


import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './outletList.controller';
import routes from './outletList.routes';


export default angular.module("outletListView" , [uirouter])
	.config(routes)
  .controller(controller.UID, controller)
  .name;
