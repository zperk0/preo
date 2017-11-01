// Import Style
import './manageUsers.scss';


// Import internal modules
import controller from './manageUsers.controller';
import usersDetailsController from './userDetails/userDetails.controller';
import inviteController from './invite/invite.controller';
import routes from './manageUsers.routes';

import usersList from './usersList';
import usersInviteList from './usersInviteList';

export default angular.module("webapp.manageUsers" , ['ui.router', usersList, usersInviteList])
  .config(routes)
  .controller(controller.UID, controller)
  .controller(usersDetailsController.UID, usersDetailsController)
  .controller(inviteController.UID, inviteController)
  .name;
