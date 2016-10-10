import BroadcastEvents from './app.broadcastEvents.constants';
import EventScheduleFrequency from './shared/constants/app.eventScheduleFrequency.constant';

export default angular.module('webapp.constants', [])

  .constant('BroadcastEvents', BroadcastEvents)
  .constant('EventScheduleFrequency', EventScheduleFrequency)
  .name;
