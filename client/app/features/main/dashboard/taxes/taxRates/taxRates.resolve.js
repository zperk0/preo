
export default function taxRatesResolve($q, TaxesService, Spinner, authenticated) {
  'ngInject';

  const deferred = $q.defer();
  const LOADER_KEY = 'tax-rates-fetch';

  Spinner.show(LOADER_KEY);
  TaxesService.getTaxRates(true)
    .then((taxRates) => {
      Spinner.hide(LOADER_KEY);
      deferred.resolve(taxRates);
    }).catch((err) => {
      Spinner.hide(LOADER_KEY);
      deferred.reject(err);
    });

  return deferred.promise;
}
