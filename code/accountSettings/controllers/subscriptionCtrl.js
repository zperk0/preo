angular.module('accountSettings.controllers')
 .controller('SubscriptionCtrl', ['$scope','$q','$http','ACCOUNT_ID','AccountCard','Account',"FEATURES",'AccountFeature','StripeCharge','Invoice',
  function ($scope,$q,$http,ACCOUNT_ID,AccountCard,Account,FEATURES,AccountFeature,StripeCharge,Invoice) {
    //FIXME find a way to not have to do this.
     $("#confirmationDialog,#reinstallDialog,#errorDialog,#successDialog").on('opened', function() {
      var that = this;
      setTimeout(function(){
        $(that).addClass('active');  
      },1)    
    }).on('closed',function(){
        console.log("closed!",this);
        $(this).removeClass("active");
    });

    var allFeatures = FEATURES;
    $scope.setSelected($scope.Views.subscription);
    $scope.diffInDays = 0;
    loadAll();


    function loadAll(callback){
        $q.all([           
            AccountFeature.query({accountId:ACCOUNT_ID}).$promise,            
            Account.get({id:ACCOUNT_ID}).$promise
        ])
        .then(function(results){                         
            $scope.accountFeatures = results[0];            
            $scope.account = results[1];
            setBillingDate();          
            angular.forEach($scope.accountFeatures,function(accountFeature){              
                accountFeature.feature = getFeatureById(accountFeature.featureId);
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
    


    $scope.navigateTo = function(place){
    	window.location.assign(place);
    }

    $scope.getTotalSubscription = function (){
      var sum = 0;
      angular.forEach($scope.accountFeatures,function(feature){
        if (feature.status == "INSTALLED")
          sum += feature.upfrontPrice;
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
     return $scope.accountFeatures && $.grep($scope.accountFeatures, function(e){ return e.status == "CANCELED"; }).length > 0;
    } 

    function setActiveCount(){
      $scope.activeFeaturesCount = $.grep($scope.accountFeatures, function(e){ return e.status != "CANCELED"; }).length > 0;

    }

    $scope.openConfirmDialog = function(feature){
        $scope.selectedFeature = feature;
        $('#confirmationDialog').foundation('reveal', 'open');
    }

    $scope.dialogConfirm = function(dialog){

      switch (dialog){
        case "confirmationDialog": 
          $scope.updateStatus($scope.selectedFeature,"UNINSTALLED")
          break;
        case "reinstallDialog":
          purchaseFeature($scope.selectedFeature)
          break;
      } 
      
    }
    $scope.dialogCancel = function(dialog){
      $('#'+dialog).foundation('reveal', 'close');
    }


    $scope.updateStatus=function(accountFeature,status){        
        accountFeature.status = status;
        accountFeature.$put({accountId:accountFeature.accountId,featureId:accountFeature.featureId},function(result){
          accountFeature.feature = getFeatureById(accountFeature.featureId);
          setActiveCount();
          $('#confirmationDialog').foundation('reveal', 'close');
        },function(error){
              displayErrorNoty();
        });
    }

    $scope.reinstallAccountFeature = function(accountFeature){
      $scope.selectedFeature = accountFeature;
      $('#reinstallDialog').foundation('reveal', 'open');
    }

    $scope.removeAccountFeature = function(accountFeature){
      accountFeature.$delete({accountId:accountFeature.accountId,featureId:accountFeature.featureId},
        function(result){
            $scope.accountFeatures.splice( $scope.accountFeatures.indexOf(accountFeature), 1 );
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

    function purchaseFeature(accountFeature){
      var feature = accountFeature.feature;
         AccountCard.get({accountId:ACCOUNT_ID},
          function(result){          
            
            if (result.token && result.token!=null){
                                
                var invoice = new Invoice(feature);
                console.log("beforeSave",invoice);
                invoice.$save({accountId:ACCOUNT_ID},function(result){                  
                  console.log(result,"sending:",result.id);                  
                  //created the invoice, now try to pay it.
                  StripeCharge.save({invoiceId:result.id},
                    function(result){
                      //if we get a success here, the charge was good! enable account feature
                      console.log('innnermost result',result)
                      if (result && result.status == "SUCCESS"){
                        var accountFeature = new AccountFeature({                  
                          feature:feature
                        });                               
                        accountFeature.status ="INSTALLED";                          
                        accountFeature.$put({accountId:ACCOUNT_ID,featureId:feature.id},
                          function(result){
                            loadAll(function (){
                               $('#successDialog').foundation('reveal', 'open');         
                            });                             
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
          console.log("here",error);
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
    
      function displayErrorNoty(){
        noty({
              type: 'error',  layout: 'topCenter',
              text: _tr("Sorry, but there's been an error processing your request.") //text: 'Connection Error! Check API endpoint.'
          });
      }

}])