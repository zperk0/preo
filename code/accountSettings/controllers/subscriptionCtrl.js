angular.module('accountSettings.controllers')
 .controller('SubscriptionCtrl', ['$scope','$q','$http','ACCOUNT_ID','AccountCard','Account', 'AccountPackages','$notification','$AjaxInterceptor','AccountInvoice',
  function ($scope,$q,$http,ACCOUNT_ID,AccountCard,Account, AccountPackages,$notification,$AjaxInterceptor,AccountInvoice) {
    

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
            $scope.account = results[1];
            $scope.subscriptionInvoice = results[2];
            setBillingDate();          
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
        return (accountPackage.status === 'CANCELED') || (accountPackage.status === 'EXPIRED');
    }
    $scope.isUninstaled = function(accountPackage){              
        return (accountPackage.status == 'UNINSTALLED' || accountPackage.status === 'CANCELED' || accountPackage.status === 'EXPIRED');
    }
    
    $scope.showDialog = function(which, accountPackage){
        if (accountPackage) {
          $scope.currentAccountPackage = accountPackage;
        }
       var clickOk;
       var clickCancel;
       var data; 
        switch (which){
          case "cancelPackage":          
            data = { 
              btnOk: _tr('CONFIRM'),
              btnCancel: _tr('CANCEL'),
              content: _tr("Your subscription will remain active until the end of the current billing cycle, you will no longer be billed after this date. Your venue will be taken offline but you will still be able to log in to account if you ever want to resubscribe.") + '<br /><br />' + _tr('Are you sure you want to cancel?'),
              contentClass: 'cancelPackage',
              modifyPositionButtons: true,
              windowClass:'small'
            },
            clickOk = function(){cancelPackage()}
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
          case "updatePackage":
            data = {
              btnOk: false,
              btnCancel: false,
              content: _tr("To upgrade your account, please contact ") + "<a href='mailto:support@preoday.com'>support@preoday.com</a>.",
              contentClass: 'updatePackage',
              windowClass:'small'  
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

    $scope.getTrialPeriod = function (accountPackage) {
      return moment(accountPackage.startDate).add(accountPackage.preoPackage.trialPeriod, 'day').format('Do, MMMM YYYY');
    }

    $scope.resubscribePackage = function (accountPackage) {
      purchasePackage(accountPackage);
    }

    function cancelPackage() {
      var accountPackage = $scope.currentAccountPackage;
      var previousStatus = accountPackage.status;
      accountPackage.status = 'UNINSTALLED';
      delete accountPackage.vat;
      accountPackage.$put({accountId: ACCOUNT_ID, packageId: accountPackage.preoPackageId},function(result){
        console.log("Put account package success",result,status,accountPackage);
        setActiveCount();
        
      },function(error){
        console.log("Put account package fail",error);
        accountPackage.status = previousStatus;
        displayErrorNoty();
      });      
    }

    function setActiveCount(){
      $scope.activePackagesCount = $.grep($scope.accountPackages, function(e){ return (e.status != "CANCELED" && e.status != "REMOVED" && e.status != "EXPIRED"); }).length > 0;
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
      var Package = accountPackage.preoPackage;
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

      function displayErrorNoty(){
        noty({
              type: 'error',  layout: 'topCenter',
              text: _tr("Sorry, but there's been an error processing your request.") //text: 'Connection Error! Check API endpoint.'
          });
      }

}])