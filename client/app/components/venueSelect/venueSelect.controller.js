export default class venueSelectController {
  static get UID(){
    return "venueSelectController";
  }

  openMenu = ($mdOpenMenu, ev) => {
    $mdOpenMenu(ev);
  };

  switchVenue = (venue) => {
    this.venue = venue;
  }

  /* @ngInject */
  constructor() {
    this.venues = [
      {name:"Bob's Brilliant BBQ Burgerzzz"},
      {name:"Venue #2 with a really really but really long time"},
    ];
    this.venue = this.venues[0];
  }
}
