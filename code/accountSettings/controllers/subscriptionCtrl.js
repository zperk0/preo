angular.module('accountSettings.controllers')
 .controller('SubscriptionCtrl', ['$scope','$q','$http','ACCOUNT_ID','AccountCard','Account',"FEATURES",'AccountFeature','StripeCharge','Invoice',
  function ($scope,$q,$http,ACCOUNT_ID,AccountCard,Account,FEATURES,AccountFeature,StripeCharge,Invoice) {
    //FIXME find a way to not have to do this.
     $(".featureDialog").on('opened', function() {
      var that = this;
      setTimeout(function(){
        $(that).addClass('active');  
      },1)    
    }).on('closed',function(){
        console.log("closed!",this);
        $(this).removeClass("active");
    });

    var allFeatures = FEATURES;
    $scope.setSelected($scope.Views.subscription);
    $scope.diffInDays = 0;
    loadAll();


    function loadAll(callback){
        $q.all([           
            AccountFeature.query({accountId:ACCOUNT_ID}).$promise,            
            Account.get({id:ACCOUNT_ID}).$promise
        ])
        .then(function(results){                         
            $scope.accountFeatures = results[0];            
            $scope.account = results[1];
            setBillingDate();          
            angular.forEach($scope.accountFeatures,function(accountFeature){              
                accountFeature.feature = getFeatureById(accountFeature.featureId);
            });
            setActiveCount();
            if (callback)
              callback();
            AccountCard.get({accountId:ACCOUNT_ID},function(result){
                $scope.card = result;
                $scope.finishLoading();
            },function(error){
                $scope.card = false;  
                $scope.finishLoading();
            })
        },
        function(error){          
            displayErrorNoty();
      });    
    }
    
    $scope.isInstalled = function(accountFeature){              
        return !((accountFeature.status === 'CANCELED') || (accountFeature.status === 'REMOVED') || (accountFeature.status === 'EXPIRED'));
    }
    $scope.isCanceled = function(accountFeature){              
        return (accountFeature.status === 'CANCELED') || (accountFeature.status === 'EXPIRED');
    }
  


    $scope.navigateTo = function(place){
    	window.location.assign(place);
    }

    $scope.getTotalSubscription = function (){
      var sum = 0;
      angular.forEach($scope.accountFeatures,function(feature){
        if (feature.status == "INSTALLED")
          sum += feature.subscriptionPrice;
      });
    	return sum;
    }

    $getFeatureIcon = function(accountFeature){
      var feature = etFeatureById(accountFeature.featureId);
      return feature.icon;
    }

    function getFeatureById(id){
      return $.grep(allFeatures, function(e){ return e.id == id; })[0];   
    }

    $scope.hasCancelledFeatures = function(){      
     return $scope.accountFeatures && $.grep($scope.accountFeatures, function(e){ return (e.status == "CANCELED" || e.status == "EXPIRED");  }).length > 0;
    } 

    function setActiveCount(){
      $scope.activeFeaturesCount = $.grep($scope.accountFeatures, function(e){ return (e.status != "CANCELED" && e.status != "REMOVED" && e.status != "EXPIRED"); }).length > 0;

    }

    $scope.openConfirmDialog = function(feature){
        $scope.selectedFeature = feature;
        if (feature.status == "TRIAL")
          $('#uninstallTrial').foundation('reveal', 'open');
        else
          $('#confirmationDialog').foundation('reveal', 'open');
    }

    $scope.dialogConfirm = function(dialog){

      switch (dialog){
        case "confirmationDialog": 
          $scope.updateStatus($scope.selectedFeature,"UNINSTALLED")
          break;
        case "uninstallTrial":
          $scope.updateStatus($scope.selectedFeature,"EXPIRED")
          break;
        case "reinstallDialog":
          purchaseFeature($scope.selectedFeature)
          break;
      } 
      
    }
    $scope.dialogCancel = function(dialog){
      $('#'+dialog).foundation('reveal', 'close');
    }


    $scope.updateStatus=function(accountFeature,status){        
        //TODO how to not do this?
        var previousStatus = accountFeature.status;
        accountFeature.status = status;
        accountFeature.$put({accountId:accountFeature.accountId,featureId:accountFeature.featureId},function(result){
          accountFeature.feature = getFeatureById(accountFeature.featureId);
          setActiveCount();
          $('#confirmationDialog').foundation('reveal', 'close');
        },function(error){
          accountFeature.status = previousStatus;
          displayErrorNoty();
        });
    }

    $scope.reinstallAccountFeature = function(accountFeature){
      $scope.selectedFeature = accountFeature;
      $('#reinstallDialog').foundation('reveal', 'open');
    }

    $scope.removeAccountFeature = function(accountFeature){
      $scope.updateStatus(accountFeature,"REMOVED");      
    }

    function setBillingDate(){
        if ($scope.account && $scope.account.billingDate){
          var d = new Date($scope.account.billingDate)
          var now = new Date();
          console.log(d,now);
          console.log(Math.floor((now - d)/ (1000 * 60 * 60 * 24)))
          if (d >now )
              $scope.diffInDays = 0;
          else
            $scope.diffInDays = 14 - Math.floor((now - d)/ (1000 * 60 * 60 * 24));
        }
        else 
          $scope.diffInDays =0;
    }

    function purchaseFeature(accountFeature){
      var feature = accountFeature.feature;      
        AccountCard.get({accountId:ACCOUNT_ID},
          function(result){                      
            if (result.token && result.token!=null){               
                AccountFeature.save({accountId:ACCOUNT_ID,featureId:feature.id},function(accountPayment){
                  console.log('here',accountPayment);
                        if (accountPayment.status ===  "SUCCESS"){
                          loadAll(function (){
                               $('#successDialog').foundation('reveal', 'open');         
                          });                             
                        } else {                        
                          var response = JSON.parse(accountPayment.response);
                          $scope.paymentFailedMessage = response.detail_message;
                          $('#paymentErrorDialog').foundation('reveal', 'open');
                          console.log('revealed error dialog');
                        }                        
                      },function(error){                        
                        displayErrorNoty();
                });
                                          
            }          
        },function(error){          
          if (error.data && error.data.status === 404){
                $('#noPaymentDialog').foundation('reveal', 'open');
          } else{
              displayErrorNoty()
            }                       
        });
    }

     $scope.getExpiryDate = function(accountFeature){
        return Math.floor(( new Date(accountFeature.endDate).getTime() -  new Date().getTime()) / (1000 * 3600 * 24))        
    }

    
    
      function displayErrorNoty(){
        noty({
              type: 'error',  layout: 'topCenter',
              text: _tr("Sorry, but there's been an error processing your request.") //text: 'Connection Error! Check API endpoint.'
          });
      }

}])