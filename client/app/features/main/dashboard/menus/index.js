// Import Style
import './menus.scss';


import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './menus.controller';
import routes from './menus.routes';
import v2Menu from './menu';
import v2MenuList from './menuList';
import v2ItemList from './itemList';
import v2ModifierList from './modifiers';

import menuItemList from './components/menuItemList'; //required for drawer
import modifierList from './components/modifierList'; //required for drawer

export default angular.module("menus" , [uirouter, v2Menu, v2MenuList, v2ItemList, v2ModifierList, menuItemList, modifierList])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
