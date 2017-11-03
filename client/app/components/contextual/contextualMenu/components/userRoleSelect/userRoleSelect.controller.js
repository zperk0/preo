export default class userRoleSelectController {
  static get UID(){
    return "userRoleSelectController"
  }


 constructor(gettextCatalog, StateService, FeatureService) {
    "ngInject";
    let venue = StateService.venue;
    this.roles={
      ADMIN:{
        id:'ADMIN',
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
        id:'MANAGER',
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
        id:'STAFF',
        name:gettextCatalog.getString("Staff Member"),
        permissions:[
          gettextCatalog.getString("Order screen"),
        ]
      }
    }
  }
}
