angular.module('accountSettings.controllers')
 .controller('SubscriptionCtrl', ['$scope','$q','$http','ACCOUNT_ID','AccountCard','Account',"FEATURES",'AccountFeature',
  function ($scope,$q,$http,ACCOUNT_ID,AccountCard,Account,FEATURES,AccountFeature) {
    var allFeatures = FEATURES;
    $scope.setSelected($scope.Views.subscription);
    $scope.diffInDays = 0;
    Account.get({id:ACCOUNT_ID},function(result){
      $scope.account = result;
      setBillingDate();
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

     return $scope.accountFeatures && $.grep($scope.accountFeatures, function(e){ return e.status == "CANCELLED"; }).length > 0;
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

    function setBillingDate(){
        if ($scope.account && $scope.account.billingDate){
          var d = new Date($scope.account.billingDate)
          var now = new Date();
          console.log(d,now);
          console.log(Math.floor((now - d)/ (1000 * 60 * 60 * 24)))
          $scope.diffInDays = 14 + Math.floor((now - d)/ (1000 * 60 * 60 * 24));
        }
        else 
          $scope.diffInDays =0;
    }
    
}])