import BroadcastEvents from './app.broadcastEvents.constants';
import EventScheduleFrequency from './shared/constants/app.eventScheduleFrequency.constant';
import APIErrorCode from './shared/constants/app.apiErrorCode.constants';
import AnalyticsChartsCodes from './shared/constants/app.analyticsCharts.constants';

export default angular.module('webapp.constants', [])

  .constant('BroadcastEvents', BroadcastEvents)
  .constant('EventScheduleFrequency', EventScheduleFrequency)
  .constant('APIErrorCode', APIErrorCode)
  .constant('AnalyticsChartsCodes', AnalyticsChartsCodes)
  .name;
