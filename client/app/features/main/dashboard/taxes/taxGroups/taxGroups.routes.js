// Resolves
import taxGroupsResolve from './taxGroups.resolve';
import entitiesResolve from 'app/components/contextual/contextualDrawer/entities/entities.resolve';

// Controllers
import taxGroupsController from './taxGroups.controller';
import taxGroupDetailsController from './taxGroupDetails/taxGroupDetails.controller';

/**
 * Routing function for taxGroups
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider, Permissions) {
  'ngInject';

  $stateProvider.state('main.dashboard.taxes.taxGroups', {
    url: '/taxGroups',
    requiresPermission: Permissions.TAXES,
    views: {
      taxesContent: {
        controller: taxGroupsController.UID,
        controllerAs: '$taxGroups',
        template: require('./taxGroups.tpl.html')
      }
    },
    resolve: {
      entities: entitiesResolve,
      taxGroups: taxGroupsResolve
    }
  });

  $stateProvider.state('main.dashboard.taxes.taxGroups.create', {
    url: '/new',
    views: {
      taxDetailsView:  {
        controller: taxGroupDetailsController.UID,
        controllerAs: '$taxGroupDetails',
        template: require('./taxGroupDetails/taxGroupDetails.tpl.html')
      }
    },
    resolve: {
      taxGroup: (StateService, taxGroups, authenticated) => {
        'ngInject';

        const taxGroup = new Preoday.TaxGroup({
          venueId: StateService.venue && StateService.venue.id,
          channelId: StateService.channel && StateService.channel.id,
          entities: {channelId: null, groupIds: [], venueIds: []},
          $selected: true
        });

        taxGroups.push(taxGroup);
        return taxGroup;
      }
    }
  });

  $stateProvider.state('main.dashboard.taxes.taxGroups.edit', {
    url: '/:taxGroupId',
    views: {
      taxDetailsView:  {
        controller: taxGroupDetailsController.UID,
        controllerAs: '$taxGroupDetails',
        template: require('./taxGroupDetails/taxGroupDetails.tpl.html')
      }
    },
    resolve: {
      taxGroup: ($q, $state, $stateParams, $timeout, taxGroups) => {
        'ngInject';

        const taxGroupId = parseInt($stateParams.taxGroupId, 10);
        const taxGroup = taxGroups.find((taxGroupItem) => {
          return taxGroupItem.id === taxGroupId;
        });

        if (angular.isObject(taxGroup)) {
          taxGroup.$selected = true;
          return $q.when(taxGroup);
        }

        $timeout(() => {
          $state.go('main.dashboard.taxes.taxGroups');
        });

        return $q.reject();
      }
    }
  });
}
