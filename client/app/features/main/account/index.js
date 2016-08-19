// Import Style
import './account.scss';


import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './account.controller';
import routes from './account.routes';

import userEmail from './components/userEmail';
import userPassword from './components/userPassword';

export default angular.module("account" , [
	uirouter,
	userEmail,
	userPassword
])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
