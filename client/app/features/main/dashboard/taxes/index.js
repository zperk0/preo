// Import Style
import './taxes.scss';

// Import internal modules
import controller from './taxes.controller';
import routes from './taxes.routes';

import sellerDetails from './sellerDetails';
import taxGroups from './taxGroups';

export default angular.module("webapp.taxes" , [sellerDetails, taxGroups])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
