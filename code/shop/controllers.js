//shop
var appCtrls = angular.module('shop.controllers',[]);
  
appCtrls.controller('shopController', ['$scope', '$http', 'Resources', 'ACCOUNT_ID', '$notification','$AjaxInterceptor','$location','AccountFeature','USER_ID','VENUE_ID',
  function($scope, $http, Resources, ACCOUNT_ID, $notification,$AjaxInterceptor,$location,AccountFeature,USER_ID,VENUE_ID) {    

    
    function initModalFromPath(){
      if ($location.path() != ''){   
        var parts = $location.path().split("/");           
        if (parts[1] === 'feature'){            
            var featureId = Number(parts[2]);
            $scope.setSelectedFeature(featureId);
            $('#featureModal').foundation('reveal', 'open');
            $location.path('');
        }
      }
    }
    
    $AjaxInterceptor.start(); 
    
    $scope.currentScreenshot = 0;
    $scope.accountFeatures = [];
    $scope.finishedLoading = false;      
    getAccountFeatures();


    function validateShopCard() {
      var featureCard = window.sessionStorage.getItem("featureCard");

      if ( featureCard && featureCard != 'false' ) {
        featureCard = angular.fromJson(featureCard);

        if ( featureCard.card ) {
          $scope.setSelectedFeature( featureCard.feature );
          window.sessionStorage.setItem("featureCard", false);
          getFeaturePrice($scope.selectedFeature.feature, true);
        }
      }      
    }
    
    
    
    function getAccountFeatures() {
      AccountFeature.query({accountId:ACCOUNT_ID},function(result){    
        $scope.accountFeatures = result;                

        validateShopCard();
        $AjaxInterceptor.complete(); 
        initModalFromPath();
      });
    }

        
    function getFeaturePrice(feature, featureCard){

      $AjaxInterceptor.start();

      AccountFeature.getPrice({accountId:ACCOUNT_ID,featureId:feature.id},
        function(result){                
        $scope.price = result;
          if (feature.contractMonths){
              $scope.price.contractMonths = feature.contractMonths;
          }        
          if ( featureCard ) {
            $scope.showDialog('purchase');
          } else {
            $scope.dismissAndShowDialog("purchase");
          }

          $AjaxInterceptor.complete();
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
      }
    }
    $scope.showPreviousScreenshot = function(){
      if ($scope.currentScreenshot > 0){
        $scope.currentScreenshot--;             
      }
    }

    $scope.setSelectedFeature = function(id){
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
      for (var i=0, len = $scope.PremiumFeatures.length;i<len;i++){        
        var feature = $scope.PremiumFeatures[i]
        if (feature.id === id){
          return feature;
        }
      }
    }

    //TODO make this a default modal-preoday
    $scope.dismissAndShowDialog = function(which){
      $('#featureModal').on("closed", function closed() {
        $scope.showDialog(which);
        $(this).off('closed',closed);        
      });
      $('#featureModal').foundation('reveal', 'close');
    }

    $scope.clickBuy = function(){
      var feature = $scope.selectedFeature.feature;

      var accountCard = function(){
        Resources.AccountCard.get({accountId:ACCOUNT_ID},
          function(){
          getFeaturePrice($scope.selectedFeature.feature);
        },function(error){          
            if (error.data && error.data.status === 404){
                  $scope.dismissAndShowDialog("noPayment");
            } else{
                displayErrorNoty()
              }                       
          }
        );
      };

      if ( feature.hasOwnProperty('depends') && feature.depends.length ) {
        var featureDepends = [];
        for (var i = 0, len = feature.depends.length; i < len; i++) {
          var featureResults = $scope.accountFeatures.filter(function (a) {
            return a.featureId == feature.depends[i];
          })
          if (!featureResults || (featureResults && !featureResults.length)) {
            var f = getFeatureById(feature.depends[i]);
            featureDepends.push({
              id: feature.depends[i],
              name: f.name
            });
          }
        };

        if (featureDepends.length) {
          $scope.featureDepends = featureDepends;
          $scope.dismissAndShowDialog("depends");
        } else {
          accountCard();
        }
      } else {
        accountCard();
      }      
    }

    $scope.clickGetInTouch = function(feature){
      document.location.href = "mailto:hello@preoday.com?subject=Please contact me regarding " + feature.name;
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
              //content: _tr("Your card will be charged ") +"<b>£"+$scope.selectedFeatureCalculatedPrice+ "</b>" + _tr(" for this transaction. <br/> You may cancel this Premium Feature at any time from your account settings page."),
              scope: $scope.price,
              templateUrl: 'purchase.php',
              showTerm: (feature.$terms && feature.$terms.purchase) ? feature.$terms.purchase : false,
              btnOk: _tr('BUY'),            
              windowClass:'small'
            }        
            clickOk = purchaseSelectedFeature;            
          break; 
          case "trial":
            data = { 
              title: feature.name + " - " + feature.trialPeriod + _tr(" DAY FREE TRIAL"),
              showTerm: (feature.$terms && feature.$terms.trial) ? feature.$terms.trial : false,
              btnOk: _tr('START TRIAL'),            
              windowClass:'medium'
            }        
            clickOk = startTrial;            
          break; 
          case "success":
            if ( feature.hasOwnProperty('$link') && feature.$link ) {
              window.sessionStorage.setItem("firsttime_feature_"+feature.id,1);
              $scope.navigateTo( feature.$link );
            } else {
              data = { 
                showTerm: false,
                btnCancel:_tr("OK"),
                btnOk: false,
                windowClass:'medium'
              };

              if (feature.hasOwnProperty('modal') && feature.modal && feature.modal.hasOwnProperty('success')) {
                var modal = feature.modal.success;
                if (modal.title) {
                  data.title = modal.title;
                } else {
                  data.title = _tr("Your new Premium Feature is now live!");  
                }

                if ( modal.content instanceof Array ) {
                  data.content = modal.content.join('<br />');
                } else {
                  data.content = modal.content;
                }
              } else {
                data.title = _tr("Your new Premium Feature is now live!");
                data.content = _tr("You will be contacted shortly by a member of our team. You can manage subscriptions from your <a href='/accountSettings#/subscription'>account settings page.</a>");
              }
            }       
          break; 
          case "paymentError":
            data = { 
              title: _tr("Error"),
              content: $scope.paymentFailedMessage,
              showTerm: false,
              btnOk: _tr('PAYMENT METHOD'),
              windowClass:'medium'
            }        
            clickOk = function(){$scope.navigateTo('/accountSettings#/paymentMethod')};            
          break; 
          case "noPayment":
            data = {               
              content: _tr("Please add a payment method to your account in order to subscribe to Premium Features"),
              showTerm: false,
              btnOk: _tr('ADD CARD'),
              windowClass:'medium'
            }        
            clickOk = function(){
              window.sessionStorage.setItem("featureCard", angular.toJson({feature: feature.id, card: false}));
              $scope.navigateTo('/accountSettings#/paymentMethod')
            };
          break; 
          case "depends":
            var name = $scope.featureDepends.map(function (elem) {
              return elem.name;
            }).join(', ');

            data = {               
              content: _tr("To access this feature you need to have ") + name + _tr(" installed first "),
              showTerm: false,
              btnOk: _tr('Buy ') + name,
              windowClass:'medium'
            }        
            clickOk = function(){
              $scope.setSelectedFeature($scope.featureDepends[0].id);
              $('#featureModal').foundation('reveal', 'open');
            };
          break; 
        }
        if ( data ) {
          $notification.confirm(data).then(clickOk,clickCancel);
        }
      
      
    }


    function startTrial (){
    $AjaxInterceptor.start();           
      var feature = $scope.selectedFeature.feature;
      AccountFeature.save({accountId:ACCOUNT_ID,featureId:feature.id},function(accountPayment){        
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
    

     function purchaseSelectedFeature(obj){
        $AjaxInterceptor.start(); 
        var feature = $scope.selectedFeature.feature;
        Resources.AccountCard.get({accountId:ACCOUNT_ID},
          function(result){                      
            if (result.token && result.token!=null){               
                AccountFeature.save({accountId:ACCOUNT_ID,featureId:feature.id,userId:USER_ID,venueId:VENUE_ID,code:obj.discountCode},
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
                  if (error.status == 412) {
                    var message = error.data.message;
                    message = message.replace('[','').replace(']', '');
                    message = message.split(',');
                    $scope.featureDepends = [];
                    for (var i = 0, len = message.length; i < len; i++) {
                      var id = message[i];
                      $scope.featureDepends.push({
                        id: +id,
                        name: FEATURES.filter(function(a){
                          return a.id == id;
                        })[0].name
                      });
                    };
                    $scope.showDialog("depends");                    
                  } else {
                    displayErrorNoty();
                  }
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

}]);