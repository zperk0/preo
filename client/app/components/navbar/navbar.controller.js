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

  toggleMenu() {
    this.toggleExpanded();
    this.$expanded = !this.$expanded;
  }

  /* @ngInject */
  constructor($state) {
    'ngInject';
    this.DESTINATION_PREFIX = "main.dashboard.";
    this.$state = $state;
    this.$expanded = true;
    //name: label to be displayed in navbar
    //icon: icon to be displayed before label
    //id: route that will define destination on click. it's appended on DESTINATION_PREFIX, and if it's a child it's appended after it's parent's id
    //is also used for path-select to decide if .selected should be added or not to that particular item for dynamic class
    //destination: if given, will be used as a destination instead of the id, useful when parent is abstract, with a default view (like menus and menus.list)
    this.menu=[
      {name:"Venue Settings", icon:"store", id:"venueSettings"},
      {name:"Menus", icon:"list", id:"menus", destination:"menus.list"},
      {name:"Styling", id:"styling", icon:"color_lens", children:[
        {name:"Styling", id:"mobile"},
        {name:"Web Orders", id:"weborders"},
        {name:"Emails", id:"emails"}
      ]},
      {name:"Events", icon:"event", id:"events"},
      {name:"Outlets", icon:"pin_drop", id:"outlets"},
      {name:"Promotions", icon:"star", id:"promotions"},
      {name:"Notifications", icon:"chat", id:"notifications"},
      {name:"Payments", icon:"credit_card", id:"payments", children:[
        {name:"Payment Methods", id:"paymentMethods"},
        {name:"App mode", id:"appMode"}
      ]},
      {name:"Group Bookings", icon:"people", id:"bookings", children:[
        {name:"Settings", id:"bookingSettings"},
        {name:"Menus", id:"bookingMenus"},
        {name:"Bookings", id:"bookingList"}
      ]},
      {name:"Gift vouchers", icon:"label", id:"vouchers"}
    ];
  }
}
