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

  expandSchedule (schedule) {

    let dates = [];

    if(schedule.startDate && schedule.startDate != '') {

      var start = this.DateUtils.getDateObj(schedule.startDate),
          end = this.DateUtils.getDateObj(schedule.endDate),
          totalDays = this.DateUtils.daysBetween(start, end);

      switch(schedule.freq) {
        case this.EventScheduleFrequency.ONCE:

          var date = this.DateUtils.getDateObj(schedule.startDate);
          dates.push(date);
        break;
        case this.EventScheduleFrequency.DAILY:
          for(var i = 0; i <= totalDays; i++) {

            var date = this.DateUtils.addDays(start, i);
            dates.push(date);
          }
        break;
        case this.EventScheduleFrequency.WEEKLY:

          var lastDate = start,
              oneWeek = 1000 * 60 * 60 * 24 * 7,
              summertimeDiff = 1000 * 60 * 60;

          while((lastDate.getTime() + oneWeek) <= end.getTime() +  summertimeDiff) {

            dates.push(lastDate);
            lastDate = this.DateUtils.addDays(lastDate, 7);
          }

        break;
        case this.EventScheduleFrequency.MONTHLY:

          var lastDate = start,
              summertimeDiff = 1000 * 60 * 60;

          do {

            if(lastDate.getTime() <= end.getTime()) {
              dates.push(new Date(lastDate));
            }

            lastDate.setMonth(lastDate.getMonth() + 1);

          } while(lastDate.getTime() <= end.getTime() + summertimeDiff);

        break;
        case this.EventScheduleFrequency.YEARLY:

          var lastDate = start;

          while((lastDate.getFullYear()) <= end.getFullYear()) {

            if(lastDate.getTime() <= end.getTime()) {
              dates.push(new Date(lastDate));
            }

            lastDate.setFullYear(lastDate.getFullYear() + 1);
          }

        break;
      }
    }

    return dates;
  }

  constructor($q, EventScheduleFrequency, DateUtils) {
    "ngInject";

    this.$q = $q;
    this.EventScheduleFrequency = EventScheduleFrequency;
    this.DateUtils = DateUtils;

    this.data = {};
  }
}