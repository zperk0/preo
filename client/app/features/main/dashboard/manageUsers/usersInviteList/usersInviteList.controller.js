export default class usersInviteListController {
  static get UID(){
    return "usersInviteListController"
  }

  showCreate(){
      let isCreating = this.users.filter(function (item) {
        return item.id === undefined;
      }).length;

    if (isCreating){
      console.log("Not showing new invite, already showing")
      return;
    }

    let invite = new Preoday.Invite({
      venueId: this.venue.id,
      role:'ADMIN',
      createdBy:this.user.id,
      $selected: true,
      domain: this.domainId
    });

    this.users.push(invite);
  }

  /* @ngInject */
  constructor(StateService, UserService) {
    "ngInject"
    this.title = "I am a usersList component"
    this.venue = StateService.venue;
    this.user = UserService.user;

    this.domainId = window._PREO_DATA._DOMAIN ? window._PREO_DATA._DOMAIN : null;
  }
}
