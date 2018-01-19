// Import Style
import './taxGroups.scss';

// Controllers
import taxGroupsController from './taxGroups.controller';
import taxGroupDetailsController from './taxGroupDetails/taxGroupDetails.controller';

// Routes
import routes from './taxGroups.routes';

// Components
import taxGroupList from '../components/taxGroupList';

export default angular.module('taxGroups' , [taxGroupList])
  .config(routes)
  .controller(taxGroupsController.UID, taxGroupsController)
  .controller(taxGroupDetailsController.UID, taxGroupDetailsController)
  .name;
