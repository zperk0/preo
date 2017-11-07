
export default function config($mdThemingProvider, $locationProvider, $mdDateLocaleProvider, $compileProvider) {
  "ngInject";

  $locationProvider.html5Mode(false);

  $mdThemingProvider.theme('default')
    .primaryPalette('grey');

  $mdDateLocaleProvider.formatDate = function(date) {
     return moment(date).format('DD/MM/YYYY');
  };

  $compileProvider.debugInfoEnabled(true);
}