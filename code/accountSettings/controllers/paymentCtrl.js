angular.module('accountSettings.controllers')
 .controller('PaymentCtrl', ['$scope','$q','$http','ACCOUNT_ID','AccountCard','PendingInvoice','Account','StripeCharge',
  function ($scope,$q,$http,ACCOUNT_ID,AccountCard,PendingInvoice,Account,StripeCharge) {
    $scope.setSelected($scope.Views.paymentMethod);
  	$scope.isEditing = false;
    $scope.errorMessage = "";    
  	AccountCard.get({accountId:ACCOUNT_ID},function(result){
  		$scope.card = result;    
      $scope.finishLoading();         
      console.log($scope.card);
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
      $scope.card.number = "";
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
         // token contains id, last4, and card type
         console.log("success",status,response)

         $scope.card.token = response.id;
         $scope.card.number = response.card.last4;
         $scope.card.type = response.card.type;
        
        if ($scope.card.id)
          $scope.card.$put({accountId:ACCOUNT_ID},success,error);
        else
           $scope.card.$save({accountId:ACCOUNT_ID},success,error);         

    };

    function success(){
      $scope.errorMessage = "";
      $scope.isEditing = false;
      console.log("success!!");
      PendingInvoice.get({accountId:ACCOUNT_ID},function (invoice){        
      console.log('got invoice',invoice);  
          if (invoice.id){ //if we have an invoice, try to pay it
              StripeCharge.get({accountId:ACCOUNT_ID,invoiceId:invoice.id},
                function(result){
                  //if the payment is a success set the billing date for one month from the original billing date
                  console.log("payment is a success! getting accounts for,",result)
                  Account.query({accountId:ACCOUNT_ID},function(result){
                      var account = result[0];
                      console.log('got account:',account);                      
                      var tempDate = new Date(account.billingDate);
                      tempDate.setMonth(tempDate.getMonth() + 1);
                      account.billingDate = tempDate;
                      account.$put({accountId:ACCOUNT_ID},function(result){                          
                          console.log(result,"updated billing date");
                      });
                  })


              },function (error){
                    console.log("error",error);                    

              });
          }
      });
    }

    function error(error){      
      $scope.errorMessage = error.data.message;      
    }    
  }


}]);	