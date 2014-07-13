angular.module('accountSettings.controllers')
 .controller('SubscriptionCtrl', ['$scope','$q','$http','ACCOUNT_ID','AccountCard','Account',"FEATURES",'AccountFeature','StripeCharge','Invoice','$notification','$AjaxInterceptor',
  function ($scope,$q,$http,ACCOUNT_ID,AccountCard,Account,FEATURES,AccountFeature,StripeCharge,Invoice,$notification,$AjaxInterceptor) {
    

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
    
    $scope.showDialog = function(which){
       var clickOk;
       var clickCancel;
       var data; 
        switch (which){
          case "uninstall":
            data = { 
              content: _tr("This Premium Feature will remain active on your account until the end of the current billing cycle. You can cancel this uninstall at any time. If you wish to reinstall this Premium Feature after it has been deactivated, simply click on the <span>reinstall</span> option.")+"<br/><br/><b>"+_tr("Are you sure you want to uninstall this Premium Feature?")+"</b>",
              showTerm: false,
              btnOk: _tr('UNINSTALL'),            
              windowClass:'medium'
            }        
            clickOk = function(){$scope.updateStatus($scope.selectedFeature,"UNINSTALLED")};
          break; 
          case "uninstallTrial":
            data = { 
              content: _tr("Your free trial will be imediately canceled and you will no longer have access to this feature.")+"<br/><br/><b>"+_tr("Are you sure you want to cancel this Free Trial? This action cannot be undone?")+"<b/>",
              showTerm: false,
              btnOk: _tr('UNINSTALL'),            
              windowClass:'medium'
            }        
            clickOk = function(){$scope.updateStatus($scope.selectedFeature,"EXPIRED")}
          break; 
          case "reinstall":
          console.log('reinstalling',$scope.selectedFeature.feature.$terms);
            data = { 
              content: _tr("This Premium Feature is currently canceled. A new charge will be made to your card before reinstalling this feature.")+"<br/><br/><b>"+_tr("Are you sure you want to reinstall this Premium Feature?")+"<b/>",
              showTerm: ($scope.selectedFeature.feature.$terms && $scope.selectedFeature.feature.$terms.purchase) ? $scope.selectedFeature.feature.$terms.purchase : false,
              btnOk: _tr('REINSTALL'),            
              windowClass:'medium'
            }   
            clickOk = function(){purchaseFeature($scope.selectedFeature)}
          break;          
          case "paymentError":
             data = { 
               title: _tr("Error"),
              content: $scope.paymentFailedMessage,
              showTerm: false,
              btnOk: _tr('PAYMENT METHOD'),                  
              windowClass:'medium'              
            }        
            clickOk = function(){$scope.navigateTo('/accountSettings#/paymentMethod')}
          break;
          case "success":
            data = {
              title:_tr("Your new Premium Feature is now live!"),
              content: _tr("You can manage subscriptions from your account settings page"),
              showTerm: false,
              btnOk:false,
              btnCancel:_tr("OK"),            
              windowClass:'medium'
            }
          break;
        }
      $notification.confirm(data).then(clickOk,clickCancel);
    };


    $scope.navigateTo = function(place){
      if (place && place != "")
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
          $scope.showDialog("uninstallTrial");
        else
          $scope.showDialog("uninstall");
    }

        
    $scope.updateStatus=function(accountFeature,status){        
        //TODO how to not do this?
        var previousStatus = accountFeature.status;
        accountFeature.status = status;
        accountFeature.$put({accountId:accountFeature.accountId,featureId:accountFeature.featureId},function(result){
          console.log("Put account feature success",result,status,accountFeature);
          accountFeature.feature = getFeatureById(accountFeature.featureId);
          setActiveCount();
          
        },function(error){
          console.log("Put account feature fail",error);
          accountFeature.status = previousStatus;
          displayErrorNoty();
        });
    }

    $scope.reinstallAccountFeature = function(accountFeature){
      $scope.selectedFeature = accountFeature;
      $scope.showDialog("reinstall");
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
      $AjaxInterceptor.start();
        AccountCard.get({accountId:ACCOUNT_ID},
          function(result){                      
            if (result.token && result.token!=null){               
                AccountFeature.save({accountId:ACCOUNT_ID,featureId:feature.id},function(accountPayment){
                  console.log('here',accountPayment);
                        if (accountPayment.status ===  "SUCCESS"){
                          loadAll(function (){
                            $AjaxInterceptor.complete();
                            $scope.showDialog('success');                            
                          });                             
                        } else {                        
                          $AjaxInterceptor.complete();
                          var response = JSON.parse(accountPayment.response);
                          $scope.paymentFailedMessage = response.detail_message;
                          $scope.showDialog("paymentError")                          
                        }                        
                      },function(error){              
                        $AjaxInterceptor.complete();          
                        displayErrorNoty();
                });
                                          
            }          
        },function(error){          
          if (error.data && error.data.status === 404){
                $scope.showDialog("paymentError")
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