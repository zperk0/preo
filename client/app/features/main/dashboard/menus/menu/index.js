// Import Style
import './menu.scss';

import spinner from '../../../../../components/spinner';
import breadcrumb from '../../../../../components/breadcrumb';
import contextual from '../../../../../components/contextual';

// Import internal modules
import controller from './menu.controller';
import routes from './menu.routes';

import menuSectionList from '../menuSectionList';

export default angular.module("menu" , [
  'ui.router',
  menuSectionList,
  spinner,
  contextual,
  breadcrumb
])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
