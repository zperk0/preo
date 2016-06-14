// Import Style
import './snack.scss';

import angular from 'angular';

// Import internal modules
import service from './snack.service';

export default angular.module("snack" , [])

  .service(service.UID, service)
  .name;
