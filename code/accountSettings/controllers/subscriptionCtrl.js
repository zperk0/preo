angular.module('accountSettings.controllers')
 .controller('SubscriptionCtrl', ['$scope','$q','$http','ACCOUNT_ID','AccountCard','Account',"FEATURES",'AccountFeature',
  function ($scope,$q,$http,ACCOUNT_ID,AccountCard,Account,FEATURES,AccountFeature) {
    var allFeatures = FEATURES;

    Account.get({id:ACCOUNT_ID},function(result){
      $scope.account = result;
      
    })

    AccountFeature.query({accountId:ACCOUNT_ID},function(result){
      $scope.accountFeatures = result;
      angular.forEach($scope.accountFeatures,function(accountFeature){
        accountFeature.feature = getFeatureById(accountFeature.featureId);
      });
      setActiveCount();
    });

  	AccountCard.get({accountId:ACCOUNT_ID},function(result){
  		$scope.card = result;  		
  	},function(error){         
  	  if (error.data && error.data.status === 404){
  		  $scope.card = false;	
      } else{	  
		    	noty({
			      type: 'error',  layout: 'topCenter',
			      text: _tr("Sorry, but there's been an error processing your request.") //text: 'Connection Error! Check API endpoint.'
		    	});  
        }                       
    });


    $scope.navigateTo = function(place){
    	window.location.assign(place);
    }

    $scope.getTotalSubscription = function (){
      var sum = 0;
      angular.forEach($scope.accountFeatures,function(feature){
        if (feature.status != "CANCELLED")
          sum += feature.price;
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
     return (($scope.accountFeatures.length - $scope.activeFeaturesCount) > 0)
    } 

    function setActiveCount(){
      $scope.activeFeaturesCount = $.grep($scope.accountFeatures, function(e){ return e.status != "CANCELLED"; }).length > 0;

    }


    $scope.updateStatus=function(accountFeature,status){        
        accountFeature.status = status;
        accountFeature.$put(function(result){
          accountFeature.feature = getFeatureById(accountFeature.featureId);
          setActiveCount();
        },function(error){
            noty({
              type: 'error',  layout: 'topCenter',
              text: _tr("Sorry, but there's been an error processing your request.") //text: 'Connection Error! Check API endpoint.'
          });  
        });
    }

    
}])