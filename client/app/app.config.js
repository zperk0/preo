
export default function config($mdThemingProvider, $locationProvider, $mdDateLocaleProvider, $compileProvider) {
  "ngInject";

  if (!window._PREO_DATA){
    window._PREO_DATA = {
      _CDNROOT : 'http://cdn-local.preoday.com',
      _WEBORDERS : 'http://localhost:3000/',
      _WEBORDERS_EDIT : 'http://localhost:3000/',
      _ORDERSAPP : 'http://local.orders.preoday.com/',
      _WEBAPP_V1 : 'http://local.app.preoday.com/',
    }
  }

  $locationProvider.html5Mode(false);

  $mdThemingProvider.theme('default')
    .primaryPalette('grey');

  $mdDateLocaleProvider.formatDate = function(date) {
     return moment(date).format('DD/MM/YYYY');
  };

  $compileProvider.debugInfoEnabled(true);
}