angular.module('accountSettings.controllers')
 .controller('SubscriptionCtrl', ['$scope','$q','$http','ACCOUNT_ID','AccountCard','Account',"FEATURES",'AccountFeature',
  function ($scope,$q,$http,ACCOUNT_ID,AccountCard,Account,FEATURES,AccountFeature) {
    var allFeatures = FEATURES;
    $scope.setSelected($scope.Views.subscription);
    $scope.diffInDays = 0;
    
    $q.all([           
          AccountFeature.query({accountId:ACCOUNT_ID}).$promise,
          AccountCard.get({accountId:ACCOUNT_ID}).$promise,
          Account.get({id:ACCOUNT_ID}).$promise
      ])
      .then(function(results){             
          $scope.finishLoading();         
          $scope.accountFeatures = results[0];
          $scope.card = results[1];
          $scope.account = results[2];
          setBillingDate();          
          angular.forEach($scope.accountFeatures,function(accountFeature){              
              accountFeature.feature = getFeatureById(accountFeature.featureId);
          });
          setActiveCount();
      },
      function(error){          
          $scope.card = false;  
          noty({
            type: 'error',  layout: 'topCenter',
            text: _tr("Sorry, but there's been an error processing your request.")
          });
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

    $scope.openConfirmDialog = function(feature){
        $scope.selectedFeature = feature;
        $('#confirmationDialog').foundation('reveal', 'open');
    }

    $scope.dialogConfirm = function(){
      $scope.updateStatus($scope.selectedFeature,"UNINSTALLED")
      $('#confirmationDialog').foundation('reveal', 'close');
    }
    $scope.dialogCancel = function(){
      $('#confirmationDialog').foundation('reveal', 'close');

    }

    $scope.updateStatus=function(accountFeature,status){        
        accountFeature.status = status;
        accountFeature.$put({accountId:accountFeature.accountId,featureId:accountFeature.featureId},function(result){
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
          if (d >now )
              $scope.diffInDays = 0;
          else
            $scope.diffInDays = 14 - Math.floor((now - d)/ (1000 * 60 * 60 * 24));
        }
        else 
          $scope.diffInDays =0;
    }
    
}])