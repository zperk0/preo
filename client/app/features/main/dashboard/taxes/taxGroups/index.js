// Import Style
import './taxGroups.scss';

// Import internal modules
import controller from './taxGroups.controller';
import routes from './taxGroups.routes';

import taxGroupList from '../components/taxGroupList';

export default angular.module("taxGroups" , [taxGroupList])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
