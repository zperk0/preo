// Resolves
import entitiesResolve from 'app/shared/resolves/entities.resolve';
import taxSettingsResolve from './sellerDetails.resolve';

// Controllers
import controller from './sellerDetails.controller'

/**
 * Routing function for sellerDetails
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider, Permissions) {
  'ngInject';
  $stateProvider.state('main.dashboard.taxes.sellerDetails', {
    url: '/sellerDetails',
    requiresPermission: Permissions.TAXES,
    resolve: {
      entities: entitiesResolve,
      taxSettings: taxSettingsResolve
    },
    views: {
      taxesContent: {
        template: require('./sellerDetails.tpl.html'),
        controller: controller.UID,
        controllerAs: 'sellerDetailsCtrl'
      }
    }
  });
}
