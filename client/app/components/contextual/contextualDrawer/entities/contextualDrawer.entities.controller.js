
export default class contextualDrawerEntityController {
  static get UID() {
    return 'ContextualDrawerEntity';
  }

  click() {
    const {DialogService, ErrorService, LabelService, selected} = this;

    if (!selected.channelId
     && !selected.venueIds.length
     && !selected.groupIds.length) {
      return DialogService.show(ErrorService.CHANNEL_ENTITIES_REQUIRED.title, ErrorService.CHANNEL_ENTITIES_REQUIRED.message, [{
        name: LabelService.CONFIRMATION
      }]);
    }

    this.callback && this.callback();
  }

  close() {
    this.contextualDrawer.close();
  }

  constructor(StateService, DialogService, ErrorService, LabelService, contextualDrawer) {
    'ngInject';
    this.StateService = StateService;
    this.DialogService = DialogService;
    this.ErrorService = ErrorService;
    this.LabelService = LabelService;
    this.contextualDrawer = contextualDrawer;

    // Create new object if `entities` is undefined
    this.entities = this.entities || {};
    // Create new object if `selected` is undefined
    this.selected = this.selected || {channelId: null, groupIds: [], venueIds: []};
  }
}
