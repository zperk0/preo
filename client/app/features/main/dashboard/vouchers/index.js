// Import Style
import './vouchers.scss';


// Import internal modules
import controller from './vouchers.controller';
import routes from './vouchers.routes';

require.ensure('angular',function(){
  return angular.module("webapp.vouchers" , ['ui.router'])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
});
