export default class ExternalService {

  static get UID(){
    return "ExternalService"
  }

  getTicketMasterEvents(venueIds){
    return this.$q((resolve,reject)=>{
      
      Preoday.External.getEventsByVenueIds(venueIds)
        .then((events)=>{
          
          console.log("ExternalService - Reesolve get events")
          resolve(events);
        }, (err)=>{
          console.error("Error fetching events : ", err)
          reject();
      }).catch((err)=>{
        console.error("Error fetching events : ", err)
        reject();
      })
    })

  }

  importTicketMasterEventToPreoday(venueId, eventName, tmEvents, collectionSlots){
    return this.$q((resolve,reject)=>{
      
      Preoday.External.importTicketMasterEventsToPreday(venueId, eventName, tmEvents, collectionSlots)
        .then((events)=>{
          
          console.log("ExternalService - resolve posting events to Preoday")
          resolve(events);
        }, (err)=>{
          console.error("Error posting events : ", err)
          reject();
      }).catch((err)=>{
        console.error("Error posting events : ", err)
        reject();
      })
    })

  }

  constructor($q, gettextCatalog, $injector) {
    "ngInject";

    this.$q = $q;
    this.gettextCatalog = gettextCatalog;
    this.$injector = $injector;
  }
}
