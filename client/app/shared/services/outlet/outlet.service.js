export default class OutletService {

  static get UID(){
    return "OutletService";
  }

  save(newData) {

    return Preoday.Outlet.save(newData);
  }  

  getOutlets(data){
    if (this.data.outlets){
      return this.$q.resolve(this.data);
    } else if ( this.p){
      return this.p;
    }

    data.expand = 'menus';

    this.p = this.$q((resolve, reject)=>{
      Preoday.Outlet.getAll(data)
        .then((outlets)=>{
          this.data.outlets = outlets;
          resolve(this.data);
        },(err)=>{
          console.log("Error fetching outlets", err);
          reject(err);
        })
        .catch((err)=>{
          console.log("Error fetching outlets", err);
          reject(err);
        });
    })
    return this.p;
  }

  findById (id) {

    let item = this.data.outlets.filter(function (o) {
      return o.id === id;
    });

    return item && item.length ? item[0] : null;
  }

  constructor($q, $rootScope, $stateParams) {
    "ngInject";
    this.$stateParams = $stateParams;
    this.$q =$q;
    this.data={};

  }
}