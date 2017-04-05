// Import Style
import './analytics.scss';

// Import internal modules
import controller from './analytics.controller';
import routes from './analytics.routes';

import barChart from '../../../../components/analyticsCharts/barChart';
import mdTable from '../../../../components/mdTable';
import doughnutChart from '../../../../components/analyticsCharts/doughnutChart';
import iframeLoad from '../../../../components/iframeLoad';
import Customers from './customers';
import Summary from './summary';
import Orders from './orders';
import Stock from './stock';

import chartjs from '../../../../../../node_modules/chart.js/dist/Chart.min.js';

angular.module("webapp.analytics" , ['ui.router', barChart,mdTable,doughnutChart, iframeLoad, Customers, Summary, Orders, Stock])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
