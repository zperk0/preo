export default class ExternalService {

  static get UID(){
    return "ExternalService"
  }

  cleanEntityEvent(){
    this.entityEvent = null;
  }

  setEntityEvent(event){
    this.entityEvent = event;
  }

  getEntityEvent(){
    return this.entityEvent;
  }

  getHasChanges(){
    return this.hasChanges;
  }

  setHasChanges(param){
    this.hasChanges = param;
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

  importTicketMasterEventToPreoday(venueId, tmEvents, collectionSlots){
    return this.$q((resolve,reject)=>{
      
      Preoday.External.importTMEventsToPreday(venueId, tmEvents, collectionSlots)
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

  deleteTMEventOfPreodayEvent(eventId, domainId, externalEventId){
    return this.$q((resolve,reject)=>{

      Preoday.External.deleteTMEventOfPreodayEvent(eventId, domainId, externalEventId)
        .then((events)=>{
          
          console.log("ExternalService - delete event successfull")
          resolve(events);
        }, (err)=>{
          console.error("Error deleting tmEvent: ", err)
          reject();
      }).catch((err)=>{
        console.error("Error deleting tmEvent : ", err)
        reject();
      })
    })

  }

  addTMEventToExistentEvent(eventId, venueId, tmEvents){
    return this.$q((resolve,reject)=>{
      
      Preoday.External.addTMEventToExistentEvent(eventId, venueId, tmEvents)
        .then((event)=>{
          
          console.log("ExternalService - Reesolve add tmEvents to Event")
          resolve(event);
        }, (err)=>{
          console.error("Error adding events to existent eventId : ", err)
          reject();
      }).catch((err)=>{
        console.error("Error adding events to existent eventId: ", err)
        reject();
      })
    })

  }

  getTMEventsLinkedtoEventId(venueId, eventId){
    return this.$q((resolve,reject)=>{
      
      Preoday.External.getTMEventsLinkedtoEventId(venueId, eventId)
        .then((events)=>{
          
          console.log("ExternalService - Reesolve get events by eventId")
          resolve(events);
        }, (err)=>{
          console.error("Error fetching events of existent eventId: ", err)
          reject();
      }).catch((err)=>{
        console.error("Error fetching events of existent eventId: ", err)
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
