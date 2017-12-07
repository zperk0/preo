
import controller from './customers.controller';

/**
 * Routing function for customers
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider) {
	"ngInject";

  $stateProvider.state("main.dashboard.customers", {
    url: "/customers",
    template: require("./customers.tpl.html"),
    abstract: true,
    controller: controller.UID,
    controllerAs: "$customers",
    resolve: {
    	operatorAccess: ($q, $timeout, $state, StateService, authenticated) => {
    		"ngInject";

    		if (StateService.isOperator()) {
    			return $q.when();
    		}

    		$timeout(() => {
					$state.go('main.dashboard.home', {
						entityId: StateService.entityId
					});
    		});

    		return $q.reject();
    	}
    }
  });
}
