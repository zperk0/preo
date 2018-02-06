// Import Style
import './manageGroups.scss';

// Controllers
import controller from './manageGroups.controller';
import venueGroupDetailsController from './venueGroupDetails/venueGroupDetails.controller';

// Routes
import routes from './manageGroups.routes';

// Components
import venueGroupList from './components/venueGroupList';

export default angular.module('webapp.manageGroups' , ['ui.router', venueGroupList])
  .config(routes)
  .controller(controller.UID, controller)
  .controller(venueGroupDetailsController.UID, venueGroupDetailsController)
  .name;
