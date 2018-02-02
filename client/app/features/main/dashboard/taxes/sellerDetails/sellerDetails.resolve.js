
export default function taxSettingsResolve($q, TaxesService, StateService, Spinner, authenticated) {
  'ngInject';

  const deferred = $q.defer();
  const LOADER_KEY = 'tax-settings-fetch';

  Spinner.show(LOADER_KEY);

  TaxesService.getTaxSettings(true)
    .then((taxSettings) => {
      deferred.resolve(taxSettings);
    }).catch((err) => {
      // Add new Tax Settings
      if (angular.isObject(err) && err.status && err.status == 404) {
        const taxSettings = new Preoday.TaxSettings({
          channelId: StateService.channel && StateService.channel.id,
          venueId: StateService.venue && StateService.venue.id
        });
        // Resolve as new Tax Settings
        return deferred.resolve(taxSettings);
      }
      deferred.reject(err);
    })
    .finally(() => {
      Spinner.hide(LOADER_KEY);
    });

  return deferred.promise;
}
