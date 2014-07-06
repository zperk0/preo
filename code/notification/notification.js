angular.module('notification', ['ngSanitize'])
.service('$notification', ['$modal', '$q', '$sce', function( $modal, $q, $sce ) {

    var confirmModalController = function( $scope, $modalInstance, data, deffered ) {

        $scope.title = data.title || '';
        $scope.content = data.content || '';

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
            deffered.resolve({ acceptTerm: $scope.acceptTerm });
        };

        $scope.cancel = function() {
            $modalInstance.close();
            deffered.reject({ acceptTerm: $scope.acceptTerm });
        };

    };

    var confirm = function( data ) {
        var deffered = $q.defer();

        data = data || {};

        var modalCofirm = $modal.open({
          templateUrl: '/code/notification/notification.htm',
          windowClass: 'modal-preoday ' + (data.windowClass || '') ,
          controller: confirmModalController,
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
                  $(".modal-preoday").addClass("active");
              },400)
        }) 
        return deffered.promise;

    };  

    return {
        confirm: confirm
    };

}])