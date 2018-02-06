
export default class manageGroupsController {
  static get UID() {
    return 'manageGroupsController';
  }

  /* @ngInject */
  constructor(entities) {
    'ngInject';

    // Defaults
    this.entities = entities;
  }
}
