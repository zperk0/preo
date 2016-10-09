// Import Style
import './taxes.scss';

// Import internal modules
import controller from './taxes.controller';
import routes from './taxes.routes';

import sellerDetails from './sellerDetails';

export default angular.module("webapp.taxes" , [sellerDetails])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
