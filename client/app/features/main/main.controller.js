
export default class mainController {
  static get UID(){
    return "mainController";
  }

  setVenue(v){
    console.log("got venue", v);
  }

  handleError(err){
    this.err = err;
  }

  /* @ngInject */
  constructor($stateParams) {
    'ngInject';
    Preoday.Venue.get($stateParams.venueId)
      .then(this.setVenue.bind(this))
      .catch(this.handleError.bind(this));
  }
}
