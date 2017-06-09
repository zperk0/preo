export default class externalEventListController {
  static get UID(){
    return "externalEventListController"
  }

  onDelete(tmEvent){
    console.log('remove', tmEvent);
  }

  showContextual(){
    console.log('showing contextual');
    this.contextual.showDrawer('eventsImport')
      .then((eventsImported) => {

        this.Snack.show(this.gettextCatalog.getString("Events imported successfully."));

        eventsImported.forEach((ev) => {
          
           let event = new Preoday.Event({
             venueId: ev.venueId,
             visible: 1,
             $images: ev.images ? ev.images : [],
             schedules: ev.schedules,
             name: ev.name,
             id: ev.id,
             $selected: false,
             externalEvents: ev.externalEvents
           });
       
          this.events.push(event);  
        });         
        
       // this.events = this.events.concat(eventsImported);

        console.log('outletLocation selected ->> ', this.events);
      }, () => {
      
        console.log('Drawer Event Import cancelled');
      })
    .catch((err) => {
      console.log('Error importing events -', err);
      this.Snack.showError(this.gettextCatalog.getString("An error occurred while importing events. Please try again."));
    });
  }

  /* @ngInject */
  constructor($scope, contextual) {
    'ngInject';

    this.hasActions = true;
    this.hasNew = true;
    this.contextual = contextual;

    this.event.externalEvents.forEach((x) => {
      x.showName = moment(x.eventDate).format('L')+ " - " +this.event.name;
    });
  }
}
