export default class menuItemAdvancedController {
  static get UID(){
    return "menuItemAdvancedController"
  }

  changeVoucherPostType () {

    if (!this.item.$voucherTypePost) {
      this.item.$hasMessageAnyVoucher = false;
      this.item.$assignCodePost = false;
    }
  }

  changeVoucherEmailType () {

    if (!this.item.$voucherTypeEmail) {
      this.item.$hasMessageOnlyEmail = false;
      this.item.$assignCodeEmail = false;
    }
  }

  changeOnlyEmailMessage () {

    if (this.item.$hasMessageOnlyEmail) {
      this.item.$hasMessageAnyVoucher = false;
    }
  }

  changeAnyVoucherMessage () {

    if (this.item.$hasMessageAnyVoucher) {
      this.item.$hasMessageOnlyEmail = false;
    }
  }

  /* @ngInject */
  constructor($scope, FeatureService) {
    'ngInject';

    this.hasExternalVoucherCodes = FeatureService.hasExternalVoucherCodesFeature();

    switch (this.item.voucherType) {
      case Preoday.constants.VoucherType.ALL:
        this.item.$voucherTypeEmail = true;
        this.item.$voucherTypePost = true;
        break;

      case Preoday.constants.VoucherType.EMAIL:
        this.item.$voucherTypeEmail = true;
        this.item.$voucherTypePost = false;
        break;

      case Preoday.constants.VoucherType.POST:
        this.item.$voucherTypePost = true;
        this.item.$voucherTypeEmail = false;
        break;
    }

    switch (this.item.hasMessage) {
      case 1:
        this.item.$hasMessageAnyVoucher = true;
        this.item.$hasMessageOnlyEmail = false;
        break;

      case -1:
        this.item.$hasMessageOnlyEmail = true;
        this.item.$hasMessageAnyVoucher = false;
        break;

      case 0:
        this.item.$hasMessageOnlyEmail = false;
        this.item.$hasMessageAnyVoucher = false;
        break;
    }

    switch (this.item.assignCode) {
      case Preoday.constants.VoucherType.ALL:
        this.item.$assignCodeEmail = true;
        this.item.$assignCodePost = true;
        break;

      case Preoday.constants.VoucherType.EMAIL:
        this.item.$assignCodeEmail = true;
        this.item.$assignCodePost = false;
        break;

      case Preoday.constants.VoucherType.POST:
        this.item.$assignCodeEmail = false;
        this.item.$assignCodePost = true;
        break;
    }
  }
}
