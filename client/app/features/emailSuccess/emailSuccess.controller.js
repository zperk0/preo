
export default class emailSuccessController {
  static get UID(){
    return "emailSuccessController"
  }

  getEmailIcon() {

  	return this.UtilsService.getImagePath(this.eventIconPath);
  }

  resendEmail() {
  	
  }
  
  /* @ngInject */
  constructor(UtilsService) {
  	'ngInject';

  	this.UtilsService = UtilsService;

  	this.eventIconPath = '/images/email-sent-icon.svg';
  }
}
