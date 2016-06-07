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

  handleMouseOver (item, $mdOpenMenu, $event) {
    // must do this or when the user clicks in trap to hide menu the class is not hidden
    this.menu.forEach((i)=>{
        i.$menuOpen = false;
    });
    if(!this.$expanded && item.children){
      item.$menuOpen = true;
      $mdOpenMenu($event);
    }
  }
  handleMouseLeave (item, $mdOpenMenu, $event) {
    if(!this.$expanded && item.children && item.$menuOpen){
      this.$mdMenu.hide();
      item.$menuOpen = false;
    }
  console.log("$event", $event);
  }

  handleClick(item, parent = false, $mdOpenMenu, $event){
    const _handleChildrenExpanded = () => {
      this.toggleExpanded(item);
    };
    const _handleChildrenCollapsed = () => {
      $mdOpenMenu($event);
    };

    if (item.children){
      return this.$expanded ? _handleChildrenExpanded() : _handleChildrenCollapsed();
    }

    if (item.id){
      let prefix = this.DESTINATION_PREFIX;
      if (parent){
        prefix+= parent.id +".";
      }
      this.$state.go(prefix + item.id);
    }

  }

  toggleMenu() {
    this.toggleExpanded();
    this.$expanded = !this.$expanded;
  }

  /* @ngInject */
  constructor($state,$mdMenu) {
    'ngInject';
    console.log("$mdMenu", $mdMenu);
    this.$mdMenu=$mdMenu;
    this.DESTINATION_PREFIX = "main.dashboard.";
    this.$state = $state;
    this.$expanded = true;
    this.menu=[
      {name:"Venue Settings", icon:"store", id:"venueSettings"},
      {name:"Menus", icon:"list", id:"menus"},
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
