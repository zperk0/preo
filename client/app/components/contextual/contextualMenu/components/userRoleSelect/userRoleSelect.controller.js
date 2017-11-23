export default class userRoleSelectController {
  static get UID(){
    return "userRoleSelectController"
  }


 constructor(gettextCatalog, StateService, FeatureService, UserRole) {
    "ngInject";
    let venue = StateService.venue;
    this.roles = {
      ADMIN:{
        id: UserRole.ADMIN,
        name:gettextCatalog.getString("Administrator"),
        permissions:[
          gettextCatalog.getString("Order screen"),
          gettextCatalog.getString("Menus"),
          venue && venue.isEvent() ? gettextCatalog.getString("Events") : '',
          gettextCatalog.getString("Promotions"),
          FeatureService.hasBookingFeature() ? gettextCatalog.getString("Group Bookings") : '',
          FeatureService.hasVoucherFeature() ? gettextCatalog.getString("Gift Vouchers") : '',
          gettextCatalog.getString("Venue Settings"),
          gettextCatalog.getString("Analytics"),
          gettextCatalog.getString("Manage Users")
        ]
      },
      MANAGER:{
        id: UserRole.MANAGER,
        name:gettextCatalog.getString("Manager"),
        permissions:[
          gettextCatalog.getString("Order screen"),
          gettextCatalog.getString("Menus"),
          venue && venue.isEvent() ? gettextCatalog.getString("Events") : '',
          gettextCatalog.getString("Promotions"),
          FeatureService.hasBookingFeature() ? gettextCatalog.getString("Group Bookings") : '',
          FeatureService.hasVoucherFeature() ? gettextCatalog.getString("Gift Vouchers") : '',
        ]
      },
      STAFF:{
        id: UserRole.STAFF,
        name:gettextCatalog.getString("Staff Member"),
        permissions:[
          gettextCatalog.getString("Order screen"),
        ]
      }
    };

    if (StateService.isChannel) {
      this.roles['OPERATOR'] = {
        id: UserRole.OPERATOR,
        name: gettextCatalog.getString("Operator"),
        permissions: [
          gettextCatalog.getString("Create new customers"),
          gettextCatalog.getString("Place orders"),
        ]
      };
    }
  }
}
