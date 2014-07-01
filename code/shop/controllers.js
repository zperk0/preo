//shop
var appCtrls = angular.module('shop.controllers',[]);
  
appCtrls.controller('shopController', function($scope, $http, Resources, FEATURES, ACCOUNT_ID, $notification) {    
    $scope.currentScreenshot = 0;

    $scope.PremiumFeatures = FEATURES;
    $scope.accountFeatures = [];
    $scope.finishedLoading = false;      
    getAccountFeatures();
    
    function getAccountFeatures() {
      Resources.AccountFeatures.query({accountId:ACCOUNT_ID},function(result){    
        $scope.accountFeatures = result;
        $scope.finishedLoading = true;         
        console.log('accountFeatures',$scope.accountFeatures);
      });
    }

        

    $scope.getScreenshot = function(){
        if ($scope.selectedFeature){
          return $scope.selectedFeature.feature.promoImgs[$scope.currentScreenshot];
        }
        else 
          return "";
    };

    $scope.showNextScreenshot = function(){         
      if ($scope.selectedFeature && $scope.selectedFeature.feature.promoImgs.length-1 > $scope.currentScreenshot){
        $scope.currentScreenshot++;      
      } else {
        console.log("else", $scope.selectedFeature);
      }
    }
    $scope.showPreviousScreenshot = function(){
      if ($scope.currentScreenshot > 0){
        $scope.currentScreenshot--;             
      }
    }

    $scope.setSelectedFeature = function(index){      
        $scope.currentScreenshot = 0;
        $scope.selectedFeature = {
            index:index,
            feature:$scope.PremiumFeatures[index]
        };        
    }

    //TODO make this a default modal-preoday
    $scope.dismissAndShowDialog = function(which){
      console.log('dismissing')
      $('#featureModal').on("closed", function closed() {
        $scope.showDialog(which);
        $(this).off('closed',closed);        
      });
      $('#featureModal').foundation('reveal', 'close');
    }

    $scope.showDialog = function(which){            
       console.log("showing dialog",which);        
       var feature = $scope.selectedFeature.feature;  
       var clickOk;
       var clickCancel;
       var data; 
        switch (which){
          case "purchase":
            data = { 
              title: feature.name,
              content: _tr("Your card will be charged ") +"<b>£"+feature.upfrontPrice.toFixed(2) + "</b>" + _tr(" for this transaction. <br/> You may cancel this Premium Feature at any time from your account settings page."),
              showTerm: true,
              btnOk: _tr('BUY'),            
              windowClass:'medium'
            }        
            clickOk = clickBuy;            
          break; 
          case "trial":
            data = { 
              title: feature.name + " - " + feature.trialPeriod + _tr(" DAY FREE TRIAL"),
              content: _tr("Your card will not be charged for this transaction. <br/> You may cancel this Premium Feature at any time from your account settings page."),
              showTerm: true,
              btnOk: _tr('BUY'),            
              windowClass:'medium'
            }        
            clickOk = clickBuy;            
          break; 
          case "success":
            data = { 
              title: _tr("Your new Premium Feature is now live!"),
              content: _tr("You can manage subscriptions from your account settings page"),
              showTerm: false,
              btnOk: _tr('ACCOUNT SETTINGS'),
              btnCancel: _tr('RETURN TO STORE'),            
              windowClass:'medium'
            }        
            clickOk = function(){$scope.navigateTo('/accountSettings#/subscription')};            
          break; 
          case "paymentError":
            data = { 
              title: _tr("Error"),
              content: $scope.paymentFailedMessage,
              showTerm: false,
              btnOk: _tr('ALTER PAYMENT METHOD'),
              btnCancel: _tr('RETURN TO STORE'),            
              windowClass:'medium'
            }        
            clickOk = function(){$scope.navigateTo('/accountSettings#/paymentMethod')};            
          break; 
          case "noPayment":
            data = {               
              content: _tr("Please add a payment method to your account in order to subscribe to Premium Features"),
              showTerm: false,
              btnOk: _tr('ADD PAYMENT METHOD'),
              btnCancel: _tr('RETURN TO STORE'),            
              windowClass:'medium'
            }        
            clickOk = function(){$scope.navigateTo('/accountSettings#/paymentMethod')};            
          break; 
        }            
        $notification.confirm(data).then(clickOk,clickCancel);
      
      
    }


    $scope.startTrial = function(){
      if (!$scope.acceptTerm)
        return;
      var feature = $scope.selectedFeature.feature;
      Resources.AccountFeatures.save({accountId:ACCOUNT_ID,featureId:feature.id},function(accountPayment){        
        console.log('response:',accountPayment);  
        if (accountPayment.status ===  "SUCCESS"){
          getAccountFeatures();
          $('#successDialog').foundation('reveal', 'open');          
        }                         
      },function(error){                        
        $('#startTrialDialog').foundation('reveal', 'close');          
        displayErrorNoty();
      });
    }
    

     function clickBuy(){
        var feature = $scope.selectedFeature.feature;
        Resources.AccountCard.get({accountId:ACCOUNT_ID},
          function(result){          
            
            if (result.token && result.token!=null){               
                Resources.AccountFeatures.save({accountId:ACCOUNT_ID,featureId:feature.id},function(accountPayment){
                        if (accountPayment.status ===  "SUCCESS"){
                          getAccountFeatures();
                          $scope.showDialog("success");
                        } else {                        
                          var response = JSON.parse(accountPayment.response);
                          $scope.paymentFailedMessage = response.detail_message;
                          $scope.showDialog("paymentError");
                        }                        
                      },function(error){                        
                        displayErrorNoty();
                });
                                        
            }          
        },function(error){          
          if (error.data && error.data.status === 404){
                $scope.showDialog("noPayment");
          } else{
              displayErrorNoty()
            }                       
        });
    }

  
    $scope.navigateTo = function(place){        
        window.location.assign(place);
    }

    $scope.getFeatureStatus = function(feature){
      var found = false;      
        if (feature && $scope.accountFeatures && $scope.accountFeatures.length >0){
            angular.forEach($scope.accountFeatures,function(accountFeature){                            
                if (feature.id == accountFeature.featureId){
                  found = accountFeature.status;
                }
            });
        }        
        return found;
    }

    $scope.isFeatureInstalled = function(feature){
      var found = false;      
        if (feature && $scope.accountFeatures && $scope.accountFeatures.length >0){
            angular.forEach($scope.accountFeatures,function(accountFeature){                                          
                if (accountFeature.featureId == feature.id)                  
                if (feature.id == accountFeature.featureId && (accountFeature.status === "INSTALLED" || accountFeature.status === "TRIAL" || accountFeature.status === "UNINSTALLED") ){
                  found = true;
                }
            });
        }        
      return found;
    }
    $scope.isFeatureOwned = function(feature){      
      var found = false;      
        if (feature && $scope.accountFeatures && $scope.accountFeatures.length >0){
            angular.forEach($scope.accountFeatures,function(accountFeature){                            
              if (feature.id == accountFeature.featureId){
              }
                if (feature.id == accountFeature.featureId && accountFeature.status != "CANCELED" && accountFeature.status != "REMOVED" && accountFeature.status != "UNINSTALLED" && accountFeature.status != "EXPIRED" ){                
                  found = true;
                }
            });
        }        
      return found;
    }

    $scope.getExpiryDate = function(feature){
       var found = 0;      

        if (feature && $scope.accountFeatures && $scope.accountFeatures.length >0){
            angular.forEach($scope.accountFeatures,function(accountFeature){                      
                if (feature.id == accountFeature.featureId){
                  if (accountFeature.endDate !== null)
                    found = Math.floor(( new Date(accountFeature.endDate).getTime() -  new Date().getTime()) / (1000 * 3600 * 24))
                }
            });
        }        
        return found ;
        
    }

    function displayErrorNoty(){
         noty({
              type: 'error',  layout: 'topCenter',
              text: _tr("Sorry, but there's been an error processing your request.") //text: 'Connection Error! Check API endpoint.'
            });  
    }

});