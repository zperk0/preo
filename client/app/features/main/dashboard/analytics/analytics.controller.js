
export default class analyticsController {
  static get UID(){
    return "analyticsController";
  }

  /*reload() {

    window.location.reload();
  }*/

  constructor(){ //$timeout, $window, VenueService, UserService, Spinner, UtilsService) {
    "ngInject";

    /*Spinner.show('analytics');

    var locale = [];
    if (UserService.getCurrent().locale) {
      locale = UserService.getCurrent().locale.split('-');
    } else {
      locale = VenueService.currentVenue.locale.split('-');
    }

    this.analyticsUrl = $window._PREO_DATA._WEBAPP_V1 + 'kyc?noFooter=true&noHeader=true&lang=' + (locale[0] || 'en') + '#/dashboard';

    this.iframeFailed = false;

    this.onIframeLoad = (status) => {
    	if (status) {
    		_iframeSuccessLoaded();
    	} else {
    		_iframeError();
    	}
    }

    UtilsService.onMessage((e) => {
      if (e.origin.indexOf($window._PREO_DATA._WEBAPP_V1) !== -1) {
        if (e.data instanceof Object && e.data.loaded === true) {
            Spinner.hide('analytics');
        }
      }
    });


    function _iframeSuccessLoaded() {

    	var receiver = document.getElementById('analytics-iframe').contentWindow;

    	var currentUser = UserService.getCurrent();

    	receiver.postMessage({
    		venue: {
    			id: VenueService.currentVenue.id,
    			permalink: VenueService.currentVenue.permalink,
    			accountId: VenueService.currentVenue.accountId,
    			locale: VenueService.currentVenue.locale,
    		},
    		user: {
    			id: currentUser.id,
    			locale: currentUser.locale
    		},
    		module: 'kyc',
    		sessionId: window._PREO_DATA._SESSION
    	}, $window._PREO_DATA._WEBAPP_V1);

        Spinner.hide('analytics');
    };

    function _iframeError () {

    	this.iframeFailed = true;
        Spinner.hide('analytics');
    }*/
  }
}
