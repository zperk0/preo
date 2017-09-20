// Import Style
import './account.scss';



// Import internal modules
import controller from './account.controller';
import routes from './account.routes';

import userEmail from './components/userEmail';
import userPassword from './components/userPassword';
import userSettings from './components/userSettings';
import userNotifications from './components/userNotifications';

export default angular.module("account" , [
	'ui.router',
	userEmail,
	userPassword,
	userSettings,
	userNotifications
])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
