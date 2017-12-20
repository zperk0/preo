
export default class OperateService {

  static get UID(){
    return "OperateService";
  }

  generateToken(userId) {
    return this.$q((resolve, reject) => {
      Preoday.Operate.getCustomerToken(userId)
        .then((token) => {

          console.log('OperateService [generateToken] - operate token', token);
          resolve(token);
        }, (err) => {
          console.log('OperateService [generateToken] - error', err);
          reject(err);
        })
        .catch((err) => {
          console.log('OperateService [generateToken] - error', err);
          reject(err);
        });
    });
  }

  openNewTab() {
    this.newTab = this.$window.open('', '_blank');
    this.newTab.document.write(require('./loader.html'));
  }

  closeReorderTab() {
    if (this.newTab) {
      this.newTab.close();
    }
  }

  getWebordersLinkByOrder(order) {
    let path = this.StateService.getOperateUrl();
    path += '?venueId=' + order.venueId + '&';
    path += 'orderId=' + order.id;

    return path;
  }

  openOrderUrl(redirectUrl, token) {
    if (token) {
      if (redirectUrl.indexOf('?') === -1) {
        redirectUrl += '?';
      } else {
        redirectUrl += '&';
      }

      redirectUrl += 'impersonateToken=' + token;
    }

    if (this.newTab) {
      this.newTab.location.href = redirectUrl;
    } else {
      console.error('OperateService [openOrderUrl] - newTab is not opened');
    }
  }

  generateTokenAndGoToWeborders(userId, redirectUrl) {

    const {
      $q,
    } = this;

    function _error(err) {
      console.log('OperateService [generateTokenAndGoToWeborders] - error', err);
      this.closeReorderTab();
      deferred.reject(err);
    }

    const deferred = $q.defer();

    this.generateToken(userId)
      .then((token) => {
        console.log('OperateService [generateTokenAndGoToWeborders] - operate token', token);
        this.openOrderUrl(redirectUrl, token);
        deferred.resolve();
      }, _error.bind(this))
      .catch(_error.bind(this));

    return deferred.promise;
  }

  constructor($window, $q, StateService) {
    "ngInject";

    this.$window = $window;
    this.$q = $q;
    this.StateService = StateService;
  }
}
