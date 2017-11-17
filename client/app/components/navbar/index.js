// Import Style
import './navbar.scss';


// Import internal modules
import controller from './navbar.controller';
import directive from './navbar.directive';
import service from './navbar.service';
import navbarItem from './navbarItem';

export default angular.module("navbar" , [navbarItem])
  .controller(controller.UID, controller)
  .directive("navbar", directive)
  .service(service.UID, service)
  .name;


