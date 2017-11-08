
export default function customersResolve ($q, $state, $stateParams, authenticated, StateService, UserService, Spinner) {
  "ngInject";

  if ($stateParams.skipResolve) {
  	return $q.when(null);
  }

  const deferred = $q.defer();
  const LOADER_KEY = 'fetch-customers';

  Spinner.show(LOADER_KEY);
console.log('state params', $stateParams, $state);
  StateService.channel.searchCustomers({
    search: $stateParams.value
  }).then((customers) => {

		console.log('Customers [customersResolve] - got customers', customers);
		deferred.resolve(customers);
		Spinner.hide(LOADER_KEY);
  }, (err) => {

		console.log('Customers [customersResolve] - error', err);
  	deferred.reject(customers);
  	Spinner.hide(LOADER_KEY);
  }).catch((err) => {

    Spinner.hide(LOADER_KEY);
    console.log('Customers [customersResolve] - catch', err);
    deferred.reject(err);
  });

  return deferred.promise;
}