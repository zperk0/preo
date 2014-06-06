//shop
angular.module('shop.resources',['ngResource']).
  factory('Resources', function($resource) {
    
    var Feature = $resource('/api/features/:id',{id:"@id"}, {});

    var AccountCard = $resource('/api/accounts/:accountId/accountcard',{accountId:"@accountId"},{})

    var AccountFeatures = $resource('/api/features/accountFeature/:accountId/:accountFeatureId',{accountId:"@accountId",accountFeatureId:"@accountFeatureId"},{});    

    var Invoice = $resource('/api/accountPayment/:accountId',{accountId:"@accountId"},{
        put:{
            method:"PUT"
        }
    });

    var StripeCharge = $resource('/api/accountPayment/charge/:accountId/:invoiceId',{accountId:"@accountId",invoiceId:"@invoiceId"},{});

    return {
        Feature:Feature,
        AccountCard:AccountCard,
        AccountFeatures:AccountFeatures,
        Invoice:Invoice,
        StripeCharge:StripeCharge
    };

  });