
import service from './reports.service';

export default angular.module("analytics.reports", [])
  .service(service.UID, service)
  .name;
