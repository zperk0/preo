angular.module('accountSettings.controllers')
 .controller('SubscriptionCtrl', ['$scope','$q','$http','ACCOUNT_ID','AccountCard',
  function ($scope,$q,$http,ACCOUNT_ID,AccountCard) {


  	AccountCard.get({accountId:ACCOUNT_ID},function(result){
  		$scope.card = result;  		
  	},function(error){         
  	  if (error.data && error.data.status === 404){
  		$scope.card = false;	
      } else{	  
		    	noty({
			      type: 'error',  layout: 'topCenter',
			      text: _tr("Sorry, but there's been an error processing your request.") //text: 'Connection Error! Check API endpoint.'
		    	});  
        }                       
    });


    $scope.navigateTo = function(place){
    	window.location.assign(place);
    }

    $scope.getTotalSubscription = function (){
    	return 0;
    }


    $scope.getFormattedBillingDate = function(){
    	return "9 Apr, 2014";
    }
}])