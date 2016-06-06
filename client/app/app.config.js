
export default function config($mdThemingProvider, $locationProvider){
  'ngInject';

  $locationProvider.html5Mode(false);

  $mdThemingProvider.theme('default')
    .primaryPalette('grey');
}