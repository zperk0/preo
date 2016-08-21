// Import Style
import './error.scss';



// Import internal modules
import controller from './error.controller';
import service from './error.service';
import routes from './error.routes';


export default angular.module("error" , ['ui.router'])
  .config(routes)
  .controller(controller.UID, controller)
  .service(service.UID, service)
  .name;
