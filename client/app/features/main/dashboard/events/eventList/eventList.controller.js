
export default class eventListViewController {
  static get UID(){
    return "eventListViewController"
  }

  hideSpinner() {

    this.Spinner.hide('events');
  }

  getEventByDate (date) {

    let dateFormat = moment(date).format('DD/MM/YYYY');

    let events = this.expandedSchedules[dateFormat] || [];

    return events;
  }

  getDayEventsName (date) {

    let events = this.getEventByDate(date);

    let eventsName = events.map((event) => {

      return '<span>' + event.name + '</span>';
    }).join('');

    let html = eventsName;

    if (events.length > 1) {
      html = [
                '<div>',
                  '<div class="event-calendar-item">',
                    '<a ng-href>' + events.length + ' ' + this.gettextCatalog.getString('events') + '</a>',
                    '<div class="event-tooltip">' + eventsName + '</div>',
                  '</div>',
                '</div>'
              ].join('');
    }

    return html;
  }

  orderDayEvents (events) {
    return events.sort((a, b) => {
        return a.moment.isAfter(b.moment) ? 1 : -1;
    });
  }

  getDayEvents (date) {
    let events = [];
    for (let event of this.data.events) {
      for (let schedule of event.schedules) {
        for (let occurrence of schedule.occurrences) {
          let occurrenceMoment = moment(occurrence.date);
          if (occurrenceMoment.isSame(moment(date), 'day')) {
            events.push({ time: occurrenceMoment.format('HH:mm'), name: event.name, moment: occurrenceMoment.clone() });
          }
        }
      }
    }
    return this.orderDayEvents(events);
  }

  getEventsName (events) {
    let html = [];
    if (events && events.length) {
      for (let event of events.slice(0, 2)) {
        html.push('<div class="event-calendar-item">' + event.time + ' - ' + event.name + '</div>');
      }
      if (events.slice(2).length) {
        html.push('<div class="event-calendar-item remaining"> + ' + events.slice(2).length + ' more</div>');
      }
    }
    return html.join('');
  }

  setDayContent (date) {

    let events = this.getDayEvents(date);
    let eventsName = this.getEventsName(events);

    if (eventsName.length) {
      eventsName = this.$sce.trustAsHtml(eventsName);
    }

    this.MaterialCalendarData.data[this.MaterialCalendarData.getDayKey(date)] = eventsName || "";
  }

  toggleMode () {

    this.Spinner.show('events');

    if (!this.isCalendarMode()) {
      this.expandSchedules();
    } else {
      this.expandedSchedules = {};
    }


    this.$timeout(() => {

      this.calendarMode = !this.calendarMode;

      this.Spinner.hide('events');
    }, 500);
  }

  isCalendarMode () {

    return this.calendarMode;
  }

  addExpandedScheduleItem(dates, event) {

    for (var i = dates.length - 1; i >= 0; i--) {
      let date = dates[i];

      let dateFormat = moment(date).format('DD/MM/YYYY');
      if (!this.expandedSchedules[dateFormat]) {
        this.expandedSchedules[dateFormat] = [];
      }

      if (this.expandedSchedules[dateFormat].indexOf(event) === -1) {
        this.expandedSchedules[dateFormat].push(event);
      }
    }
  }

  expandSchedules () {

    for (var i = 0, len = this.data.events.length; i < len; i++) {
      let event =  this.data.events[i];

      for (var k = 0, kLen = event.schedules.length; k < kLen; k++) {
        let schedule = event.schedules[k];

        let dates = this.EventScheduleService.expandSchedule(schedule);
        this.addExpandedScheduleItem(dates, event);
      }
    }
  }

  /* @ngInject */
  constructor($scope, $q, $sce, $timeout, $compile, Spinner, EventService, VenueService, OutletLocationService, CollectionSlotsService, gettextCatalog, MaterialCalendarData, EventScheduleService) {
  	'ngInject';

    this.$scope = $scope;
    this.$sce = $sce;
    this.$timeout = $timeout;
    this.$compile = $compile;
    this.Spinner = Spinner;
    this.gettextCatalog = gettextCatalog;
    this.MaterialCalendarData = MaterialCalendarData;
    this.EventScheduleService = EventScheduleService;

  	this.loaded = false;
    this.calendarMode = false;
    this.expandedSchedules = {};

    this.Spinner.show('events');

    this.calendar = {
      selectedDate: null,
      firstDayOfWeek: 0,
      dayFormat: 'd',
      tooltips: false
    };

    MaterialCalendarData.setDayContent = this.setDayContent.bind(this);


    $q.all([
        EventService.getLastWeekEvents(VenueService.currentVenue.id),
        OutletLocationService.getOutletLocations(),
        CollectionSlotsService.getCollectionSlots({
          venueId: VenueService.currentVenue.id
        })
      ]).then((results) => {

        this.data = results[0];

        this.loaded = true;
        this.hideSpinner();
      }, (err) => {

        this.data = {
          events: []
        };
        console.log('error events service', err);
        this.loaded = true;

        this.hideSpinner();
      });
  }
}
