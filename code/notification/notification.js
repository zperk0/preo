angular.module('notification', ['ngSanitize'])
.service('$notification', ['$modal', '$q', '$sce', function( $modal, $q, $sce ) {

    var confirmModalController = function( $scope, $modalInstance, data, deffered ) {

        console.log('confirmed',data);
        $scope.title = data.title || '';
        $scope.content = data.content || '';

        $scope.showTerm = data.showTerm || false;        

        $scope.acceptTerm = false;

        $scope.btnOk = data.btnOk || 'OK';
        $scope.btnCancel = data.btnCancel || 'Cancel';

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
                console.log('reolving data')
              return data;
            },
            deffered: function() {
                console.log('reolving deferred')
                return deffered;
            }
          }
        });
        console.log('opened!');        
        modalCofirm.opened.then(function(){
              setTimeout(function(){              
                console.log("here",$(".modal-preoday").length);
                  $(".modal-preoday").addClass("active");
                  console.log("here hooo!")
              },400)
        }) 
        return deffered.promise;

    };  

    return {
        confirm: confirm
    };

}])