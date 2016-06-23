// Import Style
import './menuEditor.scss';


import angular from 'angular';

// Import internal modules
import controller from './menuEditor.controller';
import directive from './menuEditor.directive';

import sectionList from './menuSectionList'


export default angular.module("menuEditor" , [sectionList])


  .controller(controller.UID, controller)
  .directive("menuEditor", directive)
  .name;
