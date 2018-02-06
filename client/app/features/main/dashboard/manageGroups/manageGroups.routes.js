// Resolves
import entitiesResolve from 'app/components/contextual/contextualDrawer/entities/entities.resolve';

// Controllers
import manageGroupsController from './manageGroups.controller';

/**
 * Routing function for manageGroups
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider, Permissions) {
  'ngInject';

  $stateProvider.state('main.dashboard.manageGroups', {
    url: '/groups',
    controller: manageGroupsController.UID,
    controllerAs: 'manageGroupsCtrl',
    requiresPermission: Permissions.ACCOUNT,
    template: require('./manageGroups.tpl.html'),
    resolve: {
      entities: entitiesResolve
    }
  });
}
