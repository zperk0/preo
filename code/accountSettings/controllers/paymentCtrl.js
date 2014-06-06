angular.module('accountSettings.controllers')
 .controller('PaymentCtrl', ['$scope','$q','$http','ACCOUNT_ID','AccountCard',
  function ($scope,$q,$http,ACCOUNT_ID,AccountCard) {
  	$scope.isEditing = true;
    $scope.errorMessage = "";

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

    var saveStripeCard = function(){      
    Stripe.setPublishableKey("pk_test_jdzjWNP5LC2d7wmDceXveDlB");   
    console.log($scope.card);      
      
      Stripe.card.createToken({
        name: $scope.card.name,
        number :$scope.card.number,
        cvc : $scope.card.ccv,
        exp_month : $scope.card.expmonth,
        exp_year : $scope.card.expyear
      }, stripeResponseHandler);
    }
    

  	$scope.startEditing = function(){
		  $scope.isEditing = true;
  	};

  	$scope.saveChanges = function(){  		
      saveStripeCard();  		
  	};


    function getStripeKey(){
        $http({ method: 'GET', url:  '/api/config/app'}).
        success(function(data) {                        
            Stripe.setPublishableKey(data.stripeKey);   
        });        
    }
    getStripeKey();

     var stripeResponseHandler = function(status, response) {
       
       if (response.error) {
         // Show the errors on the form
         $scope.errorMessage = response.error.message;
         console.log("error",status,response,$scope.errorMessage)
         $scope.$apply();         
       } else {
        $scope.errorMessage = "";
         // token contains id, last4, and card type
         console.log("success",status,response)

         $scope.card.token = response.id;
         $scope.card.number = response.card.last4;
         $scope.card.type = response.card.type;
        
        if ($scope.card.id)
          $scope.card.$put({accountId:ACCOUNT_ID});
        else
           $scope.card.$save({accountId:ACCOUNT_ID});

         $scope.isEditing = false;
    };
    
  }

}]);	