// Import Style
import './analytics.scss';
import '../../../../../../node_modules/angular-material-data-table/dist/md-data-table.min.css';

// Import internal modules
import controller from './analytics.controller';
import routes from './analytics.routes';

import customDatafilters from './components/customDatafilters';
import barChart from './components/barChart';
import dropdownActions from './components/cardActions/dropdownActions';
import doughnutChart from './components/doughnutChart';

import Customers from './customers';
import Summary from './summary';
import Orders from './orders';
import Stock from './stock';

import ReportsService from './components/reports';
import analyticsFilters from './filters';

//import datatables from '../../../../../../node_modules/angular-datatables/bundles/angular-datatables.umd.js';

import chartjs from '../../../../../../node_modules/chart.js/dist/Chart.min.js';

angular.module("webapp.analytics" , ['ui.router', customDatafilters, barChart,dropdownActions,doughnutChart, Customers, Summary, Orders, Stock, ReportsService, analyticsFilters, require('angular-material-data-table')])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
