// Import Style
import './styling.scss';


import './components/tinycolor.js';
import colorpicker from 'md-color-picker/dist/mdColorPicker'
import 'md-color-picker/dist/mdColorPicker.min.css'

// Import internal modules
import controller from './styling.controller';
import routes from './styling.routes';

import mobile from './mobile';
import emails from './emails';
import weborders from './weborders';

require.ensure('angular',function(){
  return angular.module("styling" , ['ui.router', mobile, emails, weborders, 'mdColorPicker'])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
});
