// Import Style
import './manageUsers.scss';


// Import internal modules
import controller from './manageUsers.controller';
import routes from './manageUsers.routes';

import usersList from './usersList';
import usersInviteList from './usersInviteList';

export default angular.module("webapp.manageUsers" , ['ui.router', usersList, usersInviteList])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
