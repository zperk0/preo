import BroadcastEvents from './app.broadcastEvents.constants';
import EventScheduleFrequency from './shared/constants/app.eventScheduleFrequency.constant';
import APIErrorCode from './shared/constants/app.apiErrorCode.constants';
import ChartsValueTypes from './shared/constants/app.chartsValueTypes.constants';
import CardActionsCodes from './shared/constants/app.cardActions.constants';

export default angular.module('webapp.constants', [])

  .constant('BroadcastEvents', BroadcastEvents)
  .constant('EventScheduleFrequency', EventScheduleFrequency)
  .constant('APIErrorCode', APIErrorCode)
  .constant('ChartsValueTypes', ChartsValueTypes)
  .constant('CardActionsCodes', CardActionsCodes)
  .name;
