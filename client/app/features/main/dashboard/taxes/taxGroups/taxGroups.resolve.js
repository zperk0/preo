
export default function taxGroupsResolve($q, TaxesService, Spinner, authenticated) {
  'ngInject';

  const deferred = $q.defer();
  const LOADER_KEY = 'tax-group-fetch';

  Spinner.show(LOADER_KEY);
  TaxesService.getTaxGroups(true)
    .then((taxGroups) => {
      Spinner.hide(LOADER_KEY);
      deferred.resolve(taxGroups);
    }).catch((err) => {
      Spinner.hide(LOADER_KEY);
      deferred.reject(err);
    });

  return deferred.promise;
}
