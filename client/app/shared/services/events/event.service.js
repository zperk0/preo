export default class EventService {

  static get UID() {

    return "EventService";
  }

  getEvents(data) {

    if (this.data.events){
      return this.$q.resolve(this.data);
    } else if ( this.p){
      return this.p;
    }

    this.p = this.$q((resolve, reject)=>{

      Preoday.Event.getAll(data)
        .then((events)=> {

          this.data.events = events;
          resolve(this.data);
        },(err)=>{

          console.log("Error fetching events", err);
          reject(err);
        })
        .catch((err)=>{
          
          console.log("Error fetching events", err);
          reject(err);
        });
    })
    return this.p;
  }

  findById (id) {

    let item = this.data.events.filter(function (o) {
      return o.id === id;
    });

    return item && item.length ? item[0] : null;
  }

  save (data) {

    return Preoday.Event.create(data);
  }

  constructor($q, $rootScope, $stateParams) {
    "ngInject";

    this.$stateParams = $stateParams;
    this.$q = $q;
    this.data = {};
  }
}