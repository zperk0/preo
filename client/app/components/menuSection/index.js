// Import Style
import './menuSection.scss';


import angular from 'angular';

// Import internal modules
import controller from './menuSection.controller';
import directive from './menuSection.directive';

import menuItem from './menuItem';
import cardItem from '../cardItem';


export default angular.module("menuSection" , [menuItem,cardItem])


  .controller(controller.UID, controller)
  .directive("menuSection", directive)
  .name;
