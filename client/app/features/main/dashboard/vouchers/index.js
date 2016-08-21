// Import Style
import './vouchers.scss';


// Import internal modules
import controller from './vouchers.controller';
import routes from './vouchers.routes';

export default function(){
  return angular.module("vouchers" , ['ui.router'])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
}
