export default class userRoleSelectController {
  static get UID(){
    return "userRoleSelectController"
  }


 constructor(gettextCatalog) {
    "ngInject";
    this.roles={
      ADMIN:{
        id:'ADMIN',
        name:gettextCatalog.getString("Administrator"),
        permissions:[
          gettextCatalog.getString("Order screen"),
          gettextCatalog.getString("Menus"),
          gettextCatalog.getString("Events"),
          gettextCatalog.getString("Promotions"),
          gettextCatalog.getString("Group Bookings"),
          gettextCatalog.getString("Gift Vouchers"),
          gettextCatalog.getString("Venue Settings"),
          gettextCatalog.getString("Analytics"),
          gettextCatalog.getString("Manage Users")
        ]
      },
      MANAGER:{
        id:'MANAGER',
        name:gettextCatalog.getString("Manager"),
        permissions:[
          gettextCatalog.getString("Order screen"),
          gettextCatalog.getString("Menus"),
          gettextCatalog.getString("Events"),
          gettextCatalog.getString("Promotions"),
          gettextCatalog.getString("Group Bookings"),
          gettextCatalog.getString("Gift Vouchers"),
        ]
      },
      STAFF:{
        id:'STAFF',
        name:gettextCatalog.getString("Staff Member"),
        permissions:[
          gettextCatalog.getString("Order screen"),
        ]
      }
    }
  }
}
