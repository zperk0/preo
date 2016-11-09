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
    console.log("broadcasting");
    this.$rootScope.$broadcast(this.BroadcastEvents._ON_NAVBAR_TOGGLE,this.expanded);
  }


  constructor($state, gettextCatalog, FeatureService, VenueService, $rootScope, $timeout, BroadcastEvents) {
    "ngInject";
    this.DESTINATION_PREFIX = "main.dashboard.";
    this.$state = $state;
    this.$timeout = $timeout;
    this.$rootScope = $rootScope;
    this.BroadcastEvents = BroadcastEvents;
    this.$expanded = true;
    //name: label to be displayed in navbar
    //icon: icon to be displayed before label
    //id: route that will define destination on click. it's appended on DESTINATION_PREFIX, and if it's a child it's appended after it's parent's id
    //is also used for path-select to decide if .selected should be added or not to that particular item for dynamic class
    //destination: if given, will be used as a destination instead of the id, useful when parent is abstract, with a default view (like menus and menus.list)
    this.menu=[
      {name: gettextCatalog.getString("Analytics"), icon:"equalizer", id:"analytics"},
      {name: gettextCatalog.getString("Venue Settings"), icon:"store", id:"venueSettings", children:[
        {name: gettextCatalog.getString("Details"), id:"venueDetails"},
        {name: gettextCatalog.getString("Location"), id:"venueLocation"},
        {name: gettextCatalog.getString("Services"), id:"venueServices"},
        {name: gettextCatalog.getString("Delivery Zones"), id:"venueDeliveryZones"},
      ]},
      {name: gettextCatalog.getString("Tax"), icon:"account_balance", id:"taxes", children:[
        {name: gettextCatalog.getString("Seller Details"), id:"sellerDetails"},
        {name: gettextCatalog.getString("Tax Groups"), id:"taxGroups"}
      ]},
       {name: gettextCatalog.getString("Payments"), icon:"credit_card", id:"payments", children:[
        {name: gettextCatalog.getString("Payment Methods"), id:"paymentMethods"},
        {name: gettextCatalog.getString("App mode"), id:"appMode"}
      ]},
      {name: gettextCatalog.getString("Outlets"), icon:"pin_drop", id:"outlets", children: [
        {name: gettextCatalog.getString("My Outlets"), id:"outletList"},
        {name: gettextCatalog.getString("Outlet Locations"), id:"location"},
      ], shouldShow: function () {
        return FeatureService.hasOutletFeature();
      }},
      {name: gettextCatalog.getString("Menus"), icon:"list", id:"menus", children:[
        {name: gettextCatalog.getString("My menus"), id:"menus", destination:"list", exclusions:["itemList","modifiers"]},
        {name: gettextCatalog.getString("Items"), id:"itemList"},
        {name: gettextCatalog.getString("Modifiers"), id:"modifiers"},
      ]},
      {name: gettextCatalog.getString("Events"), icon:"event", id:"events", children: [
        {name: gettextCatalog.getString("My Events"), id:"eventList"},
        {name: gettextCatalog.getString("Collection Slots"), id:"collectionSlots"},
      ], shouldShow: function () {

        return VenueService.hasVenueSet() && VenueService.currentVenue.isEvent();
      }},
      {name: gettextCatalog.getString("Promotions"), icon:"star", id:"promotions"},
      {name: gettextCatalog.getString("Mange Users"), icon:"account_box", id:"manageUsers"},

      {name: gettextCatalog.getString("Styling"), id:"styling", icon:"color_lens", children:[
        {name: gettextCatalog.getString("Styling"), id:"mobile"},
        {name: gettextCatalog.getString("Web Orders"), id:"weborders"},
        {name: gettextCatalog.getString("Emails"), id:"emails"}
      ]},
      {name: gettextCatalog.getString("Group Bookings"), icon:"people", id:"bookings", children:[
        {name: gettextCatalog.getString("Settings"), id:"bookingSettings"},
        {name: gettextCatalog.getString("Menus"), id:"bookingMenus"},
      ]},
      {name: gettextCatalog.getString("Gift vouchers"), icon:"label", id:"vouchers"},
      {name: gettextCatalog.getString("Orders"), icon:"receipt", id:"orders", external:window._PREO_DATA._ORDERSAPP}
    ];
  }
}
