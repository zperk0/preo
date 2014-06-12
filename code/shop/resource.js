//shop
angular.module('shop.resources',['ngResource']).
  factory('Resources', function($resource) {
    
    var Feature = $resource('/api/features/:id',{id:"@id"}, {});

    var AccountCard = $resource('/api/accounts/:accountId/accountcard',{accountId:"@accountId"},{})

    var AccountFeatures = $resource('/api/accounts/:accountId/features/:accountFeatureId',{accountId:"@accountId",accountFeatureId:"@accountFeatureId"},{});    

    var Invoice = $resource('/api/invoices/:invoiceId',{invoiceId:"@invoiceId"},{
        put:{
            method:"PUT"
        }
    });

    var StripeCharge = $resource('/api/invoices/:invoiceId/pay',{invoiceId:"@invoiceId"},{});

    return {
        Feature:Feature,
        AccountCard:AccountCard,
        AccountFeatures:AccountFeatures,
        Invoice:Invoice,
        StripeCharge:StripeCharge
    };

  });