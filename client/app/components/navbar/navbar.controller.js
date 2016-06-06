export default class navbarController {
  static get UID(){
    return "navbarController";
  }

  toggleExpanded(item = false){
    this.menu.forEach((i)=>{
      if (item !== i){
        i.$expanded = false;
      }
    });
    if (item){
      item.$expanded = !item.$expanded;
    }
  }

  handleClick(item, parent = false){
    if (item.children){
      this.toggleExpanded(item);
      return;
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
  constructor($state) {
    'ngInject';

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
      {name:"Payments", icon:"credit_card", id:"payments"},
      {name:"Group Bookings", icon:"people", id:"bookings"},
      {name:"Gift vouchers", icon:"label", id:"vouchers"}
    ];
  }
}
