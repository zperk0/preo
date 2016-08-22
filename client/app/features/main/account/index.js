// Import Style
import './account.scss';



// Import internal modules
import controller from './account.controller';
import routes from './account.routes';

import userEmail from './components/userEmail';
import userPassword from './components/userPassword';

export default angular.module("account" , [
	'ui.router',
	userEmail,
	userPassword
])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
