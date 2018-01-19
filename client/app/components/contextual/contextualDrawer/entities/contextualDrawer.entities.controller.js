
export default class contextualDrawerEntityController {
  static get UID() {
    return 'ContextualDrawerEntity';
  }

  click() {
    const {DialogService, ErrorService, LabelService, model} = this;

    if (!model.channelId
     && !model.venueIds.length
     && !model.groupIds.length) {
      return DialogService.show(ErrorService.CHANNEL_ENTITIES_REQUIRED.title, ErrorService.CHANNEL_ENTITIES_REQUIRED.message, [{
        name: LabelService.CONFIRMATION
      }]);
    }

    this.callback && this.callback({
      model: this.model
    });
  }

  close() {
    this.contextualDrawer.close();
  }

  resetModel() {
    this.model = {channelId: null, groupIds: [], venueIds: []};
  }

  constructor($scope, StateService, DialogService, ErrorService, LabelService, contextualDrawer, BroadcastEvents) {
    'ngInject';
    this.StateService = StateService;
    this.DialogService = DialogService;
    this.ErrorService = ErrorService;
    this.LabelService = LabelService;
    this.contextualDrawer = contextualDrawer;

    // Create new object if `entities` is undefined
    this.entities = this.entities || {};

    this.resetModel();

    $scope.$on(BroadcastEvents.ON_CONTEXTUAL_DRAWER_OPEN, () => {
      this.resetModel();
    });
  }
}
