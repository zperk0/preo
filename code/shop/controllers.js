//shop
var appCtrls = angular.module('shop.controllers',[]);
  
appCtrls.controller('shopController', function($scope,$http,Resources,FEATURES,ACCOUNT_ID) {    
    $scope.currentScreenshot = 0;

    $scope.PremiumFeatures = FEATURES;
    $scope.accountFeatures = [];
    $scope.finishedLoading = false;      
    getAccountFeatures();
    
    function getAccountFeatures(){
      Resources.AccountFeatures.query({accountId:ACCOUNT_ID},function(result){    
        $scope.accountFeatures = result;
        $scope.finishedLoading = true;         

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


    $scope.clickBuy = function(feature){

        Resources.AccountCard.get({accountId:ACCOUNT_ID},
          function(result){          
            
            if (result.token && result.token!=null){
                                
                var invoice = new Resources.Invoice(feature);
                console.log("beforeSave",invoice);
                invoice.$save({accountId:ACCOUNT_ID},function(result){                  
                  console.log(result,"sending:",result.id);                  
                  //created the invoice, now try to pay it.
                  Resources.StripeCharge.save({invoiceId:result.id},
                    function(result){
                      //if we get a success here, the charge was good! enable account feature
                      console.log('innnermost result',result)
                      if (result && result.status == "SUCCESS"){
                        var accountFeature = new Resources.AccountFeatures({                  
                          feature:feature
                        });                               
                        accountFeature.status ="INSTALLED";                          
                        accountFeature.$put({accountId:ACCOUNT_ID,featureId:feature.id},
                          function(result){
                              getAccountFeatures();
                              $('#successDialog').foundation('reveal', 'open');        
                          },function(error){
                              displayErrorNoty();
                          });
                      } else {
                        //set this invoice as rejected. this is a one time purchase, either it succeeds now or it's rejected
                        rejectInvoice(invoice);
                      }
                      
                      console.log('saved!');
                  }, function (error){
                    rejectInvoice(invoice);

                  });                  
              },function(error){
                  rejectInvoice(invoice);
              });                  
            } else {
               //we have a card but no token. something was wrong when registering the card
               $('#errorDialog').foundation('reveal', 'open');
            }          
        },function(error){          
          if (error.data && error.data.status === 404){
                $('#errorDialog').foundation('reveal', 'open');
          } else{
              displayErrorNoty()
            }                       
        });
    }

    function rejectInvoice(invoice){
      console.log("rejecting",invoice);
      invoice.status = "REJECTED";
      invoice.payDate = null;
      invoice.$put({invoiceId:invoice.id})
      console.log("error");                        
      $('#errorDialog').foundation('reveal', 'open');

    }

    $scope.navigateTo = function(place){        
        window.location.assign(place);
    }
    
    $scope.dismissDialog = function(dialog){
        $('#featureDialog').foundation('reveal', 'close');
        $('#'+dialog).foundation('reveal', 'close');
        //FIXME not sure why this is not working as it should.
        //$(".reveal-modal-bg").css({"display":"none"});
    }

    $scope.isFeatureOwned = function(feature){      
      var found = false;      
        if (feature && $scope.accountFeatures && $scope.accountFeatures.length >0){
            angular.forEach($scope.accountFeatures,function(accountFeature){                            
                if (feature.id == accountFeature.featureId && accountFeature.status != "CANCELED"){
                  found = true;
                }
            });
        }        
        return found;
    }

    function displayErrorNoty(){
         noty({
              type: 'error',  layout: 'topCenter',
              text: _tr("Sorry, but there's been an error processing your request.") //text: 'Connection Error! Check API endpoint.'
            });  
    }

});