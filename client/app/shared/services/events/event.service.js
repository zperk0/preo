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

    var imageToCdn = null;

    if (data.$images && data.$images.length && data.$images[0].$save) {
      imageToCdn = data.$images[0].$image;
    }

    data.image = null;

    var deferred = this.$q.defer();

    if (imageToCdn) {
      Preoday.Event.saveImageToCdn(imageToCdn, this.VenueService.currentVenue.id)
        .then((imagePath) => {

          data.image = imagePath;

          Preoday.Event.create(data)
            .then(deferred.resolve, deferred.reject);
        }, deferred.reject);
    } else {
      Preoday.Event.create(this.VenueService.currentVenue.id, data)
            .then(deferred.resolve, deferred.reject);
    }

    return deferred.promise;
  }

  update (event) {

    var imageToCdn = null;

    if (event.$images && event.$images.length) {
      imageToCdn = event.$images[0].$image;
    }

    var deferred = this.$q.defer();

    if (imageToCdn && imageToCdn !== event.image) {
      Preoday.Event.saveImageToCdn(imageToCdn, this.VenueService.currentVenue.id)
        .then((imagePath) => {

          event.image = imagePath;

          event.update()
            .then(deferred.resolve, deferred.reject);
        }, deferred.reject);
    } else {
      event.update()
            .then(deferred.resolve, deferred.reject);
    }

    return deferred.promise;
  }

  constructor($q, $rootScope, $stateParams, VenueService) {
    "ngInject";

    this.$stateParams = $stateParams;
    this.$q = $q;
    this.data = {};

    this.VenueService = VenueService;
  }
}