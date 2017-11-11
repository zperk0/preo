export default class NavbarService {
  static get UID(){
    return "NavbarService"
  }

  isExpanded() { return this.expanded; }

  constructor() {
    "ngInject";

    this.expanded = true;

  }
}
