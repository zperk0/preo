
export default function orderResolve ($q, $state, $stateParams, authenticated, Spinner, ErrorService) {
  "ngInject";

  function _onError() {
    console.log('Customer orders [orderResolve] - error', error);
    deferred.reject(error);
    Spinner.hide(LOADER_KEY);
    $state.go('main.dashboard.customers.search', {
      value: $stateParams.value
    });
    ErrorService.showRetry(ErrorService.FAILED_LOADING_ORDER);
  }

  const deferred = $q.defer();
  const LOADER_KEY = 'fetch-order';

  Spinner.show(LOADER_KEY);

  Preoday.Order.get($stateParams.orderId, 'venue,paymentNumber')
  .then(order => {
    console.log('Customer orders [orderResolve] - got order', order);
    deferred.resolve(order);
    Spinner.hide(LOADER_KEY);
  }, _onError.bind(this))
  .catch(_onError.bind(this));

  return deferred.promise;
}