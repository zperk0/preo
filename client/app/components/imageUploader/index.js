// Import Style
import './imageUploader.scss';


import angular from 'angular';

// Import internal modules
import controller from './imageUploader.controller';
import directive from './imageUploader.directive';
import croppie from './croppie';
import changeDirective from './customOnChange.directive';


export default angular.module("imageUploader" , [croppie])


  .controller(controller.UID, controller)
  .directive("imageUploader", directive)
  .directive('customOnChange', changeDirective)
  .name;
