// Import Style
import './menuSectionList.scss';


import angular from 'angular';

// Import internal modules
import controller from './menuSectionList.controller';
import directive from './menuSectionList.directive';
import menuSection from './menuSection'



export default angular.module("menuSectionList" , [menuSection])


  .controller(controller.UID, controller)
  .directive("menuSectionList", directive)
  .name;
