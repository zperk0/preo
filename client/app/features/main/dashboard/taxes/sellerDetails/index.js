// Import Style
import './sellerDetails.scss';

// Controllers
import controller from './sellerDetails.controller';

// Routes
import routes from './sellerDetails.routes';

// Components
import publishVenues from 'app/components/publishVenues';

export default angular.module('sellerDetails' , [publishVenues])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
