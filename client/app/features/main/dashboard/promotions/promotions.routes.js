
import controller from './promotions.controller';
import usersController from './users/users.controller';

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
      promotions: ($q, Spinner, StateService, authenticated) => {

        if (!StateService.venue) {
          return $q.reject();
        }

        const deferred = $q.defer()
        Spinner.show("fetch-promo");
        Preoday.Offer.getByVenueId(StateService.venue.id).then((promotions)=>{

            Spinner.hide("fetch-promo");
            deferred.resolve(promotions);
          }, (err)=>{

            Spinner.hide("fetch-promo");
            console.log("error", err)
            deferred.reject(err);
          }) .catch((err)=>{

            Spinner.hide("fetch-promo");
            console.log("error", err)
            deferred.reject(err);
          });

        return deferred.promise;
      }
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
