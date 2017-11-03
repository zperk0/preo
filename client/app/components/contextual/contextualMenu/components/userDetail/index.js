// Import Style
import './userDetail.scss';


import userRoleSelect from '../userRoleSelect';

// Import internal modules
import controller from './userDetail.controller';
import directive from './userDetail.directive';



export default angular.module("userDetail" , [userRoleSelect])


  .controller(controller.UID, controller)
  .directive("userDetail", directive)
  .name;
