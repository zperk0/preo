
export default function routes($urlRouterProvider){
  "ngInject";

  $urlRouterProvider.otherwise(($injector, $location) => {
		const $state = $injector.get('$state');
		const $stateParams = $injector.get('$stateParams');

		$state.go('main.notFound', {
			entityId: $stateParams.entityId
		});
  });
}
