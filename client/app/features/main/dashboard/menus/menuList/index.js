// Import Style
import './menuList.scss';


// Import internal modules
import controller from './menuList.controller';
import routes from './menuList.routes';

import menuCardList from '../components/menuCardList';

import services from '../../../../../shared';

export default angular.module("menuList" , ['ui.router', menuCardList, services])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
