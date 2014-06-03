//shop
var appCtrls = angular.module('shop.controllers',[]);
  
appCtrls.controller('shopController', function($scope,$http,Resources,FEATURES,ACCOUNT_ID) {    
    $scope.PremiumFeatures = FEATURES;
    $scope.accountFeatures = [];
    getAccountFeatures();

    function getAccountFeatures(){
      Resources.AccountFeaturesList.query({accountId:ACCOUNT_ID},function(result){    
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
            console.log("got",result);
            if (result.token && result.token!=null){
                //TODO make a request to stripe to do the payment                                
                var accountFeature = new Resources.AccountFeature(feature);
                accountFeature.$save({accountId:ACCOUNT_ID},
                function(result){ 
                    getAccountFeatures();
                    $('#successDialog').foundation('reveal', 'open');        
                },function(error){
                    displayErrorNoty()
                });
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
              console.log(feature,accountFeature);
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