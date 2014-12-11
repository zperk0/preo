angular.module('accountSettings.controllers')
 .controller('SubscriptionCtrl', ['$scope','$q','$http','ACCOUNT_ID','AccountCard','Account',"PACKAGES",'AccountPackages','$notification','$AjaxInterceptor','AccountInvoice',
  function ($scope,$q,$http,ACCOUNT_ID,AccountCard,Account,PACKAGES,AccountPackages,$notification,$AjaxInterceptor,AccountInvoice) {
    

    var allPackages = PACKAGES;
    $scope.setSelected($scope.Views.subscription);
    $scope.diffInDays = 0;
    loadAll();


    function loadAll(callback){
        $q.all([           
            AccountPackages.query({accountId:ACCOUNT_ID}).$promise,            
            Account.get({id:ACCOUNT_ID}).$promise,
            AccountInvoice.getPending({accountId:ACCOUNT_ID}).$promise
        ])
        .then(function(results){                         
            $scope.accountPackages = results[0];            
            console.log($scope.accountPackages);
            $scope.account = results[1];
            $scope.subscriptionInvoice = results[2];
            setBillingDate();          
            angular.forEach($scope.accountPackages,function(accountPackage){              
                accountPackage.$package = getPackageById(accountPackage.preoPackageId);
            });
            setActiveCount();
            if (callback)
              callback();
            AccountCard.get({accountId:ACCOUNT_ID},function(result){
                $scope.card = result;
                $scope.finishLoading();
            },function(error){
                $scope.card = false;  
                $scope.finishLoading();
            })
        },
        function(error){          
            displayErrorNoty();
      });    
    }
    
    $scope.isInstalled = function(accountPackage){              
        return !((accountPackage.status === 'CANCELED') || (accountPackage.status === 'REMOVED') || (accountPackage.status === 'EXPIRED') || (accountPackage.status === 'UNINSTALLED'));
    }
    $scope.isCanceled = function(accountPackage){              
        return (accountPackage.status === 'CANCELED') || (accountPackage.status === 'EXPIRED') || (accountPackage.status === 'UNINSTALLED');
    }
    
    $scope.showDialog = function(which){
       var clickOk;
       var clickCancel;
       var data; 
        switch (which){
          case "uninstall":
            data = { 
              content: _tr("This Premium Feature will remain active on your account until the end of the current billing cycle. You can cancel this uninstall at any time. If you wish to reinstall this Premium Feature after it has been deactivated, simply click on the <span>reinstall</span> option.")+"<br/><br/><b>"+_tr("Are you sure you want to uninstall this Premium Feature?")+"</b>",
              showTerm: false,
              btnOk: _tr('UNINSTALL'),            
              windowClass:'medium'
            }        
            clickOk = function(){$scope.updateStatus($scope.selectedFeature,"UNINSTALLED")};
          break; 
          case "uninstallTrial":
            data = { 
              content: _tr("Your free trial will be cancelled immediately and you will no longer have access to this feature.")+"<br/><br/><b>"+_tr("Are you sure you want to cancel this Free Trial? This action cannot be undone?")+"<b/>",
              showTerm: false,
              btnOk: _tr('UNINSTALL'),            
              windowClass:'medium'
            }        
            clickOk = function(){$scope.updateStatus($scope.selectedFeature,"EXPIRED")}
          break; 
          case "reinstall":          
            data = { 
              //content: _tr("This Premium Feature is currently canceled. A new charge will be made to your card before reinstalling this feature.")+"<br/><br/><b>"+_tr("Are you sure you want to reinstall this Premium Feature?")+"<b/>",
              title: 'Reinstall ' + $scope.selectedFeature.feature.name,
              scope: $scope.price,
              templateUrl: 'purchase.php',              
              showTerm: ($scope.selectedFeature.feature.$terms && $scope.selectedFeature.feature.$terms.purchase) ? $scope.selectedFeature.feature.$terms.purchase : false,
              btnOk: _tr('REINSTALL'),            
              windowClass:'small'
            }   
            clickOk = function(){purchaseFeature($scope.selectedFeature)}
          break;          
          case "paymentError":
             data = { 
               title: _tr("Error"),
              content: $scope.paymentFailedMessage,
              showTerm: false,
              btnOk: _tr('PAYMENT METHOD'),                  
              windowClass:'medium'              
            }        
            clickOk = function(){$scope.navigateTo('/accountSettings#/paymentMethod')}
          break;
          case "success":
            data = {
              title:_tr("Your new Premium Feature is now live!"),
              content: _tr("You can manage subscriptions from your account settings page."),
              showTerm: false,
              btnOk:false,
              btnCancel:_tr("OK"),            
              windowClass:'medium'
            }
          break;
        }
      $notification.confirm(data).then(clickOk,clickCancel);
    };


    $scope.navigateTo = function(place){
      if (place && place != "")
    	 window.location.assign(place);
    }

    $scope.getTotalSubscription = function (){
      var sum = 0;
      angular.forEach($scope.accountPackages,function(Package){
        if (Package.status == "INSTALLED")
          sum += Package.subscriptionPrice;
      });
    	return sum;
    }

    $getFeatureIcon = function(accountPackage){
      var Package = getPackageById(accountPackage.preoPackageId);
      return Package.icon;
    }

    function getPackageById(id){
      return $.grep(allPackages, function(e){ return e.id == id; })[0];   
    }

    $scope.getTrialPeriod = function (accountPackage) {
      return moment(accountPackage.startDate).add(accountPackage.$package.trialPeriod, 'day').format('Do, MMMM YYYY');
    }

    $scope.hasCancelledPackages = function(){      
     return $scope.accountPackages && $.grep($scope.accountPackages, function(e){ return (e.status == "CANCELED" || e.status == "EXPIRED");  }).length > 0;
    } 

    $scope.updatePackage = function () {
      $notification.confirm({
        btnOk: false,
        btnCancel: false,
        content: _tr("To upgrade your account, please contact ") + "<a href='mailto:support@preoday.com'>support@preoday.com</a>.",
        contentClass: 'updatePackage',
        windowClass:'small'
      });
    }

    $scope.cancelPackage = function (accountPackage) {
      $notification.confirm({
        btnOk: _tr('CANCEL'),
        btnCancel: _tr('CONFIRM'),
        content: _tr("Your subscription will remain active until the end of the current billing cycle, you will no longer be billed after this date. You venue will be taken offline but you will still be able to log in to account if you ever want to resubscribe.") + '<br /><br />' + _tr('Are you sure you want to cancel?'),
        contentClass: 'cancelPackage',
        windowClass:'small'
      }).then(function () {
        // cancel button
      }, function () {
        //call in your server
        //@PUT: http://local.preoday.com/api/accounts/{accountid}/packages/{packageid}
        console.log(accountPackage);
        var previousStatus = accountPackage.status;
        accountPackage.status = 'UNINSTALLED';
        delete accountPackage.vat;
        delete accountPackage.statusString;
        accountPackage.$put({accountId: ACCOUNT_ID, packageId: accountPackage.preoPackageId},function(result){
          console.log("Put account package success",result,status,accountPackage);
          accountPackage.$package = getPackageById(accountPackage.preoPackageId);
          setActiveCount();
          
        },function(error){
          console.log("Put account package fail",error);
          accountPackage.status = previousStatus;
          displayErrorNoty();
        });        
      });
    }

    $scope.resubscribePackage = function (accountPackage) {
      purchasePackage(accountPackage);
    }

    function setActiveCount(){
      $scope.activePackagesCount = $.grep($scope.accountPackages, function(e){ return (e.status != "CANCELED" && e.status != "REMOVED" && e.status != "EXPIRED"); }).length > 0;

    }

    $scope.openConfirmDialog = function(feature){
        $scope.selectedFeature = feature;
        if (feature.status == "TRIAL")
          $scope.showDialog("uninstallTrial");
        else
          $scope.showDialog("uninstall");
    }

        
    $scope.updateStatus=function(accountPackage,status){        
        //TODO how to not do this?
        var previousStatus = accountPackage.status;
        accountPackage.status = status;
        accountPackage.$put({accountId:accountPackage.accountId,packageId: accountPackage.preoPackageId},function(result){
          console.log("Put account package success",result,status,accountPackage);
          accountPackage.feature = getPackageById(accountPackage.preoPackageId);
          setActiveCount();
          
        },function(error){
          console.log("Put account package fail",error);
          accountPackage.status = previousStatus;
          displayErrorNoty();
        });
    }

    $scope.reinstallAccountPackage = function(accountPackage){

      AccountPackages.getPrice({accountId:ACCOUNT_ID,packageId:accountPackage.preoPackageId},
        function(result){                
          $scope.price = result;
          if (accountPackage.$package.contractMonths){
              $scope.price.contractMonths = accountPackage.feature.contractMonths;
          }        
          $scope.selectedPackage = accountPackage;
          $scope.showDialog("reinstall");
      });
    }

    $scope.removeAccountPackage = function(accountPackage){
      $scope.updateStatus(accountPackage,"REMOVED");      
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

    function purchasePackage(accountPackage){
      var Package = accountPackage.$package;
      $AjaxInterceptor.start();
        AccountCard.get({accountId:ACCOUNT_ID},
          function(result){                      
            if (result.token && result.token!=null){               
                AccountPackages.save({accountId:ACCOUNT_ID,packageId: Package.id},function(accountPayment){
                  console.log('here',accountPayment);
                        if (accountPayment.status ===  "SUCCESS"){
                          loadAll(function (){
                            $AjaxInterceptor.complete();
                            //$scope.showDialog('success');                            
                          });                             
                        } else {                        
                          $AjaxInterceptor.complete();
                          var response = JSON.parse(accountPayment.response);
                          $scope.paymentFailedMessage = response.detail_message;
                          $scope.showDialog("paymentError")                          
                        }                        
                      },function(error){              
                        $AjaxInterceptor.complete();          
                        displayErrorNoty();
                });
                                          
            }          
        },function(error){          
          if (error.data && error.data.status === 404){
                $scope.showDialog("paymentError")
          } else{
              displayErrorNoty()
            }                       
        });
    }

     $scope.getExpiryDate = function(accountPackage){
        return Math.floor(( new Date(accountPackage.endDate).getTime() -  new Date().getTime()) / (1000 * 3600 * 24))        
    }

      function displayErrorNoty(){
        noty({
              type: 'error',  layout: 'topCenter',
              text: _tr("Sorry, but there's been an error processing your request.") //text: 'Connection Error! Check API endpoint.'
          });
      }

}])