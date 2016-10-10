
export default class eventListViewController {
  static get UID(){
    return "eventListViewController"
  }
  
  hideSpinner() {

    this.Spinner.hide('events');
  }

  getEventByDate (date) {

    let dateFormat = moment(date).format('DD/MM/YYYY');

    let events = this.data.events.filter((event) => {

      return event.schedules.filter((schedule) => {

        return moment(schedule.startDate).format('DD/MM/YYYY') === dateFormat;
      }).length > 0;
    });

    return events;
  }

  getDayEventsName (date) {

    let events = this.getEventByDate(date);

    let eventsName = null;

    if (events.length > 1) {
      eventsName = events.length + ' ' + this.gettextCatalog.getString('events');
    } else {
      eventsName = events.map((event) => {

        return '<span>' + event.name + '</span><br />';
      }).join('');
    }  
    
    return eventsName;  
  }

  setDayContent (date) {

    let eventsName = this.getDayEventsName(date);

    this.MaterialCalendarData.data[this.MaterialCalendarData.getDayKey(date)] = eventsName || this.MaterialCalendarData.data[this.MaterialCalendarData.getDayKey(date)] || "";
  }

  toggleMode () {

    this.Spinner.show('events');
    
    this.$timeout(() => {

      this.calendarMode = !this.calendarMode;
      this.Spinner.hide('events');
    }, 500);
  }

  isCalendarMode () {

    return this.calendarMode;
  }

  /* @ngInject */
  constructor($q, $timeout, Spinner, EventService, VenueService, OutletLocationService, gettextCatalog, MaterialCalendarData) {
  	'ngInject';

    this.$timeout = $timeout;
    this.Spinner = Spinner;
    this.gettextCatalog = gettextCatalog;
    this.MaterialCalendarData = MaterialCalendarData;
  	this.loaded = false;
    this.calendarMode = false;

    this.Spinner.show('events');

    this.calendar = {
      selectedDate: null,
      firstDayOfWeek: 0,
      dayFormat: 'd',
      tooltips: true
    };

    MaterialCalendarData.setDayContent = this.setDayContent.bind(this);

    let filter = {
      'after' : moment().subtract(7, 'days').format('YYYY/M/D')
    };

    $q.all([
        EventService.getEvents(VenueService.currentVenue.id, filter),
        OutletLocationService.getOutletLocations()
      ]).then((results) => {

        this.data = results[0];

        this.loaded = true;
        this.hideSpinner();
      }, (err) => {

        this.data = {
          events: []
        };
        console.log('error events service');
        this.loaded = true;

        this.hideSpinner();
      });
  }
}
