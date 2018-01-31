
export default function taxSettingsResolve($q, TaxesService, StateService, Spinner, authenticated) {
  'ngInject';

  const deferred = $q.defer();
  const LOADER_KEY = 'tax-settings-fetch';

  Spinner.show(LOADER_KEY);

  TaxesService.getTaxSettings(true)
    .then((taxSettings) => {
      Spinner.hide(LOADER_KEY);
      // Tax Settings found, `$editing` property
      taxSettings.$editing = true;
      deferred.resolve(taxSettings);
    }).catch((err) => {
      Spinner.hide(LOADER_KEY);
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
    });

  return deferred.promise;
}
