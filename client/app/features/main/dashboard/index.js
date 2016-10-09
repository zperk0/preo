// Import Style
import './dashboard.scss';

// Import internal modules
import controller from './dashboard.controller';
import routes from './dashboard.routes';

//Directives

angular.module("dashboard" , ['ui.router',
    // 'webapp.bookings',
    // 'webapp.events',
    // 'webapp.notifications',
    // 'webapp.payments',
    // 'webapp.promotions',
    'webapp.styling',
    // 'webapp.venueSettings',
    // 'webapp.vouchers',
    'webapp.menus',
    'webapp.taxes',
    'webapp.outlets'
    ])
    .config(routes)
    .controller(controller.UID, controller)
    .name;
