export default class DialogService {

  static get UID(){
    return "DialogService";
  }

  delete (title, content) {

    function DeleteController($scope, $mdDialog) {
      "ngInject";
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
      $scope.confirm = function() {
        $mdDialog.hide(true);
      };
    }
    const newScope = this.$rootScope.$new();
    newScope.title=title;
    newScope.content = content;
    newScope.hasCancel = true;
    return this.$mdDialog.show({
      template:require('./dialog.delete.tpl.html'),
      scope:newScope,
      focusOnOpen:false,
      controller: DeleteController
    });
  }

   retry(title, content) {

    function RetryController($scope, $mdDialog) {
      "ngInject";
      $scope.confirm = function() {
        $mdDialog.hide(true);
      };
    }
    const newScope = this.$rootScope.$new();
    newScope.title=title;
    newScope.content = content;
    newScope.hasCancel = false;
    return this.$mdDialog.show({
      template:require('./dialog.retry.tpl.html'),
      scope:newScope,
      focusOnOpen:false,
      controller: RetryController
    });
  }

  //tittle, content and array of buttons with {text:'confirm', id:1}. id will be returned on promise success
  show (title, content, buttons, options) {

    function DialogController($scope, $mdDialog) {
      "ngInject";
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
      $scope.confirm = function(buttonId) {
        $mdDialog.hide(buttonId);
      };
    }
    const newScope = this.$rootScope.$new();
    newScope.title=title;
    newScope.content = content;
    newScope.buttons = buttons;

    options = options || {};

    angular.extend(newScope, options);

    return this.$mdDialog.show({
      template:require('./dialog.tpl.html'),
      scope:newScope,
      focusOnOpen:false,
      controller: DialogController
    });
  }


  constructor($rootScope, $q, $mdDialog) {
    "ngInject";
    this.$mdDialog = $mdDialog;
    this.$q = $q;
    this.$rootScope = $rootScope;
  }
}
