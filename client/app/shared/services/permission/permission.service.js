export default class PermissionService {

	static get UID(){
    return "PermissionService"
  }

  checkVenuesPermissions(permissions,venueIds){
    return this.$q((resolve,reject)=>{
      Preoday.Permission.check(permissions.join(","),venueIds.join(","))
        .then((perms)=>{
            resolve(perms);
          reject();
        },()=>{
          reject();
      })
    });
  }

  hasPermission(perm){
    return this.permissions && this.permissions[perm];
  }

  loadPermissions(model, expand){
    let permissions = []
    angular.forEach(this.Permissions,function(p, key){
      permissions.push(p)
    });

    return this.$q((resolve, reject)=>{
      model.getPermissions(permissions.join(","), expand)
      .then((userPermissions)=>{
        console.log("PermissionService [loadPermissions] - got user permissions", userPermissions, userPermissions)
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
