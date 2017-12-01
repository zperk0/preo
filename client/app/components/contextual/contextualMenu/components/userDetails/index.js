// Import Style
import './userDetails.scss';


import userRoleSelect from '../userRoleSelect';

// Import internal modules
import controller from './userDetails.controller';
import directive from './userDetails.directive';



export default angular.module("userDetails" , [userRoleSelect])


  .controller(controller.UID, controller)
  .directive("userDetails", directive)
  .name;
