export default class EventScheduleService {

  static get UID() {

    return "EventScheduleService";
  }

  save (data) {

    return Preoday.EventSchedule.create(data);
  }

  getNewScheduleModel(eventId) {

    let schedule = new Preoday.EventSchedule({
      eventId: eventId,
      freq: this.EventScheduleFrequency.ONCE,
      pickupSlots: [],

      $selected: true,
      $show: true
    });  
    
    return schedule;  
  }

  constructor($q, EventScheduleFrequency) {
    "ngInject";

    this.$q = $q;
    this.EventScheduleFrequency = EventScheduleFrequency;

    this.data = {};
  }
}