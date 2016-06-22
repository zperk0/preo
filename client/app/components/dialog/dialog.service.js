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
      template:require('./dialog.tpl.html'),
      scope:newScope,
      focusOnOpen:false,
      controller: DeleteController
    });
  }


  constructor($rootScope, $q, $mdDialog) {
    "ngInject";
    this.$mdDialog = $mdDialog;
    this.$q = $q;
    this.$rootScope = $rootScope;
  }
}
