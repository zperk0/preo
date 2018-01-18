export default class publishVenuesController {
  static get UID() {
    return "publishVenuesController"
  }

  openDrawer() {
    this.contextual.showDrawer(this.type);
  }

  constructor(contextual) {
    "ngInject";

    this.contextual = contextual;

    this.type = 'entities';
  }
}
