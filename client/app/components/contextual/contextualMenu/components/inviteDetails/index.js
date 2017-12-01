// Import Style
import './inviteDetails.scss';


import userRoleSelect from '../userRoleSelect';

// Import internal modules
import controller from './inviteDetails.controller';
import directive from './inviteDetails.directive';



export default angular.module("inviteDetails" , [userRoleSelect])


  .controller(controller.UID, controller)
  .directive("inviteDetails", directive)
  .name;
