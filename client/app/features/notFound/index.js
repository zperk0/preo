// Import Style
import './notFound.scss';


// Import internal modules
import controller from './notFound.controller';
import routes from './notFound.routes';

export default angular.module("notFound" , ['ui.router'])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
