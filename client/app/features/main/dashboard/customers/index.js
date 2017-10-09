// Import Style
import './customers.scss';

// Import internal modules
import controller from './customers.controller';
import routes from './customers.routes';
import notes from './notes';
import orders from './orders';

// Import components
import customerNoteList from './components/customerNoteList';
import orderList from './components/orderList';
import orderDetail from './components/orderDetail';

angular.module("webapp.customers" , [
    'ui.router',
    notes,
    orders,
    customerNoteList,
    orderList,
    orderDetail
  ])
  .config(routes)
  .controller(controller.UID, controller)
  .name;