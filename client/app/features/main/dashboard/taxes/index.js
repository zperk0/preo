// Import Style
import './taxes.scss';

// Import internal modules
import sellerDetails from './sellerDetails';
import taxGroups from './taxGroups';
import taxRates from './taxRates';

// Routes
import routes from './taxes.routes';

// Controllers
import controller from './taxes.controller';

// Components
import scrollToTax from './components/scrollToTax/scrollToTax.directive';

export default angular.module("webapp.taxes" , [sellerDetails, taxGroups, taxRates])
  .config(routes)
  .controller(controller.UID, controller)
  .directive('scrollToTax', scrollToTax)
  .name;
