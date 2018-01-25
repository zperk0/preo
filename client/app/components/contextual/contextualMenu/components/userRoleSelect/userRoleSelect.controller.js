export default class userRoleSelectController {
  static get UID(){
    return "userRoleSelectController"
  }


 constructor(gettextCatalog, StateService, FeatureService, UserRole, UtilsService) {
    "ngInject";
    let venue = StateService.venue;
    this.roles = {
      ADMIN:{
        id: UserRole.ADMIN,
        name: UtilsService.getRoleAsString(UserRole.ADMIN),
        permissions:[
          gettextCatalog.getString("Order screen"),
          gettextCatalog.getString("Menus"),
          venue && venue.isEvent() ? gettextCatalog.getString("Events") : '',
          gettextCatalog.getString("Promotions"),
          FeatureService.hasBookingFeature() ? gettextCatalog.getString("Group Bookings") : '',
          FeatureService.hasVoucherFeature() ? gettextCatalog.getString("Gift Vouchers") : '',
          gettextCatalog.getString("Venue Settings"),
          gettextCatalog.getString("Analytics"),
          gettextCatalog.getString("Manage Users"),
          gettextCatalog.getString("Create new customers"),
          gettextCatalog.getString("Place orders")
        ]
      },
      MANAGER:{
        id: UserRole.MANAGER,
        name: UtilsService.getRoleAsString(UserRole.MANAGER),
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
        name: UtilsService.getRoleAsString(UserRole.STAFF),
        permissions:[
          gettextCatalog.getString("Order screen"),
        ]
      }
    };

    if (StateService.isChannel) {
      this.roles['OPERATOR'] = {
        id: UserRole.OPERATOR,
        name: UtilsService.getRoleAsString(UserRole.OPERATOR),
        permissions: [
          gettextCatalog.getString("Create new customers"),
          gettextCatalog.getString("Place orders"),
        ]
      };
    }
  }
}
