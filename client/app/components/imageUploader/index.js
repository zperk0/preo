// Import Style
import './imageUploader.scss';


import angular from 'angular';

// Import internal modules
import controller from './imageUploader.controller';
import directive from './imageUploader.directive';
import croppie from './croppie';
import changeDirective from './customOnChange.directive';
import PreodayServices from '../../shared/services';


export default angular.module("imageUploader" , [croppie, PreodayServices])


  .controller(controller.UID, controller)
  .directive("imageUploader", directive)
  .directive('customOnChange', changeDirective)
  .name;
