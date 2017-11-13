
export default function ordersResolve ($q, $state, $stateParams, authenticated, Spinner, ErrorService) {
  "ngInject";

  function _onError() {
    console.log('Customer orders [ordersResolve] - error', error);
    deferred.reject(error);
    Spinner.hide(LOADER_KEY);
    $state.go('main.dashboard.customers.search', {
      value: $stateParams.value
    });
    ErrorService.showRetry(ErrorService.FAILED_LOADING_ORDERS);
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