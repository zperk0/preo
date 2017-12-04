
export default function ordersResolve ($rootScope, $q, $state, $stateParams, authenticated, Spinner, ErrorService, DialogService, gettextCatalog) {
  "ngInject";

  function _onError(error) {
    console.log('Customer orders [ordersResolve] - error', error);
    deferred.reject(error);
    Spinner.hide(LOADER_KEY);
    $state.go('main.dashboard.customers.search', {
      value: $stateParams.value
    }, {
      location: 'replace'
    });
    $rootScope.$broadcast('$customer-orders:resolve:error');
    DialogService.show(ErrorService.errorTitle, ErrorService.FAILED_LOADING_ORDERS.message, [{
      name: gettextCatalog.getString('OK')
    }]);
  }

  const deferred = $q.defer();
  const LOADER_KEY = 'fetch-orders';

  Spinner.show(LOADER_KEY);

  Preoday.Order.getOrdersByUserId($stateParams.customerId)
  .then(orders => {
    console.log('Customer orders [ordersResolve] - got orders', orders);
    deferred.resolve(orders);
    Spinner.hide(LOADER_KEY);
  }, _onError.bind(this))
  .catch(_onError.bind(this));

  return deferred.promise;
}