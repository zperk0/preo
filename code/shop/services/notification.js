angular.module('notification', []).service('$notification', ['$modal', '$q', '$sce', function( $modal, $q, $sce ) {

    var confirmModalController = function( $scope, $modalInstance, data, deffered ) {

        $scope.title = data.title || '';
        $scope.content = data.content || '';

        $scope.showTerm = data.showTerm || false;
        $scope.forceTerm = data.forceTerm;

        if ( $scope.forceTerm !== true && $scope.forceTerm !== false ) {
            $scope.forceTerm = true;
        }

        $scope.showTermPosition = data.showTermPosition || 'top';
        $scope.msgTerm = data.msgTerm || '';

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
          templateUrl: '/code/shop/modals/confirm.htm',
          windowClass: data.windowClass || '',
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
        console.log("confirming");
        return deffered.promise;

	};	

	return {
		confirm: confirm
	};

}])