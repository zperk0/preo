//shop
angular.module('shop.resources',['ngResource']).
  factory('Resources', function($resource) {
    
    var Feature = $resource('/api/features/:id',{id:"@id"}, {});

    var AccountCard = $resource('/api/accounts/:accountId/accountcard',{accountId:"@accountId"},{})

    var AccountFeature = $resource('/api/features/:accountId/purchase',{accountId:"@accountId"},{})

    var AccountFeaturesList = $resource('/api/features/list/:accountId',{accountId:"@accountId"},{})

    return {
        Feature:Feature,
        AccountCard:AccountCard,
        AccountFeature:AccountFeature,
        AccountFeaturesList:AccountFeaturesList
    };

  });