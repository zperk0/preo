angular.module('accountSettings.controllers')
 .controller('PaymentCtrl', ['$scope','$q','$http','ACCOUNT_ID','AccountCard',
  function ($scope,$q,$http,ACCOUNT_ID,AccountCard) {
  	$scope.isEditing = false;


  	AccountCard.get({accountId:ACCOUNT_ID},function(result){
  		$scope.card = result;
  		console.log(result);
  	},function(error){         
      if (error.data && error.data.status === 404){
  		$scope.isEditing = true;
  		$scope.card = new AccountCard();
      } else{
	  	//error.
	    	noty({
		      type: 'error',  layout: 'topCenter',
		      text: _tr("Sorry, but there's been an error processing your request.") //text: 'Connection Error! Check API endpoint.'
	    	});  
        }                       
    });

  	$scope.startEditing = function(){
		$scope.isEditing = true;
  	};

  	$scope.saveChanges = function(){
  		$scope.isEditing = false;
  		if ($scope.card.id)
			$scope.card.$put({accountId:ACCOUNT_ID});
		else
			$scope.card.$save({accountId:ACCOUNT_ID});
  	};
}]);	