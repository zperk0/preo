
export default class manageUsersController {
  static get UID(){
    return "manageUsersController"
  }

   init(){
    this.Spinner.show("fetch-users");
    console.log("initing");
    var currentUser = this.UserService.getCurrent();
    this.venue.getUsers()
    .then((users)=>{
      users.forEach((u)=>{
        u.$current = u.id === currentUser.id;
        if (u.role === 'OWNER'){
          u.role = "ADMIN";
        }
      })
      this.users = users
      console.log("got users", users);
    })
    .then(this.venue.getInvites.bind(this.venue))
    .then((invites)=>{
      invites.forEach((u)=>{
        if (u.role === 'OWNER'){
          u.role = "ADMIN";
        }
      })
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
  constructor(Spinner, Snack,ErrorService, StateService, LabelService, UserService, $timeout) {
    "ngInject";
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.ErrorService = ErrorService;
    this.LabelService = LabelService;
    this.UserService = UserService;
    this.users = [];
    this.invites = [];
    this.venue = StateService.venue;
    this.isError = false;
    this.$timeout = $timeout;
    this.init();

  }
}
