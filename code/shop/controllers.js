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

    //TODO fix the chevrons logic to slide on the images
    $scope.setSelectedFeature = function(index){      
        $scope.currentScreenshot = 0;
        $scope.selectedFeature = {
            index:index,
            feature:$scope.PremiumFeatures[index]
        };
    }


    /****Free Trial***/

    $scope.selectFreeTrial = function(){

      $notification.confirm({
        title: 'Know Your Customer - 30 DAY FREE TRIAL',
        content: 'Your card will not be charged for this transaction. <br /> You may cancel this trial at any time from your account settings page.',
        showTerm: true,
        msgTerm: 'I have read the Terms and Conditions',
        btnOk: 'Begin Trial'
      }).then(function(){
        // success
        console.log('success click');
      }, function(){
        // cancel
        console.log('calcel click');
      });

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
    

    $scope.clickBuy = function(feature){

        Resources.AccountCard.get({accountId:ACCOUNT_ID},
          function(result){          
            
            if (result.token && result.token!=null){               
                Resources.AccountFeatures.save({accountId:ACCOUNT_ID,featureId:feature.id},function(accountPayment){
                        if (accountPayment.status ===  "SUCCESS"){
                          getAccountFeatures();
                          $('#successDialog').foundation('reveal', 'open');          
                        } else {                        
                          var response = JSON.parse(accountPayment.response);
                          $scope.paymentFailedMessage = response.detail_message;
                          $('#paymentErrorDialog').foundation('reveal', 'open');
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

  
    $scope.navigateTo = function(place){        
        window.location.assign(place);
    }
    
    $scope.dismissDialog = function(dialog){
        $('#featureDialog').foundation('reveal', 'close');
        $('#'+dialog).foundation('reveal', 'close');
        //FIXME not sure why this is not working as it should.
        $(".reveal-modal-bg").css({"display":"none"});
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
    $scope.isFeatureOwned = function(feature){      
      var found = false;      
        if (feature && $scope.accountFeatures && $scope.accountFeatures.length >0){
            angular.forEach($scope.accountFeatures,function(accountFeature){                            
                if (feature.id == accountFeature.featureId && accountFeature.status != "CANCELED" && accountFeature.status != "REMOVED" ){
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
                if (feature.id == accountFeature.featureId && accountFeature.status == "TRIAL"){
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