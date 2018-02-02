
export default function taxRatesResolve($q, TaxesService, Spinner, authenticated) {
  'ngInject';

  const deferred = $q.defer();
  const LOADER_KEY = 'tax-rates-fetch';

  Spinner.show(LOADER_KEY);
  TaxesService.getTaxRates(true)
    .then((taxRates) => {
      deferred.resolve(taxRates);
    }).catch((err) => {
      deferred.reject(err);
    })
    .finally(() => {
      Spinner.hide(LOADER_KEY);
    });

  return deferred.promise;
}
