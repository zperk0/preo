
export default function customersResolve ($q, $state, $stateParams, $rootScope, authenticated, StateService, UserService, Spinner, ErrorService, DialogService, gettextCatalog) {
  "ngInject";

  if ($stateParams.customers) {
    console.log('customersResolve - returning customers array form state params', $stateParams.customers);
    return $q.when($stateParams.customers);
  }

  function _onError(err) {
    console.log('Customers [customersResolve] - error', err);
    deferred.reject(err);
    shouldShowLoader && Spinner.hide(LOADER_KEY);
    $state.go('main.dashboard.customers.placeholder', {}, {
      location: 'replace'
    });
    DialogService.show(ErrorService.errorTitle, ErrorService.FAILED_LOADING_CUSTOMERS.message, [{
      name: gettextCatalog.getString('OK')
    }]);
  }

  const deferred = $q.defer();
  const shouldShowLoader = typeof $rootScope.previousState === undefined;
  const LOADER_KEY = 'fetch-customers';

  shouldShowLoader && Spinner.show(LOADER_KEY);

  StateService.searchCustomers({
    search: $stateParams.value
  }).then((customers) => {

		console.log('Customers [customersResolve] - got customers', customers);
		deferred.resolve(customers);
		shouldShowLoader && Spinner.hide(LOADER_KEY);
  }, _onError.bind(this))
  .catch(_onError.bind(this));

  return deferred.promise;
}