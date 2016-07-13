// Import Style
import './venueSelect.scss';


import angular from 'angular';

// Import internal modules
import controller from './venueSelect.controller';
import directive from './venueSelect.directive';



export default angular.module("venueSelect" , [])


  .controller(controller.UID, controller)
  .directive("venueSelect", directive)
  .name;
