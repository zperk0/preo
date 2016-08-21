// Import Style
import './outlets.scss';


// Import internal modules
import controller from './outlets.controller';
import routes from './outlets.routes';

import outletList from './components/outletList'; //required for drawer
import outletLocationList from './components/outletLocationList'; //required for drawer
import outletLocation from './components/outletLocationList/outletLocation'; //required for drawer
import outletLocationGroupList from './components/outletLocationGroupList'; //required for drawer
import outletLocationGroup from './components/outletLocationGroupList/outletLocationGroup'; //required for drawer
import outletLocationTree from './components/outletLocationTree'; //required for drawer


import outletLocations from './outletLocations'; //required for drawer
import outletListView from './outletList'; //required for drawer

require.ensure('angular',function(){
  angular.module("webapp.outlets" , ['ui.router', outletList, outletLocationList, outletLocationGroupList, outletLocationTree, outletLocationGroup, outletLocation, outletLocations, outletListView])
    .config(routes)
    .controller(controller.UID, controller)
    .name;
},'outlets-1.js')
