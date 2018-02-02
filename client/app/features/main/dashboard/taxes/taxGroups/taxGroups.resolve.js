
export default function taxGroupsResolve($q, TaxesService, Spinner, authenticated) {
  'ngInject';

  const deferred = $q.defer();
  const LOADER_KEY = 'tax-group-fetch';

  Spinner.show(LOADER_KEY);
  TaxesService.getTaxGroups(true)
    .then((taxGroups) => {
      deferred.resolve(taxGroups);
    }).catch((err) => {
      deferred.reject(err);
    })
    .finally(() => {
      Spinner.hide(LOADER_KEY);
    });

  return deferred.promise;
}
