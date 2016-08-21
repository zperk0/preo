// Import Style
import './itemList.scss';


// Import internal modules
import controller from './itemList.controller';
import routes from './itemList.routes';

export default angular.module("itemList" , ['ui.router'])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
