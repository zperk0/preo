export default class customTagListViewController {
  static get UID(){
    return "customTagListViewController"
  }

  /* @ngInject */
  constructor(tags) {
    'ngInject';

    this.tags = tags;
  }
}
