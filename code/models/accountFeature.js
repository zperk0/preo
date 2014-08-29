angular.module('resources').
  factory('AccountFeature', ['$resource',function($resource) {
    
    var AccountFeature = $resource('/api/accounts/:accountId/features/:featureId',{accountId:"@accountId",featureId:"@featureId"},{
            save:{
                method:'POST',
                params:{
                    accountId:"@accountId",
                    featureId:"@featureId",
                    userId:"@userId",
                    venueId:"@venueId",
                    code:"@code"
                }
            },
    		put:{
    			method:"PUT",    
    		},
            getPrice:{
                method:'GET',
                url:'/api/accounts/:accountId/features/:featureId/price'
            }            
    });    

    AccountFeature.prototype.getLink = function(){    	
    	if (this.feature && this.feature.$link){
    		return this.feature.$link;
    	}
    	
    	return false;
    }

    AccountFeature.prototype.isInContractPeriod = function(){      
        if (this.feature && this.feature.contractMonths){            
            var startDate = moment(this.startDate);
            var contractEnds = startDate.add(this.feature.contractMonths,'month');
            if (moment().valueOf() < contractEnds.valueOf())
                return true;
        }        
        return false;
    }

    AccountFeature.prototype.getContractEnd = function(){        
        var startDate = moment(this.startDate);
        var contractEnds = startDate.add(this.feature.contractMonths,'month');
        return contractEnds.toDate();
        
    }

		return AccountFeature;

  }]);    