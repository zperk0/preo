//shop
var appCtrls = angular.module('shop.controllers',[]);
  
appCtrls.controller('shopController', function($scope,$http,Resources,FEATURES,ACCOUNT_ID) {    
    $scope.PremiumFeatures = FEATURES;
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
        //check if the user has a payment method         
        Resources.AccountCard.get({accountId:ACCOUNT_ID},function(result){
            //if we have status it's an error
            if (result.token && result.token!=null){
              $('#successDialog').foundation('reveal', 'open');              
            }          
        },function(error){
          
          if (error.data && error.data.status === 404){
                  $('#errorDialog').foundation('reveal', 'open');
          } else{
              noty({
                type: 'error',  layout: 'topCenter',
                text: _tr("Sorry, but there's been an error processing your request.") //text: 'Connection Error! Check API endpoint.'
              });  
            }                       
        });
    }

    $scope.navigateTo = function(place){        
        window.location.assign(place);
    }
    
    $scope.dismissDialog = function(dialog){        
        $('#'+dialog).foundation('reveal', 'close');
    }


});