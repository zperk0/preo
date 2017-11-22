import BroadcastEvents from './app.broadcastEvents.constants';
import EventScheduleFrequency from './shared/constants/app.eventScheduleFrequency.constant';
import APIErrorCode from './shared/constants/app.apiErrorCode.constants';
import ReportTypes from './shared/constants/app.reportTypes.constants';
import VenueImageType from './shared/constants/app.venueImageType.constants';
import PaymentType from './shared/constants/app.paymentType.constants';

export default angular.module('webapp.constants', [])

  .constant('BroadcastEvents', BroadcastEvents)
  .constant('EventScheduleFrequency', EventScheduleFrequency)
  .constant('APIErrorCode', APIErrorCode)
  .constant('ReportTypes', ReportTypes)
  .constant('VenueImageType', VenueImageType)
  .constant('PaymentType', PaymentType)
  .name;
