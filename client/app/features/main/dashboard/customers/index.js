// Import Style
import './customers.scss';

// Import internal modules
import controller from './customers.controller';
import routes from './customers.routes';
import notes from './notes';

// Import components
import customerNoteList from './components/customerNoteList';

angular.module("webapp.customers" , [
    'ui.router',
    notes,
    customerNoteList
  ])
  .config(routes)
  .controller(controller.UID, controller)
  .name;