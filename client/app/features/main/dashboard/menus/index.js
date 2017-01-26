// Import Style
import './menus.scss';


// Import internal modules
import controller from './menus.controller';
import routes from './menus.routes';
import v2Menu from './menu';
import v2MenuList from './menuList';
import v2ItemList from './itemList';
import v2ModifierList from './modifiers';

import menuItemList from './components/menuItemList';
import modifierList from './components/modifierList';
import staticMenuItem from './components/staticMenuItem';
import staticModifierItem from './components/staticModifierItem';

angular.module("webapp.menus" , ['ui.router', v2Menu, v2MenuList, v2ItemList, v2ModifierList, menuItemList, modifierList, staticMenuItem, staticModifierItem])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
