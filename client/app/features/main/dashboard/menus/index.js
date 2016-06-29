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
import v2ModifierList from './modifierList';

import menuSection from '../../../../components/menuEditor';

export default angular.module("menus" , [uirouter, v2Menu, v2MenuList, v2ItemList, v2ModifierList, menuSection])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
