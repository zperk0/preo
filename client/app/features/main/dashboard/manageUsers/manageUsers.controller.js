
export default class manageUsersController {
  static get UID(){
    return "manageUsersController"
  }

   init(){
    this.Spinner.show("fetch-users");
    console.log("initing");
    this.account.getUsers()
    .then((users)=>{
      users.forEach((u)=>{
        if (u.role === 'OWNER'){
          u.role = "ADMIN";
        }
      })
      this.users = users
      console.log("got users", users);
    })
    .then(this.account.getInvites.bind(this.account))
    .then((invites)=>{
      this.invites = invites;
      console.log("got invites", invites);
      this.Spinner.hide("fetch-users");
    },(err)=>{
      console.log("error", err)
      this.Spinner.hide("fetch-users");
    }).catch((err)=>{
      this.Spinner.hide("fetch-users");
      console.log("error", err)
    })

  }

  /* @ngInject */
  constructor(Spinner, Snack,ErrorService, VenueService, LabelService, $timeout) {
    "ngInject";
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.ErrorService = ErrorService;
    this.LabelService = LabelService;
    this.users = [];
    this.invites = [];
    this.account = VenueService.account;
    this.isError = false;
    this.$timeout = $timeout;
    this.init();

  }
}
