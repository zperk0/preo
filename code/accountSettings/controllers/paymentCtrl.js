angular.module('accountSettings.controllers')
 .controller('PaymentCtrl', ['$scope','$q','$http','ACCOUNT_ID','AccountCard','PendingInvoice','Account','StripeCharge','$AjaxInterceptor',
  function ($scope,$q,$http,ACCOUNT_ID,AccountCard,PendingInvoice,Account,StripeCharge,$AjaxInterceptor) {
    var oldCard;
    $scope.setSelected($scope.Views.paymentMethod);
  	$scope.isEditing = false;
    $scope.errorMessage = "";      	
    AccountCard.get({accountId:ACCOUNT_ID},function(result){
  		$scope.card = result;    
      $scope.finishLoading();         
      console.log($scope.card);
  	},function(error){         
      if (error.data && error.data.status === 404){
        console.log('ho');
    		$scope.isEditing = true;
    		$scope.card = new AccountCard();      
        $scope.finishLoading();  
      } else{
	    	noty({
		      type: 'error',  layout: 'topCenter',
		      text: _tr("Sorry, but there's been an error processing your request.") //text: 'Connection Error! Check API endpoint.'
	    	});  
        }                       
    });
    
      
    var saveStripeCard = function(){          
      
      Stripe.card.createToken({
        name: $scope.card.name,
        number :$scope.card.number,
        cvc : $scope.card.ccv,
        exp_month : $scope.card.expmonth,
        exp_year : $scope.card.expyear
      }, stripeResponseHandler);
    }
    

  	$scope.startEditing = function(){
      oldCard = $scope.card.number;
      $scope.card.number = "";
		  $scope.isEditing = true;
  	};

  	$scope.saveChanges = function(){  		          
      $scope.errorMessage = "";
      $scope.triedSubmit = true;  
      $scope.isPosting = true;
      if (!$scope.paymentForm.$valid) {            
          $scope.isPosting =false;
          $scope.errorMessage = _tr("Please fill in all the required fields.");
          return false;
      };
      $AjaxInterceptor.start();
      saveStripeCard();  		
  	};


    function getStripeKey(){
        $http({ method: 'GET', url:  '/api/config/app'}).
        success(function(data) {                        
            Stripe.setPublishableKey(data.stripeKey);               
        });        
    }
    

     var stripeResponseHandler = function(status, response) {
       console.log("got here",response,status);
       if (response.error) {
         $scope.isPosting = false;
         // Show the errors on the form
         $scope.errorMessage = response.error.message;         
         $scope.$apply();         
         $AjaxInterceptor.complete();
       } else {        
         // token contains id, last4, and card type
         console.log("success",status,response)
         $scope.card.token = response.id;
         $scope.card.number = response.card.last4;
         $scope.card.type = response.card.type;                
         $scope.card.$save({accountId:ACCOUNT_ID},success,error);         

    };

    function success(){
      console.log('success');
      $scope.errorMessage = "";
      $scope.isEditing = false;
      $scope.isPosting = false;
      //TODO display an alert to the user that his card will be charged
      PendingInvoice.get({accountId:ACCOUNT_ID},function (invoice){              
          if (invoice.id){ //if we have an invoice, try to pay it
              StripeCharge.get({accountId:ACCOUNT_ID,invoiceId:invoice.id},
                function(result){
                  //if the payment is a success set the billing date for one month from the original billing date                  
                  Account.query({accountId:ACCOUNT_ID},function(result){
                      var account = result[0];
                      var tempDate = new Date(account.billingDate);
                      tempDate.setMonth(tempDate.getMonth() + 1);
                      account.billingDate = tempDate;
                      account.$put({accountId:ACCOUNT_ID},
                      function(result){                          
                          $AjaxInterceptor.complete();
                          console.log(result,"updated billing date");
                      },function(){
                        console.log("error");   
                        $AjaxInterceptor.complete();
                      });
                  },function(){
                    console.log("error -  ");   
                    $AjaxInterceptor.complete();
                  })

              },function (error){
                  console.log("error",error);                    
                  $AjaxInterceptor.complete();  
              });
          } else {
            $AjaxInterceptor.complete();
          }
      },function(){
        $AjaxInterceptor.complete();
      });    
    }

    function error(error){            
      $scope.isPosting = false;
      $scope.errorMessage = error.data.message;  
      $AjaxInterceptor.complete();   
    }    
  }

  $scope.cancelSaving = function(){
    $scope.card.number = oldCard;
    $scope.isPosting =false;
    $scope.isEditing =false;
  }

  getStripeKey();
}]);	