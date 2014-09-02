//shop
angular.module('shop.resources',['ngResource']).
  factory('Resources',['$resource', function($resource) {
    
    var Feature = $resource('/api/features/:id',{id:"@id"}, {});

    var AccountCard = $resource('/api/accounts/:accountId/accountcard',{accountId:"@accountId"},{})

    var Invoice = $resource('/api/invoices/:invoiceId',{invoiceId:"@invoiceId"},{
        put:{
            method:"PUT"
        }
    });

    var StripeCharge = $resource('/api/invoices/:invoiceId/pay',{invoiceId:"@invoiceId"},{});

    
    return {
        Feature:Feature,
        AccountCard:AccountCard,
        Invoice:Invoice,
        StripeCharge:StripeCharge
    };

  }]);