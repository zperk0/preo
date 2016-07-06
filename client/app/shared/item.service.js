export default class ItemService {

  static get UID(){
    return "ItemService";
  }



  getItems(venueId, expand){
    return this.$q((resolve, reject)=>{

      if (this.items){
        resolve(this.items);
      } else {
        Preoday.Item.getAll({venueId:venueId, expand:expand})
        .then((items)=>{
          this.items = items;
          resolve(items);
        },(err)=>{
          console.log("Error fetching items", err);
          reject(err);
        })
        .catch((err)=>{
          console.log("Error fetching items", err);
          reject(err);
        });
      }
    })
  }



  constructor($q, $rootScope) {
    "ngInject";
    this.$q =$q;

  }
}