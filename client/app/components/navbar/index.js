// Import Style
import './navbar.scss';


// Import internal modules
import controller from './navbar.controller';
import directive from './navbar.directive';
import navbarItem from './navbarItem';

export default angular.module("navbar" , [navbarItem])
  .controller(controller.UID, controller)
  .directive("navbar", directive)
  .name;


