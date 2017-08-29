// Import Style
import './styling.scss';


import './components/tinycolor.js';
import styleEditor from './components/styleEditor';
import colorpicker from 'md-color-picker/dist/mdColorPicker'
import 'md-color-picker/dist/mdColorPicker.min.css'

// Import internal modules
import controller from './styling.controller';
import routes from './styling.routes';

import mobileApp from './mobileApp';
import mobile from './mobile';
import emails from './emails';
import weborders from './weborders';

angular.module("webapp.styling" , ['ui.router', mobileApp, mobile, emails, weborders, 'mdColorPicker', styleEditor])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
