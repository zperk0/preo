// Import Style
import './outletList.scss';


// Import internal modules
import controller from './outletList.controller';
import routes from './outletList.routes';


export default angular.module("outletListView" , ['ui.router'])
	.config(routes)
  .controller(controller.UID, controller)
  .name;
