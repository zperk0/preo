export default class MenuService {

  static get UID(){
    return "MenuService";
  }

  getMenus(data){

    if (this.data.menus){
      return this.$q.resolve(this.data);
    } else if ( this.p){
      return this.p;
    }

    if (!data) {
      data = {};
    }

    data.noExpand = true;

    this.p = this.$q((resolve, reject)=>{

	    Preoday.Menu.getMenusEditor(data)
	    .then((menus) => {

	    	this.data.menus = menus;
	    	resolve(this.data);
	    }, (err) => {

	      console.log("Error fetching menus", err);
	      reject(err);
	    });
    })
    return this.p;
  }

  getMenuById (id) {

  	if (!this.data || !this.data.menus) {
  		return null;
  	}

  	let menu = this.data.menus.filter((item) => {

  		return item.id == id;
  	});

  	return menu.length && menu[0] || null;
  }

  constructor($q, $rootScope, $location) {
    "ngInject";
    this.data = {};
    this.$q =$q;
    this.DEBUG = window.DEBUG || $location.search().debug;
  }
}