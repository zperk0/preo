// Import Style
import './spinner.scss';


// Import internal modules
import directive from './spinner.directive';
import service from './spinner.service';

export default angular.module("spinner" , [])
  .directive("spinner", directive)
  .service(service.UID, service)
  .name;
