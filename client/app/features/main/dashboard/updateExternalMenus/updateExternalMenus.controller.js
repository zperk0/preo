
export default class updateExternalMenusController {
  static get UID(){
    return "updateExternalMenusController";
  }


  constructor(StateService) {
    "ngInject";

		this.venues = [StateService.venue];

		console.log('venues ', this.venues);
  }
}
