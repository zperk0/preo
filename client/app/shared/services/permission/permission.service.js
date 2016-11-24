export default class PermissionService {

	static get UID(){
    return "PermissionService"
  }

  hasPermission(perm){
    return this.permissions && this.permissions[perm];
  }

  loadPermissions(venue){
     let permissions = [
      this.Permissions.EVENTS,
      this.Permissions.DASHBOARD,
      this.Permissions.MENUS,
      this.Permissions.OFFERS,
      this.Permissions.BOOKINGS,
      this.Permissions.VOUCHERS,
      this.Permissions.ORDERS,
      this.Permissions.ACCOUNT,
      this.Permissions.ANALYTICS,
      this.Permissions.TAXES,
      this.Permissions.VENUE
    ];
    return this.$q((resolve, reject)=>{
      venue.getPermissions(permissions.join(","))
      .then((userPermissions)=>{
        console.log("got user permissions", userPermissions, userPermissions)
        this.permissions = userPermissions;
        resolve(this.permissions);
      },reject);
    });
  }

  constructor($q, Permissions) {
    "ngInject";
    this.Permissions = Permissions;
    console.log("this perms", this.Permissions)

    this.$q = $q;
  }
}
