
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

  		let entityId = 0;

      const {
        channels,
        venues,
      } = this.StateService;


      if (channels && channels.length) {
        entityId = channels[0].id;
      } else  if (venues && venues.length) {
				entityId = venues[0].id;
			}

      if (entityId) {

        return this.$state.href("main.dashboard.anaylitcs", {
          entityId: entityId
        });
      }
  	}

  	return this.$state.href('auth.signin');
  }

  constructor(UtilsService, UserService, StateService, $state) {
  	'ngInject';

  	this.UtilsService = UtilsService;
  	this.UserService = UserService;
  	this.StateService = StateService;
  	this.$state = $state;

  	this.eventIconPath = '/images/email-sent-icon.svg';
  }
}
