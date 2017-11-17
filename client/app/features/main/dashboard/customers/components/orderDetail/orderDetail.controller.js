export default class orderDetailController {
  static get UID(){
    return "orderDetailController"
  }

  getOrderStatus(status) {
    return status ? status.replace('_', ' ') : '';
  }

  /* @ngInject */
  constructor() {
    "ngInject";

  }
}
