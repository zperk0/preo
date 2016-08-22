
export default class emailSuccessController {
  static get UID(){
    return "emailSuccessController"
  }

  getEmailIcon() {

  	return this.UtilsService.getImagePath(this.eventIconPath);
  }

  resendEmail() {
  	
  }

  getStateToRedirect() {

  	if (this.UserService.isLogged()) {

  		let venueId = 0;

			if (this.VenueService.venues
  			&& this.VenueService.venues.length) {

				venueId = this.VenueService.venues[0].id;
			}

  		return this.$state.href("main.dashboard", {
  			venueId: venueId
  		});
  	}

  	return this.$state.href('auth.signin');
  }
  
  constructor(UtilsService, UserService, VenueService, $state) {
  	'ngInject';

  	this.UtilsService = UtilsService;
  	this.UserService = UserService;
  	this.VenueService = VenueService;
  	this.$state = $state;

  	this.eventIconPath = '/images/email-sent-icon.svg';
  }
}
