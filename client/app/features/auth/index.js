// Import Style
import './auth.scss';


// Import internal modules
import controller from './auth.controller';
import routes from './auth.routes';
import v2Signin from './signin';
import v2Signup from './signup';


export default angular.module("auth" , ['ui.router', v2Signin, v2Signup])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
