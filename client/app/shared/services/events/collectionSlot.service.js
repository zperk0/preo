export default class CollectionSlotsService {

  static get UID() {

    return "CollectionSlotsService";
  }

  getCollectionSlots(data) {

    if (this.data.outlets){
      return this.$q.resolve(this.data);
    } else if ( this.p){
      return this.p;
    }

    data.expand = 'menus';

    this.p = this.$q((resolve, reject)=>{

      Preoday.PickupSlot.getAll(data)
        .then((collectionSlots)=> {

          this.data.collectionSlots = collectionSlots;
          resolve(this.data);
        },(err)=>{

          console.log("Error fetching collectionSlots", err);
          reject(err);
        })
        .catch((err)=>{
          
          console.log("Error fetching collectionSlots", err);
          reject(err);
        });
    })
    return this.p;
  }

  findById (id) {

    let item = this.data.collectionSlots.filter(function (o) {
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