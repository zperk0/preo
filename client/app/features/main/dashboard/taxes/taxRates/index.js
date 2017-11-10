// Import Style
import './taxRates.scss';

// Import internal modules
import controller from './taxRates.controller';
import routes from './taxRates.routes';

import taxRateList from '../components/taxRateList';

export default angular.module("taxRates" , [taxRateList])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
