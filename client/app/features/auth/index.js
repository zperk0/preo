// Import Style
import './auth.scss';


// Import internal modules
import controller from './auth.controller';
import routes from './auth.routes';
import v2Signin from './signin';


export default angular.module("auth" , ['ui.router', v2Signin])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
