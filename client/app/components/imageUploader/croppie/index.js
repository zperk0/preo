// Import Style
import './croppie.scss';

// Import internal modules
import directive from './croppie.directive';
import service from './croppie.service';

export default angular.module("croppie" , [])
  .directive("croppie", directive)
  .service(service.UID, service)
  .name;
