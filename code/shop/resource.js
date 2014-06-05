//shop
angular.module('shop.resources',['ngResource']).
  factory('Resources', function($resource) {
    
    var Feature = $resource('/api/features/:id',{id:"@id"}, {});

    var AccountCard = $resource('/api/accounts/:accountId/accountcard',{accountId:"@accountId"},{})

    var AccountFeatures = $resource('/api/features/accountFeature/:accountId/:accountFeatureId',{accountId:"@accountId",accountFeatureId:"@accountFeatureId"},{});    

    var AccountPayment = $resource('/api/accountPayment/:accountId',{accountId:"@accountId"},{});

    return {
        Feature:Feature,
        AccountCard:AccountCard,
        AccountFeatures:AccountFeatures,
        AccountPayment:AccountPayment
    };

  });