
import controller from './promotions.controller';
import usersController from './users/users.controller';
import permissionsResolve from './permissions.resolve';
import promotionsResolve from './promotions.resolve';
import promotionsDetailsController from './promotionsList/promotionDetails/promotionDetails.controller';
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

  $stateProvider.state('main.dashboard.promotions.new', {
      url: '/new',
      views: {
        promotionsView:  {
          controller: promotionsDetailsController.UID,
          controllerAs: '$promotionDetails',
          template: require('./promotionsList/promotionDetails/promotionDetails.tpl.html')
        }
      },
      resolve: {
        promotion: (StateService, promotions, authenticated) => {
          'ngInject';

          const taxGroup = new Preoday.Offer({
            entitiesInvited: {
              venueIds: StateService.venue && StateService.venue.id ? [StateService.venue.id] : [],
              groupIds: [],
              channelId: null
             // channelId: this.StateService.channel && this.StateService.channel.id,
            },
            venueId: StateService.venue && StateService.venue.id,
            channelId: StateService.channel && StateService.channel.id,
            "type": "FIXED",
            "name": "",
            "displayName":"",
            "paymentType": null,
            "items": null,
            "amount": null,
            "startDate":null,
            "endDate": null,
            "minBasket": 0,
            "maxUserClaims": null,
            "apply": "ALWAYS",
            "now":true,
            "firstOrder": 0,
            "visible": 0,
            "active": 1,
            "global": 1,
            $selected:true
          });

          promotions.push(taxGroup);
          return taxGroup;
        }
      }
    });

    $stateProvider.state('main.dashboard.promotions.edit', {
      url: '/:offerId',
      views: {
        promotionsView:  {
          controller: promotionsDetailsController.UID,
          controllerAs: '$promotionDetails',
          template: require('./promotionsList/promotionDetails/promotionDetails.tpl.html')
        }
      },
      resolve: {
        promotion: ($q, $state, $stateParams, $timeout, promotions) => {
          'ngInject';

          const offerId = parseInt($stateParams.offerId, 10);
          const offer = promotions.find((promotionItem) => {
            return promotionItem.id === offerId;
          });

          if (angular.isObject(offer)) {
            offer.$selected = true;
            return $q.when(offer);
          }

          $timeout(() => {
            $state.go('main.dashboard.promotions');
          });

          return $q.reject();
        }
      }
    });
}
