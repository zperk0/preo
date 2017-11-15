
export default function customersResolve ($q, $state, $stateParams, $rootScope, authenticated, StateService, UserService, Spinner) {
  "ngInject";

  if ($stateParams.customers) {
    console.log('customersResolve - returning customers array form state params', $stateParams.customers);
    return $q.when($stateParams.customers);
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
  }, (err) => {

		console.log('Customers [customersResolve] - error', err);
  	deferred.reject(err);
  	shouldShowLoader && Spinner.hide(LOADER_KEY);
  }).catch((err) => {

    shouldShowLoader && Spinner.hide(LOADER_KEY);
    console.log('Customers [customersResolve] - catch', err);
    deferred.reject(err);
  });

  return deferred.promise;
}