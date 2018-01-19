
import controller from './promotions.controller';
import usersController from './users/users.controller';
import permissionsResolve from './permissions.resolve';
import promotionsResolve from './promotions.resolve';
// import entitiesResolve from './entities.resolve';

/**
 * Routing function for promotions
 * @param  $stateProvider
 */

export default function routes($stateProvider, Permissions) {
  "ngInject";
  $stateProvider.state("main.dashboard.promotions", {
    url: "/promotions",
    template: require("./promotions.tpl.html"),
    controller: controller.UID,
    requiresPermission:Permissions.OFFERS,
    controllerAs: "promotionsCtrl",
    resolve: {
      promotions: promotionsResolve,
      permissions: permissionsResolve,
    //  entities: entitiesResolve
    }
  });
  $stateProvider.state("main.dashboard.promotions.users", {
    url: "/:promotionId/users",

    views: {"userSearchView": {
      //template: require("./users/users.tpl.html"),
      controller: usersController.UID,
      requiresPermission:Permissions.OFFERS,
      controllerAs: "usersPromotionsCtrl",
      resolve: {
      promotion: ($q, promotions, $stateParams, $state, $timeout) => {

        const promotionId = $stateParams.promotionId;
        const filtered = promotions.filter((promotion) => {
          return +promotion.id === +promotionId;
        });

        if (filtered.length) {
          return $q.when(filtered[0]);
        }

        $timeout(() => {
          $state.go("main.dashboard.promotions");
        });

        return $q.reject();
      }
    }
    }}
  });
}
