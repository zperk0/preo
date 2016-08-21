// Import Style
import './appMode.scss';


// Import internal modules
import controller from './appMode.controller';
import routes from './appMode.routes';

export default function(){
  return angular.module("appMode" , ['ui.router'])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
};
