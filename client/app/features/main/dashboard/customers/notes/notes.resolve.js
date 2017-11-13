
export default function notesResolve ($q, $state, $stateParams, authenticated, Spinner, ErrorService) {
  "ngInject";

  function _onError() {
    deferred.reject(error);
    Spinner.hide(LOADER_KEY);
    $state.go('main.dashboard.customers.search', {
      value: $stateParams.value
    });
    ErrorService.showRetry(ErrorService.FAILED_LOADING_NOTES);
    console.log('Customer Notes [notesResolve] - error', error);
  }

  const deferred = $q.defer();
  const LOADER_KEY = 'fetch-notes';

  Spinner.show(LOADER_KEY);

  Preoday.CustomerNote.getByUserId($stateParams.customerId, 'operator')
  .then(notes => {
    deferred.resolve(notes);
    Spinner.hide(LOADER_KEY);
    console.log('Customer Notes [notesResolve] - got notes', notes);
  }, _onError.bind(this))
  .catch(_onError.bind(this));

  return deferred.promise;
}