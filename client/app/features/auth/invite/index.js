
// Import internal modules
import controller from './invite.controller';
import routes from './invite.routes';

export default angular.module("invite" , ['ui.router'])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
