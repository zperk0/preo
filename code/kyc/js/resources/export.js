angular.module('kyc.resources').
  factory('Export', function($resource) {
    
    var Pdf = $resource('/api/accounts/:accountId/exports/pdf',{accountId:"@accountId"},{
    		table:{
    			method:"POST",
    			url:"/api/accounts/:accountId/exports/pdf/table"
    		},
    		chart:{
    			method:"POST",
    			url:"/api/accounts/:accountId/exports/pdf/table"
    		}

    });

    var Csv = $resource('/api/accounts/:accountId/exports/csv',{accountId:"@accountId"},{});

		var TablePdf = $resource('/api/accounts/:accountId/exports/table/pdf',{accountId:"@accountId"},{});

    return {
    	Pdf:Pdf,
    	Csv:Csv,
    	TablePdf:TablePdf
    }
});