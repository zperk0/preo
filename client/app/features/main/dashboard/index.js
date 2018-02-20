// Import Style
import './dashboard.scss';

// Import internal modules
import controller from './dashboard.controller';
import routes from './dashboard.routes';
import home from './home'; //Home is part of the main bundle, no need to load it separately.

//Directives

angular.module("dashboard" , ['ui.router',
    // 'webapp.bookings',
    'webapp.events',
    'webapp.notifications',
    'webapp.payments',
    'webapp.promotions',
    'webapp.styling',
    'webapp.venueSettings',
    // 'webapp.vouchers',
    'webapp.menus',
    'webapp.manageUsers',
    'webapp.manageGroups',
    'webapp.taxes',
    'webapp.analytics',
    'webapp.outlets',
    'webapp.updateExternalMenus',
    'webapp.customTags',
    'webapp.customers',
    home
    ])
    .config(routes)
    .controller(controller.UID, controller)
    .name;
