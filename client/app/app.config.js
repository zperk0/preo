
export default function config($mdThemingProvider, $locationProvider){
  "ngInject";

  if (!window._PREO_DATA){
    window._PREO_DATA = {
      _CDNROOT : 'http://cdn-local.preoday.com',
      _WEBORDERS : 'http://local.menus-v2.preoday.com/',
      _ORDERSAPP : 'http://local.orders.preoday.com/',
    }
  }

  $locationProvider.html5Mode(false);

  $mdThemingProvider.theme('default')
    .primaryPalette('grey');
}