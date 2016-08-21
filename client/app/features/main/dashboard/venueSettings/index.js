// Import Style
import './venueSettings.scss';



// Import internal modules
import controller from './venueSettings.controller';
import routes from './venueSettings.routes';


require.ensure(['angular'],function(){
  // if (!window.angular){
  //   console.log ("no anuglar req2");
  // //   window.angular = require('angular');
  // }
  angular.module("webapp.venueSettings" , ['ui.router'])
    .config(routes)
    .controller(controller.UID, controller)
    .name;
});
