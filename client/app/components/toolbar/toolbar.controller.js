export default class toolbarController {
  static get UID(){
    return "toolbarController";
  }


  hasVenuePermission(){
    return this.PermissionService.hasPermission(this.Permissions.VENUE)
  }


  constructor(VenueService, UserService, $state, PermissionService, Permissions) {
    "ngInject";
    this.UserService=UserService;
    this.VenueService=VenueService;
    this.PermissionService=PermissionService;
    this.Permissions=Permissions;
    this.$state=$state;
  }
}
