// Import Style
import './snack.scss';

// Import internal modules
import service from './snack.service';

export default angular.module("snack" , [])

  .service(service.UID, service)
  .name;
