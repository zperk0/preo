// Resolves
import entitiesResolve from 'app/components/contextual/contextualDrawer/entities/entities.resolve';

// Controllers
import manageGroupsController from './manageGroups.controller';
import venueGroupDetailsController from './venueGroupDetails/venueGroupDetails.controller';

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

  $stateProvider.state('main.dashboard.manageGroups.create', {
    url: '/new',
    views: {
      venueGroupDetailsView:  {
        controller: venueGroupDetailsController.UID,
        controllerAs: '$venueGroupDetails',
        template: require('./venueGroupDetails/venueGroupDetails.tpl.html')
      }
    },
    resolve: {
      venueGroup: (StateService, entities, authenticated) => {
        'ngInject';

        const venueGroup = new Preoday.VenueGroup({
          channelId: StateService.channel && StateService.channel.id,
          venueIds: []
        });

        entities.venueGroups.push(venueGroup);
        return venueGroup;
      }
    }
  });

  $stateProvider.state('main.dashboard.manageGroups.edit', {
    url: '/:venueGroupId',
    views: {
      venueGroupDetailsView:  {
        controller: venueGroupDetailsController.UID,
        controllerAs: '$venueGroupDetails',
        template: require('./venueGroupDetails/venueGroupDetails.tpl.html')
      }
    },
    resolve: {
      venueGroup: ($q, $state, $stateParams, $timeout, entities) => {
        'ngInject';

        const venueGroupId = parseInt($stateParams.venueGroupId, 10);
        const venueGroup = entities.venueGroups.find((venueGroupItem) => {
          return venueGroupItem.id === venueGroupId;
        });

        if (angular.isObject(venueGroup)) {
          return $q.when(venueGroup);
        }

        $timeout(() => {
          $state.go('main.dashboard.manageGroups');
        });

        return $q.reject();
      }
    }
  });
}
