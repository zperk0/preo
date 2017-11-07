// Import Style
import './taxes.scss';

// Import internal modules
import controller from './taxes.controller';
import routes from './taxes.routes';

import sellerDetails from './sellerDetails';
import taxGroups from './taxGroups';
import taxRates from './taxRates';

export default angular.module("webapp.taxes" , [sellerDetails, taxGroups, taxRates])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
