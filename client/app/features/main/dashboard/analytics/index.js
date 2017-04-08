// Import Style
import './analytics.scss';
import '../../../../../../node_modules/angular-material-data-table/dist/md-data-table.min.css';

// Import internal modules
import controller from './analytics.controller';
import routes from './analytics.routes';

import customDatafilters from '../../../../components/analytics/customDatafilters';
import barChart from '../../../../components/analytics/barChart';
//import mdTable from '../../../../components/mdTable';
import dropdownActions from '../../../../components/cardActions/dropdownActions';
import doughnutChart from '../../../../components/analytics/doughnutChart';
import iframeLoad from '../../../../components/iframeLoad';
import Customers from './customers';
import Summary from './summary';
import Orders from './orders';
import Stock from './stock';

//import '../../../../../../node_modules/angular-material-data-table/dist/md-data-table.min.js';

import chartjs from '../../../../../../node_modules/chart.js/dist/Chart.min.js';

angular.module("webapp.analytics" , ['ui.router', customDatafilters, barChart,dropdownActions,doughnutChart, iframeLoad, Customers, Summary, Orders, Stock, require('angular-material-data-table')])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
