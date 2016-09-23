// Import Style
import './events.scss';



// Import internal modules
import controller from './events.controller';
import routes from './events.routes';

import eventListView from './eventList';
import collectionSlotsView from './collectionSlots';

import eventListComponent from './components/eventList';
import eventListItemComponent from './components/eventList/event';

import eventScheduleListComponent from './components/eventScheduleList';
import eventScheduleComponent from './components/eventScheduleList/eventSchedule';

import collectionSlotsListComponent from './components/collectionSlotsList';
import collectionSlotsListItemComponent from './components/collectionSlotsList/collectionSlotsItem';

angular.module("webapp.events" , [
		'ui.router',
		eventListView,
		collectionSlotsView,
		eventListComponent,
		eventListItemComponent,
		eventScheduleListComponent,
		eventScheduleComponent,
		collectionSlotsListComponent,
		collectionSlotsListItemComponent,
	])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
