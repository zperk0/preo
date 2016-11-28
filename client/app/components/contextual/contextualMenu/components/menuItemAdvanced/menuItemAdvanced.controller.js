export default class menuItemAdvancedController {
  static get UID(){
    return "menuItemAdvancedController"
  }

  changeVoucherPostType () {

    if (!this.entity.$voucherTypePost) {
      this.entity.$hasMessagePost = false;
    }
  }

  /* @ngInject */
  constructor() {
    'ngInject';

  }
}
