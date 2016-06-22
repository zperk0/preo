
export default function routes($urlRouterProvider){
  "ngInject";
  $urlRouterProvider.otherwise('/auth/signin');
}
