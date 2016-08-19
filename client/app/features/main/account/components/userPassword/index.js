// Import Style
import './userPassword.scss';


import angular from 'angular';

// Import internal modules
import controller from './userPassword.controller';
import directive from './userPassword.directive';



export default angular.module("userPassword" , [])


  .controller(controller.UID, controller)
  .directive("userPassword", directive)
  .name;
