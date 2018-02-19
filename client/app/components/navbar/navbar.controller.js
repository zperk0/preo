export default class navbarController {
  static get UID(){
    return "navbarController";
  }

  toggleExpanded(item = false){
    this.menu.forEach((i)=>{
      if (item !== i && (!item || !i.$selected)){
        i.$expanded = false;
      }
    });
    if (item){
      item.$expanded = !item.$expanded;
    }
  }

  closeAllMenus(){
    this.menu.forEach((i)=>{
            i.$menuOpen = false;
        });
  }

  openExternal(external){
    return window.open(external);
  }

  toggleMenu() {
    this.toggleExpanded();
    this.$expanded = !this.$expanded;
    this.NavbarService.expanded = this.$expanded;
    console.log("broadcasting");
    this.$rootScope.$broadcast(this.BroadcastEvents._ON_NAVBAR_TOGGLE,this.$expanded);
  }

  getActivedMenu() {
    return this.menu.filter((menu) => {
      return !menu.hasOwnProperty('shouldShow') || menu.shouldShow();
    });
  }

  constructor($state, gettextCatalog, FeatureService, $rootScope, $timeout, BroadcastEvents, PermissionService, Permissions, StateService, NavbarService) {
    "ngInject";
    this.DESTINATION_PREFIX = "main.dashboard.";
    this.$state = $state;
    this.$timeout = $timeout;
    this.$rootScope = $rootScope;
    this.BroadcastEvents = BroadcastEvents;
    this.NavbarService = NavbarService;
    this.$expanded = true;

    const isChannel = StateService.isChannel;
    //name: label to be displayed in navbar
    //icon: icon to be displayed before label
    //id: route that will define destination on click. it's appended on DESTINATION_PREFIX, and if it's a child it's appended after it's parent's id
    //is also used for path-select to decide if .selected should be added or not to that particular item for dynamic class
    //destination: if given, will be used as a destination instead of the id, useful when parent is abstract, with a default view (like menus and menus.list)
    this.menu=[
    {name: gettextCatalog.getString("Home"), icon:"home", id:"home"},
      {name: gettextCatalog.getString("Analytics"), icon:"equalizer", id:"analytics", children: [
        {name: gettextCatalog.getString("Summary"), id:"analyticsSummary"},
        {name: gettextCatalog.getString("Stock"), id:"analyticsStock"},
        {name: gettextCatalog.getString("Customers"), id:"analyticsCustomers"},
        {name: gettextCatalog.getString("Orders"), id:"analyticsOrders"},
        {name: gettextCatalog.getString("Promotions"), id:"analyticsPromotions"}
      ],
      shouldShow:function(){
        return PermissionService.hasPermission(Permissions.ANALYTICS)
      }},
      {name: gettextCatalog.getString("Venue Settings"), icon:"store", id:"venueSettings", children:[
        {name: gettextCatalog.getString("Details"), id:"venueDetails"},
        {name: gettextCatalog.getString("Services"), id:"venueServices"},
        {name: gettextCatalog.getString("Delivery Zones"), id:"venueDeliveryZones", shouldShow:function(){
          return FeatureService.hasDeliveryZoneFeature();
        }},
        {name: gettextCatalog.getString("Operational hours"), id:"venueOpeningHours", shouldShow:function(){
          return StateService.venue && !StateService.venue.isEvent();
        }},
      ],
      shouldShow:function(){
        return !isChannel && PermissionService.hasPermission(Permissions.VENUE_CREATE)
      }},
      {name: gettextCatalog.getString("Tax"), icon:"account_balance", id:"taxes", children:[
        {name: gettextCatalog.getString("Seller Details"), id:"sellerDetails"},
        {name: gettextCatalog.getString("Tax Rates"), id:"taxRates"},
        {name: gettextCatalog.getString("Tax Groups"), id:"taxGroups"}
      ],shouldShow:function(){
        return PermissionService.hasPermission(Permissions.TAXES)
      }},
       {name: gettextCatalog.getString("Payments"), icon:"credit_card", id:"payments",shouldShow:function(){
        return !isChannel && PermissionService.hasPermission(Permissions.ACCOUNT)
      }},
      {name: gettextCatalog.getString("Outlets"), icon:"pin_drop", id:"outlets", children: [
        {name: gettextCatalog.getString("My Outlets"), id:"outletList"},
        {name: gettextCatalog.getString("Outlet Locations"), id:"location"},
      ], shouldShow: function () {
        return !isChannel && FeatureService.hasOutletFeature() && PermissionService.hasPermission(Permissions.ACCOUNT);
      }},
      {name: gettextCatalog.getString("Menus"), icon:"list", id:"menus", children:[
        {name: gettextCatalog.getString("My menus"), id:"menus", destination:"list", exclusions:["itemList","modifiers"]},
        {name: gettextCatalog.getString("Items"), id:"itemList"},
        {name: gettextCatalog.getString("Modifiers"), id:"modifiers"},
      ],shouldShow:function(){
        return !isChannel && PermissionService.hasPermission(Permissions.MENUS)
      }},
      {name: gettextCatalog.getString("Tags"), icon:"label", id:"customTags", children:[
        {name: gettextCatalog.getString("My Tags"), id:"myTags"},
        {name: gettextCatalog.getString("Tag Actions"), id:"tagActions"},
      ],shouldShow:function(){
        return !isChannel && FeatureService.hasItemTagsFeature() && PermissionService.hasPermission(Permissions.MENUS)
      }},
      {name: gettextCatalog.getString("Events"), icon:"event", id:"events", children: [
        {name: gettextCatalog.getString("My Events"), id:"eventList"},
        {name: gettextCatalog.getString("Collection Slots"), id:"collectionSlots"},
      ], shouldShow: function () {
        return !isChannel && StateService.venue  && StateService.venue.isEvent() && PermissionService.hasPermission(Permissions.EVENTS);
      }},
      {name: gettextCatalog.getString("Promotions"), icon:"star", id:"promotions",shouldShow:function(){
        return PermissionService.hasPermission(Permissions.OFFERS)
      }},
      {name: gettextCatalog.getString("Notifications"), icon:"chat", id:"notifications",shouldShow:function(){
        return !isChannel && PermissionService.hasPermission(Permissions.VENUE_CREATE)
      }},
      {name: gettextCatalog.getString("Manage Users"), icon:"account_box", id:"manageUsers",shouldShow:function(){
        return PermissionService.hasPermission(Permissions.ACCOUNT)
      }},
      {name: gettextCatalog.getString("Manage Groups"), icon: "group_work", id: "manageGroups", shouldShow: function() {
        return isChannel
          && PermissionService.hasPermission(Permissions.ACCOUNT)
      }},
      {name: gettextCatalog.getString("Styling"), id:"styling", icon:"color_lens", children:[
      {name: gettextCatalog.getString("Mobile App"), id:"mobileApp"},
        {name: gettextCatalog.getString("Web Orders"), id:"weborders"},
        {name: gettextCatalog.getString("Emails"), id:"emails"}
      ],shouldShow:function(){
        return !isChannel && PermissionService.hasPermission(Permissions.VENUE_CREATE)
      }},
      // {name: gettextCatalog.getString("Group Bookings"), icon:"people", id:"bookings", children:[
      //   {name: gettextCatalog.getString("Settings"), id:"bookingSettings"},
      //   {name: gettextCatalog.getString("Menus"), id:"bookingMenus"},
      // ],shouldShow:function(){
      //   return PermissionService.hasPermission(Permissions.BOOKINGS)
      // }},
      // {name: gettextCatalog.getString("Gift vouchers"), icon:"label", id:"vouchers",shouldShow:function(){
      //   return PermissionService.hasPermission(Permissions.VOUCHERS)
      // }},
      {name: gettextCatalog.getString("Orders"), icon:"receipt", id:"orders", external:window._PREO_DATA._ORDERSAPP,shouldShow:function(){
        return !isChannel && PermissionService.hasPermission(Permissions.ORDERS)
      }},
      {name: gettextCatalog.getString("Update External Menus"), icon:"sync", id:"updateExternalMenus", shouldShow:function(){
        return !isChannel && PermissionService.hasPermission(Permissions.MENUS)
                && FeatureService.hasExternalMenusFeature();
      }},
      {name: gettextCatalog.getString("Customers"), icon:"group", id:"customers.placeholder", path: "customers", shouldShow:function(){
        return isChannel &&
               StateService.isOperator() &&
               PermissionService.hasPermission(Permissions.CHANNEL_OPERATE);
      }},
    ];
  }
}
