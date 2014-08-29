angular.module('accountSettings.controllers')
 .controller('PaymentCtrl', ['$scope','$q','$http','ACCOUNT_ID','AccountCard','Account','$AjaxInterceptor','AccountInvoice','$notification',
  function ($scope,$q,$http,ACCOUNT_ID,AccountCard,Account,$AjaxInterceptor,AccountInvoice,$notification) {
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
         $scope.card.$save({accountId:ACCOUNT_ID},success,stripeError);         

    };

    var verifyShopFeature = function(){
        var featureCard = window.sessionStorage.getItem("featureCard");
        
        if ( featureCard && featureCard !== 'false' ) {
          featureCard = angular.fromJson(featureCard);
          featureCard.card = true;

          window.sessionStorage.setItem("featureCard", angular.toJson(featureCard));

          window.location.assign('/shop');
        }      
    }

    function success(){
      console.log('success');
      $scope.errorMessage = "";
      $scope.isEditing = false;
      $scope.isPosting = false;
      //successfully changed the account card. now we check if there is a billing date in the past
      Account.query({accountId:ACCOUNT_ID},function(result){
          var account = result[0];
          if (moment().valueOf() > moment(account.billingDate).valueOf()){
            //if there is a billing date in the past, the user owes us money. try to renew the subscriptions
            AccountInvoice.payPending({accountId:ACCOUNT_ID},function(result){
                console.log('got pay pending result',result)                              
                $AjaxInterceptor.complete();
                if (result.status === "SUCCESS"){             

                  AccountInvoice.get({accountId:ACCOUNT_ID,invoiceId:result.invoiceId},function(invoice){
                      console.log('got invoice',invoice);
                       $notification.confirm({                           
                          title: _tr("Outstanding payment resolved"),
                          scope: invoice,                          
                          templateUrl: 'subscriptionpayment.php',              
                          showTerm: false,
                          btnOk: false, 
                          btnCancel: _tr("Ok"),            
                          windowClass:'small'
                      })                
                  },function(){
                      $notification.confirm({
                      title: _tr("Payment method updated succesfully!"),
                      content: _tr("Your outstand payment has been paid. Your card was charged <b>&pound;" + result.ammount.toFixed(2) + "</b> and your premium features will remain active."),
                      showTerm: false,
                      btnOk:false,
                      btnCancel: _tr('OK'),
                      windowClass:'medium'
                    })                
                  });
                } else{
                  console.log('got error');
                  apiError(result);
                }                
            },apiError);
          } else{
            $AjaxInterceptor.complete();   
            verifyShopFeature(); 
          }        
      },apiError);    
    }

    function apiError(error){
      console.log('error',error);
      noty({
        type: 'error',  layout: 'topCenter',
        text: _tr("Sorry, but there's been an error processing your request.") //text: 'Connection Error! Check API endpoint.'
      });  
      $scope.isPosting = false;
      $scope.isEditing = true;
      $scope.card.number = "";        
      if(error.response !== undefined && error.response !== ""){
        var response = angular.fromJson(error.response);        
        $scope.errorMessage = response.detail_message;          
      }
      $AjaxInterceptor.complete();
    }

    function stripeError(error){            
      $scope.isPosting = false;
      $scope.isEditing = true;
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