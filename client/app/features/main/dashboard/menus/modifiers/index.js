// Import Style
import './modifiers.scss';


// Import internal modules
import controller from './modifiers.controller';
import routes from './modifiers.routes';

import modifierList from '../components/modifierList';

export default angular.module("modifiers" , ['ui.router', modifierList])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
