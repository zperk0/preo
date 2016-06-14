// Import Style
import './dialog.scss';

import angular from 'angular';

// Import internal modules
import service from './dialog.service';

export default angular.module("dialog" , [])

  .service(service.UID, service)
  .name;
