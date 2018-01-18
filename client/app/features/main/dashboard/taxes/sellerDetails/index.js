// Import Style
import './sellerDetails.scss';
import publishVenues from 'app/components/publishVenues';

// Import internal modules
import controller from './sellerDetails.controller';
import routes from './sellerDetails.routes';

export default angular.module("sellerDetails" , [publishVenues])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
