// Import Style
import './main.scss';


// Import internal modules
import controller from './main.controller';
import routes from './main.routes';
import run from './main.run';

import v2Dashboard from './dashboard';
import v2Analytics from './analytics';
import v2Account from './account';

import navbar from '../../components/navbar';
import toolbar from '../../components/toolbar';
import scrollToElement from '../../components/scrollToElement';

export default angular.module("main" , [
	'ui.router', 
	'dashboard', 
	v2Analytics, 
	v2Account, 
	navbar, 
	toolbar,
	scrollToElement
])
  .config(routes)
  .run(run)
  .controller(controller.UID, controller)
  .name;
