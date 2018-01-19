// Resolves
import taxRatesResolve from './taxRates.resolve';

// Controllers
import taxRatesController from './taxRates.controller';
import taxRateDetailsController from './taxRateDetails/taxRateDetails.controller';

/**
 * Routing function for taxRates
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider, Permissions) {
  'ngInject';

  $stateProvider.state('main.dashboard.taxes.taxRates', {
    url: '/taxRates',
    requiresPermission: Permissions.TAXES,
    views: {
      taxesContent: {
        controller: taxRatesController.UID,
        controllerAs: '$taxRates',
        template: require('./taxRates.tpl.html')
      }
    },
    resolve: {
      taxRates: taxRatesResolve
    }
  });

  $stateProvider.state('main.dashboard.taxes.taxRates.create', {
    url: '/new',
    views: {
      taxDetailsView:  {
        controller: taxRateDetailsController.UID,
        controllerAs: '$taxRateDetails',
        template: require('./taxRateDetails/taxRateDetails.tpl.html')
      }
    },
    resolve: {
      taxRate: (StateService, taxRates, authenticated) => {
        'ngInject';

        const taxRate = new Preoday.TaxRate({
          venueId: StateService.venue && StateService.venue.id,
          channelId: StateService.channel && StateService.channel.id,
          $selected: true
        });

        taxRates.push(taxRate);
        return taxRate;
      }
    }
  });

  $stateProvider.state('main.dashboard.taxes.taxRates.edit', {
    url: '/:taxRateId',
    views: {
      taxDetailsView:  {
        controller: taxRateDetailsController.UID,
        controllerAs: '$taxRateDetails',
        template: require('./taxRateDetails/taxRateDetails.tpl.html')
      }
    },
    resolve: {
      taxRate: ($q, $state, $stateParams, $timeout, taxRates) => {
        'ngInject';

        const taxRateId = parseInt($stateParams.taxRateId, 10);
        const taxRate = taxRates.find((taxRateItem) => {
          return taxRateItem.id === taxRateId;
        });

        if (angular.isObject(taxRate)) {
          taxRate.$selected = true;
          return $q.when(taxRate);
        }

        $timeout(() => {
          $state.go('main.dashboard.taxes.taxRates');
        });

        return $q.reject();
      }
    }
  });
}
