//shop
var appCtrls = angular.module('shop.controllers',[]);
  
appCtrls.controller('shopController', function($scope,$http,Resources,FEATURES,ACCOUNT_ID) {    
    $scope.PremiumFeatures = FEATURES;
    $scope.accountFeatures = [];
    getAccountFeatures();

    function getAccountFeatures(){
      Resources.AccountFeatures.query({accountId:ACCOUNT_ID},function(result){    
        $scope.accountFeatures = result;
      });
    }
    
    $scope.setSelectedFeature = function(index){      
        $scope.selectedFeature = {
            index:index,
            feature:$scope.PremiumFeatures[index]
        };
    }

    $scope.selectNextFeature = function(){
      var index = $scope.selectedFeature.index;
        if (index < $scope.PremiumFeatures.length-1){
          index++;
          $scope.selectedFeature = {
              index:index,
              feature:$scope.PremiumFeatures[index]
         };
      }
    }

    $scope.selectPreviousFeature = function(){
        var index = $scope.selectedFeature.index;
        if (index > 0){
          index--;
          $scope.selectedFeature = {
              index:index,
              feature:$scope.PremiumFeatures[index]
         };
      }
    }    

    $scope.clickBuy = function(feature){
        Resources.AccountCard.get({accountId:ACCOUNT_ID},
          function(result){          
            
            if (result.token && result.token!=null){
                                
                var invoice = new Resources.Invoice(feature)
                console.log("beforeSave",invoice);
                invoice.$save({accountId:ACCOUNT_ID},function(result){                  
                  console.log(result,"sending:",result.id);

                  //created the invoice, now try to pay it.
                  Resources.StripeCharge.get({accountId:ACCOUNT_ID,invoiceId:result.id},function(result){
                      //if we get a success here, the charge was good! enable account feature
                      console.log('innnermost result',result)
                      if (result && result.status == "PAID"){
                        var accountFeature = new Resources.AccountFeatures({                  
                          feature:feature
                        });                                 

                        accountFeature.$save({accountId:ACCOUNT_ID},
                          function(result){
                              getAccountFeatures();
                              $('#successDialog').foundation('reveal', 'open');        
                          },function(error){
                              displayErrorNoty();
                          });
                      } else {
                        //set this invoice as rejected. this is a one time purchase, either it succeeds now or it's rejected
                        invoice.status = "REJECTED";
                        invoice.payDate = null;
                        invoice.$put()
                        console.log("error");                        
                        $('#errorDialog').foundation('reveal', 'open');
                      }
                      
                      console.log('saved!');
                  }, function (error){
                    console.log("error",error);

                  });                  
              },function(error){
                  console.log('here',error);
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

    $scope.navigateTo = function(place){        
        window.location.assign(place);
    }
    
    $scope.dismissDialog = function(dialog){        
        $('#'+dialog).foundation('reveal', 'close');
    }

    $scope.isFeatureOwned = function(feature){      
      var found = false;      
        if (feature && $scope.accountFeatures && $scope.accountFeatures.length >0){
            angular.forEach($scope.accountFeatures,function(accountFeature){                            
                if (feature.id == accountFeature.featureId)
                  found = true;
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