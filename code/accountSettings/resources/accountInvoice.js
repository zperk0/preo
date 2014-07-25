angular.module('accountSettings.resources').
  factory('AccountInvoice', ['$resource',function($resource) {
    
    var Invoice = $resource('/api/accounts/:accountId/invoices/:invoiceId',{accountId:"@accountId",invoiceId:"@invoiceId"},{
    		payPending:{
              method:'POST',
              url:'/api/accounts/:accountId/invoices/payPending'
          }            
    });    

    Invoice.prototype.getTotal = function(){     
        return (this.vat + this.total).toFixed(2);
    }

		return Invoice;

  }]);    