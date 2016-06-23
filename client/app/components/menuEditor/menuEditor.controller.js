export default class menuEditorController {
  static get UID(){
    return "menuEditorController";
  }

  showContextualMenu(entity, type, onSubmit, onCancel){
    this.showingContextualMenu = type;
    this.contextualEntity = entity;
    this.contextualSubmit = onSubmit;
    this.contextualCancel = onCancel;
  }

  closeContextualMenu(isSuccess){
      delete this.showingContextualMenu;
      delete this.contextualEntity;
      delete this.contextualSubmit;
      delete this.contextualCancel;
      // this.selectSection();
      // if (!isSuccess){
      //   this.clearPossibleNewSection();
      // }
  }

  /* @ngInject */
  constructor(BroadcastEvents, $rootScope) {
    'ngInject';
    this.onSuccessCleanup = $rootScope.$on(BroadcastEvents._ON_CLOSE_CONTEXTUAL_MENU_SUCCESS, this.closeContextualMenu.bind(this, true))
    this.onCancelCleanup = $rootScope.$on(BroadcastEvents._ON_CLOSE_CONTEXTUAL_MENU_CANCEL, this.closeContextualMenu.bind(this,false))
  }
}
