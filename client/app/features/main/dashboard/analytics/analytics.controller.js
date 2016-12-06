
export default class analyticsController {
  static get UID(){
    return "analyticsController";
  }


  constructor($timeout, $window, VenueService, UserService) {
    "ngInject";

    this.analyticsUrl = $window._PREO_DATA._WEBAPP_V1 + 'kyc#/dashboard';

    this.onIframeLoad = () => {

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
    };
  }
}
