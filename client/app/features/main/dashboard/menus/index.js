// Import Style
import './menus.scss';


// Import internal modules
import controller from './menus.controller';
import routes from './menus.routes';
import v2Menu from './menu';
import v2MenuList from './menuList';
import v2ItemList from './itemList';
import v2ModifierList from './modifiers';

import menuItemList from './components/menuItemList'; //required for drawer
import modifierList from './components/modifierList'; //required for drawer

require.ensure('angular',function(){
  return angular.module("webapp.menus" , ['ui.router', v2Menu, v2MenuList, v2ItemList, v2ModifierList, menuItemList, modifierList])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
});