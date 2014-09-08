angular.module('notification', ['ngSanitize'])

.controller("confirmModalController",['$scope', '$modalInstance', 'data', 'deffered', '$http', '$templateCache', '$compile','$sce','$timeout',
  'AccountFeature','ACCOUNT_ID','VENUE_ID','USER_ID',
  function( $scope, $modalInstance, data, deffered, $http, $templateCache, $compile,$sce,$timeout,AccountFeature,ACCOUNT_ID,VENUE_ID,USER_ID) {

        var templatePath = '/code/notification/templates/';
        
        $scope.title = data.title || '';        
        $scope.discountCode = "";
        $scope.appliedDiscount = false;
        if ( data.hasOwnProperty('templateFullUrl') && data.templateFullUrl ) {          
            angular.extend($scope, data.scope);
        } else if ( data.hasOwnProperty('templateUrl') && data.templateUrl ) {          
            $scope.templateUrl = data.templateUrl;

            var load = function( html ) {              
              
              $timeout(function(){
                angular.element('#contentPartial').html($compile(html)($scope));
              });              
            };

            var dataCache = $templateCache.get(templatePath + data.templateUrl);

            if ( dataCache ) {
                load( dataCache );
            } else {

                $http.get( templatePath + data.templateUrl).then(function (response) {
                  $templateCache.put(templatePath + data.templateUrl, response.data);
                  load(response.data);
                });

            }
        } else {
            $scope.content = data.content || '';
        }

        if ( data.hasOwnProperty('scope') && data.scope ) {
            $scope = angular.extend($scope, data.scope);
        }

        $scope.toTrusted = function( html ) {
            return $sce.trustAsHtml(html || '');
        }

        $scope.showTerm = data.showTerm || false;        

        $scope.acceptTerm = false;

        if (data.btnOk === false){
            $scope.btnOk = false;
        }
        else{
            $scope.btnOk = data.btnOk || _tr('OK');
        }
        if (data.btnCancel === false ){
            data.btnCancel = false;
        } else {
            $scope.btnCancel = data.btnCancel || _tr('CANCEL');
        }

        $scope.changeTerm = function( newTerm ) {
            $scope.acceptTerm = newTerm;
        };

        $scope.send = function() {
            $modalInstance.close();
            
            var resolveObj = {
              acceptTerm: $scope.acceptTerm
            }
            if ($scope.appliedDiscount){
              resolveObj.discountCode = $scope.discountCode;
            }

            deffered.resolve(resolveObj);
        };

        $scope.cancel = function() {
            $modalInstance.close();
            deffered.reject({ acceptTerm: $scope.acceptTerm });
        };

        $scope.validateDiscountCode = function(){
            $scope.errorMsg = "";
            if (!$scope.discountCode ){
              $scope.errorMsg = _tr("Please enter a discount code");
            }
            AccountFeature.getPrice({accountId:ACCOUNT_ID,
                                     featureId:$scope.featureId,
                                     code:$scope.discountCode.toUpperCase(),
                                     venueId:VENUE_ID,
                                     userId:USER_ID
            },function(result){
              angular.extend($scope,result)
              $scope.appliedDiscount = true;
            },function(error){
              if (error.status === 400 && error.data)
                $scope.errorMsg = error.data.message;
            });  
          }     

       

}])
.service('$notification', ['$modal', '$q', '$sce', function( $modal, $q, $sce) {

    var templatePath = '/code/notification/templates/';

    var confirm = function( data ) {
        var deffered = $q.defer();

        data = data || {};

        if ( data.hasOwnProperty('templateFullUrl') && data.templateFullUrl ) {
            data.templateFullUrl = templatePath + data.templateFullUrl;
        }

        var modalCofirm = $modal.open({
          templateUrl: data.templateFullUrl || '/code/notification/notification.php',
          windowClass: 'modal-preoday ' + (data.windowClass || '') ,
          controller: 'confirmModalController',
          resolve: {
            data: function () {
              return data;
            },
            deffered: function() {
                return deffered;
            }
          }
        });
        modalCofirm.opened.then(function(){
              setTimeout(function(){              
                  var maxWidth = 0;
                  $('.notificationButtons button').each(function(){                    
                    maxWidth = maxWidth > $(this).width() ? maxWidth : $(this).width();
                  }).width(maxWidth);
                  $(".modal-preoday").addClass("active");
              },400)
        }) 
        return deffered.promise;

    };  

    return {
        confirm: confirm
    };

}])