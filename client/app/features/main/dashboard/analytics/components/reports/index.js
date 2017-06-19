
import reports from './reports.service';

export default angular.module("analytics.reports", [])
  .service(reports.UID, reports)
  .name;
