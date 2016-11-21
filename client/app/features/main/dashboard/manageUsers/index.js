// Import Style
import './manageUsers.scss';


// Import internal modules
import controller from './manageUsers.controller';
import routes from './manageUsers.routes';

import usersList from './usersList';

export default angular.module("webapp.manageUsers" , ['ui.router', usersList])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
