angular.module('kyc.resources').
  factory('Export', function($resource) {
    
    var Pdf = $resource('/api/accounts/:accountId/exports/pdf',{accountId:"@accountId"},{});

    var Csv = $resource('/api/accounts/:accountId/exports/pdf',{accountId:"@accountId"},{});

    return {
    	Pdf:Pdf,
    	Csv:Csv
    }
});