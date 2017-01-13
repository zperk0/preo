export default class PermissionService {

	static get UID(){
    return "PermissionService"
  }

  checkSystemPermission(){
    return this.$q((resolve,reject)=>{
      Preoday.Permission.check("system_update")
        .then((perms)=>{
          if (perms["system_update"]){
            resolve();
          }
          reject();
        },()=>{
          reject();
      })
    });
  }

  hasPermission(perm){
    return this.permissions && this.permissions[perm];
  }

  loadPermissions(venue){
    let permissions = []
    angular.forEach(this.Permissions,function(p, key){
      permissions.push(p)
    });

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
    this.$q = $q;
  }
}
