// Import Style
import './events.scss';



// Import internal modules
import controller from './events.controller';
import routes from './events.routes';

require.ensure('angular',function(){
  return angular.module("webapp.events" , ['ui.router'])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
});
