import BroadcastEvents from './app.broadcastEvents.constants';
import EventScheduleFrequency from './shared/constants/app.eventScheduleFrequency.constant';
import APIErrorCode from './shared/constants/app.apiErrorCode.constants';
import ReportTypes from './shared/constants/app.reportTypes.constants';
import CardActionsCodes from './shared/constants/app.cardActions.constants';

export default angular.module('webapp.constants', [])

  .constant('BroadcastEvents', BroadcastEvents)
  .constant('EventScheduleFrequency', EventScheduleFrequency)
  .constant('APIErrorCode', APIErrorCode)
  .constant('ReportTypes', ReportTypes)
  .constant('CardActionsCodes', CardActionsCodes)
  .name;
