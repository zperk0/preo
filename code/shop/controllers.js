//shop
var appCtrls = angular.module('shop.controllers',[]);
  
appCtrls.controller('shopController', function($scope, $http, Resources, FEATURES, ACCOUNT_ID, $notification,$AjaxInterceptor,$location) {    

    
    function initModalFromPath(){
      if ($location.path() != ''){   
        var parts = $location.path().split("/");   
        console.log('parts1',parts[1],parts[1]==='feature');
        if (parts[1] === 'feature'){            
            var featureId = Number(parts[2]);
            console.log('got feature id :',featureId);
            $scope.setSelectedFeature(featureId);
            $('#featureModal').foundation('reveal', 'open');
            $location.path('');
        }
      }
    }
    
    $AjaxInterceptor.start(); 
    
    $scope.currentScreenshot = 0;
    $scope.PremiumFeatures = FEATURES;
    $scope.accountFeatures = [];
    $scope.finishedLoading = false;      
    getAccountFeatures();
    
    
    
    function getAccountFeatures() {
      Resources.AccountFeatures.query({accountId:ACCOUNT_ID},function(result){    
        $scope.accountFeatures = result;                
        $AjaxInterceptor.complete(); 
        initModalFromPath();
      });
    }

        
    function getFeaturePrice(feature){

      Resources.AccountFeatures.getPrice({accountId:ACCOUNT_ID,featureId:feature.id},
        function(result){                
          //FIXME find out a way to not have to do this. Maybe change the return value in the server?
          console.log('got result',result);
          var price = "";
          angular.forEach(result,function(res){
            if (typeof res === "string")
              price+=res;
          });          
          $scope.selectedFeatureCalculatedPrice = Number(price).toFixed(2);
          $scope.dismissAndShowDialog("purchase");
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

    $scope.setSelectedFeature = function(id){              ;
        $scope.currentScreenshot = 0;
        $scope.selectedFeature = {
            index:id,
            feature:getFeatureById(id)
        };        
        setTimeout(function(){
           $("html, body").animate({ scrollTop: 0 }, "fast");
        },100);
        
    }

    function getFeatureById(id){
      console.log("lenght:",$scope.PremiumFeatures.length);
      console.log($scope.PremiumFeatures);      
      for (var i=0;i<=$scope.PremiumFeatures.length;i++){        
        var feature = $scope.PremiumFeatures[i]
        console.log(id,feature);
        if (feature.id === id){
          return feature;
        }
      }
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

    $scope.clickBuy = function(){
      getFeaturePrice($scope.selectedFeature.feature);
    }

    $scope.clickGetInTouch = function(){
      document.location.href = "mailto:hello@preoday.com?subject=Please contact me regarding Enterprise";
      $('#featureModal').foundation('reveal', 'close');
    }

    $scope.showDialog = function(which){                   
       var feature = $scope.selectedFeature.feature;  
       var clickOk;
       var clickCancel;
       var data = null; 
        switch (which){
          case "purchase":
            data = { 
              title: feature.name,
              content: _tr("Your card will be charged ") +"<b>£"+$scope.selectedFeatureCalculatedPrice+ "</b>" + _tr(" for this transaction. <br/> You may cancel this Premium Feature at any time from your account settings page."),
              showTerm: (feature.$terms && feature.$terms.purchase) ? feature.$terms.purchase : false,
              btnOk: _tr('BUY'),            
              windowClass:'medium'
            }        
            clickOk = purchaseSelectedFeature;            
          break; 
          case "trial":
            data = { 
              title: feature.name + " - " + feature.trialPeriod + _tr(" DAY FREE TRIAL"),
              // content: _tr("Your card will not be charged for this transaction. <br/> You may cancel this Premium Feature at any time from your account settings page."),
              showTerm: (feature.$terms && feature.$terms.trial) ? feature.$terms.trial : false,
              btnOk: _tr('BUY'),            
              windowClass:'medium'
            }        
            clickOk = startTrial;            
          break; 
          case "success":
            if ( feature.hasOwnProperty('$link') && feature.$link ) {
              $scope.navigateTo( feature.$link );
            } else {
              data = { 
                title: _tr("Your new Premium Feature is now live!"),
                content: _tr("You will be contacted shortly by a member of our team. You can manage subscriptions from your <a href='/accountSettings#/subscription'>account settings page.</a>"),
                showTerm: false,
                btnCancel:_tr("OK"),
                btnOk: false,
                windowClass:'medium'
              }
            }       
          break; 
          case "paymentError":
            data = { 
              title: _tr("Error"),
              content: $scope.paymentFailedMessage,
              showTerm: false,
              btnOk: _tr('PAYMENT METHOD'),
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
        if ( data ) {
          $notification.confirm(data).then(clickOk,clickCancel);
        }
      
      
    }


    function startTrial (){
    $AjaxInterceptor.start();           
      var feature = $scope.selectedFeature.feature;
      Resources.AccountFeatures.save({accountId:ACCOUNT_ID,featureId:feature.id},function(accountPayment){        
        console.log('response:',accountPayment);  
        if (accountPayment.status ===  "SUCCESS"){
          getAccountFeatures();
          $scope.showDialog("success");
        }                         
        $AjaxInterceptor.complete();
      },function(error){                        
        $scope.showDialog("trial");
        displayErrorNoty();
        $AjaxInterceptor.complete();
      });
    }
    

     function purchaseSelectedFeature(){
        $AjaxInterceptor.start(); 
        var feature = $scope.selectedFeature.feature;
        Resources.AccountCard.get({accountId:ACCOUNT_ID},
          function(result){          
            
            if (result.token && result.token!=null){               
                Resources.AccountFeatures.save({accountId:ACCOUNT_ID,featureId:feature.id},
                  function(accountPayment){
                    $AjaxInterceptor.complete(); 
                    if (accountPayment.status ===  "SUCCESS"){
                      getAccountFeatures();
                      $scope.showDialog("success");
                    } else {                        
                      var response = JSON.parse(accountPayment.response);
                      $scope.paymentFailedMessage = response.detail_message;
                      $scope.showDialog("paymentError");
                    }                        
                },
                function(error){                
                  $AjaxInterceptor.complete();         
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