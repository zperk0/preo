// Import Style
import './taxRates.scss';

// Controllers
import taxRatesController from './taxRates.controller';
import taxRateDetailsController from './taxRateDetails/taxRateDetails.controller';

// Routes
import routes from './taxRates.routes';

// Components
import taxRateList from '../components/taxRateList';

export default angular.module('taxRates' , [taxRateList])
  .config(routes)
  .controller(taxRatesController.UID, taxRatesController)
  .controller(taxRateDetailsController.UID, taxRateDetailsController)
  .name;
