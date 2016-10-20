// Import Style
import './sellerDetails.scss';


// Import internal modules
import controller from './sellerDetails.controller';
import routes from './sellerDetails.routes';

export default angular.module("sellerDetails" , [])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
