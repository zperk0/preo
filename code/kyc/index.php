<?  session_start();
  require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/lang.php'); //need this for multi-language support
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/authentication.php');  
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php'); 
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php'); 
?>
  
  <link rel="stylesheet" href="/code/kyc/js/directives/multiselect/multiselect.css"/>  

  <link rel="stylesheet" href="/code/kyc/css/app.css"/>    
  
<div ng-app="kyc" ng-controller='MenuCtrl' ng-init="showDateFilter = true" class='kycWrapper'>  
   <div class="container-fluid faixa-orange">
      <div class="row">
        <h4 class="title-white"><span class="icon-know-customers"></span><? echo _("Know your customers")?></h4>
      </div>
    </div> 
  <header>    
    <nav class="row withEvents" data-topbar role="navigation" id="navbar-menu">
          <ul>
            <li class="metrics" ng-class='{active:currentLocation==="dashboard"}' ng-click='setLocation("dashboard")'><span><? echo _("Metrics")?></span></li>
            <li class="stock" ng-class='{active:currentLocation==="stock"}' ng-click='setLocation("stock")'><span><? echo _("Stock")?></span></li>
            <li class="customers" ng-class='{active:currentLocation==="customers"}' ng-click='setLocation("customers")'><span><? echo _("Customers")?></span></li>
            <li class="reports" ng-class='{active:currentLocation==="reports"}' ng-click='setLocation("reports")'><span><? echo _("Reports")?></span></li>
            <li class="live-stream" ng-class='{active:currentLocation==="stream"}' ng-click='setLocation("stream")'><span><? echo _("Live stream")?></span></li>
            <li class="events" ng-if="venue.eventFlag" ng-class='{active:currentLocation==="events"}' ng-click='setLocation("events")'><span><? echo _("Events")?></span></li>
            <li class="orders" ng-if="!venue.eventFlag" ng-class='{active:currentLocation==="orders"}' ng-click='setLocation("orders")'><span><? echo _("Orders")?></span></li>
          </ul>
    </nav>
  </header>
  <div class='clearfix'></div>

  
    <div class="container-fluid" id="container-search" ng-if="currentLocation != 'reports'">
      <div class="row formContainer" >     
          <form class="navbar-form navbar-left columns large-7 small-12 nopadding" role="search" ng-if="!isEventFilter()" ng-submit="update()">
            <div class='row nomargin'>
              <div class="columns large-12 small-12 nopadding">              
                  <label>
                  <? echo _("Outlet Name:")?></label>
                  <div class='columns large-9 small-10 nopadding'>
                    <multi-select
                        class="selectOutlet"    
                        input-model="outlets"    
                        button-label="name"
                        item-label="name"
                        tick-property="selected"
                        default-label="{{venue.name }}"
                    ></multi-select>
                   </div>
                   <div class='columns large-3 small-2'>
                    <button type="submit" class="preodayButton small "><? echo _("Refresh")?></button>            
                   </div>                
              </div>
            </div>
          </form>        
                
          <form ng-submit="update()" class='navbar-form navbar-left columns large-5 small-12 nopadding' ng-if="showDateFilter">            
              <div class="row nomargin">              
                  <label><? echo _("Date Range:")?></label>
                  <div class="columns large-4 small-4 nopadding"> 
                    <input type="text" class="form-control input-search dropdown pdDropdown" datepicker end="form.end_date" ng-model="form.start_date" />
                  </div>
                  <div class='columns large-1 small-2 dateTo nopadding'>
                    <? echo _("to") ?>
                  </div>
                  <div class="columns large-4 small-4 nopadding"> 
                    <input type="text" class="form-control input-search dropdown pdDropdown" datepicker start="form.start_date" ng-model="form.end_date" />
                  </div>
                  <div class="columns large-3 small-2 nopadding"> 
                    <button type="submit" class="preodayButton small pull-right"><? echo _("Refresh")?></button>
                  </div>
              </div>                      
          </form>

          <form class="navbar-form navbar-left columns large-6 small-12 nopadding" role="search" ng-if="isEventFilter()" ng-submit="updateDataWithEvents()">
            <div class='row nomargin'>
              <div class="columns large-12 small-12 nopadding">              
                  <label>
                  <? echo _("Events: ")?></label>
                  <div class='columns large-9 small-10 nopadding'>           
                    <multi-select
                        class="selectOutlet selectEvents"    
                        input-model="events"
                        enable-search="true"
                        button-label="fullName"
                        item-label="fullName"
                        tick-property="selected"
                        default-label="{{ defaultLabelEvents }}"
                    ></multi-select>
                   </div>
                   <div class='columns large-3 small-2'>
                    <button type="submit" class="preodayButton small "><? echo _("Refresh")?></button>            
                   </div>                
              </div>
            </div>
          </form>            
      </div>
    </div>
    <div ng-view></div>

  
    <div class="loading" ng-show="requests">
      <div class="background-loading"></div>
      <div class="loading-content">
        <div class="spinner">
          <div class="b1 se"></div>
          <div class="b2 se"></div>
          <div class="b3 se"></div>
          <div class="b4 se"></div>
          <div class="b5 se"></div>
          <div class="b6 se"></div>
          <div class="b7 se"></div>
          <div class="b8 se"></div>
          <div class="b9 se"></div>
          <div class="b10 se"></div>
          <div class="b11 se"></div>
          <div class="b12 se"></div>
        </div>
      </div>
    </div>  



  <script src="//d3dy5gmtp8yhk7.cloudfront.net/2.1/pusher.min.js" type="text/javascript"></script>
  <script src="/js/angular_all.min.js"></script>      
  <!-- BEGIN WATCH
  <script src="/bower_components/select2/select2.js"></script>    
  <script src="/js/jquery.dotdotdot.min.js"></script>    
  <script src="/bower_components/angular-ui-select2/src/select2.js"></script>    
  <script src="/code/kyc/js/app.js"></script>
  <script src="/code/notification/notification.js"></script>
  <script src="/code/kyc/js/services/chart.js"></script>
  <script src="/code/kyc/js/services/grid.js"></script>
  <script src="/code/loader/ajaxInterceptor.js"></script>
  <script src="/code/kyc/js/services/outlets.js"></script>
  <script src="/code/kyc/js/services/pusher.js"></script>
  <script src="/code/kyc/js/services/orders.js"></script>
  <script src="/code/kyc/js/services/venue.js"></script>
  <script src="/code/kyc/js/services/utils.js"></script>
  <script src="/code/kyc/js/controllers/dashboard.js"></script>
  <script src="/code/kyc/js/controllers/customers.js"></script>
  <script src="/code/kyc/js/controllers/reports.js"></script>
  <script src="/code/kyc/js/controllers/stock.js"></script>
  <script src="/code/kyc/js/controllers/stream.js"></script>
  <script src="/code/kyc/js/controllers/events.js"></script>
  <script src="/code/kyc/js/controllers/orders.js"></script>
  <script src="/code/kyc/js/controllers/menu.js"></script>
  <script src="/code/kyc/js/resources/export.js"></script>
  <script src="/code/kyc/js/resources/outlet.js"></script>
  <script src="/code/kyc/js/resources/order.js"></script>  
  <script src="/code/kyc/js/resources/venue.js"></script>  
  <script src="/code/kyc/js/resources/customers.js"></script>
  <script src="/code/kyc/js/resources/report.js"></script>  
  <script src="/code/kyc/js/constants/chartType.js"></script>
  <script src="/code/kyc/js/constants/colors.js"></script>
  <script src="/code/kyc/js/constants/tickInterval.js"></script>
  <script src="/code/kyc/js/directives/chart/chart.js"></script>
  <script src="/code/kyc/js/directives/highcharts/highcharts.js"></script>
  <script src="/code/kyc/js/directives/datepicker/datepicker.js"></script>
  <script src="/code/kyc/js/directives/multiselect/multiselect.js"></script>
  <script src="/code/kyc/js/directives/shapeshifter.js"></script>
  <script src="/code/kyc/js/directives/dotdotdot.js"></script>
  <script src="/code/kyc/js/directives/marketing/marketing.js"></script>
  <script src="/code/kyc/js/charts/allCharts.js"></script>
  <script src="/code/kyc/js/charts/chartHelper.js"></script>
  <script src="/code/kyc/js/charts/payingCustomers.js"></script>
  <script src="/code/kyc/js/charts/ordersPerCustomer.js"></script>
  <script src="/code/kyc/js/charts/averageOrderValue.js"></script>
  <script src="/code/kyc/js/charts/itemsOrdered.js"></script>
  <script src="/code/kyc/js/charts/ordersByOutlet.js"></script>
  <script src="/code/kyc/js/charts/mostPopularItems.js"></script>
  <script src="/code/kyc/js/charts/timeOfOrdersPlaced.js"></script>
  <script src="/code/kyc/js/charts/averageOrderValueArea.js"></script>
  <script src="/code/kyc/js/charts/customersPie.js"></script>
  <script src="/code/kyc/js/charts/customersBar.js"></script>
  <script src="/code/kyc/js/charts/numberOfOrders.js"></script>
  <script src="/code/kyc/js/charts/menuItemPopularity.js"></script>
  <script src="/code/kyc/js/charts/revenue.js"></script>
  <script src="/code/kyc/js/reports/allReports.js"></script>
  <script src="/code/kyc/js/reports/newCustomers.js"></script>
  <script src="/code/kyc/js/reports/zeroOrdersCustomers.js"></script>
  <script src="/code/kyc/js/reports/oneTimeBuyers.js"></script>
  <script src="/code/kyc/js/reports/mostFrequentBuyers.js"></script>
  <script src="/code/kyc/js/reports/highestSpendingCustomers.js"></script>
  <script src="/code/kyc/js/reports/customersIncreasingOrders.js"></script>
  <script src="/code/kyc/js/reports/customersDecreasingOrders.js"></script>
  <script src="/code/kyc/js/reports/customersIncreasingSpend.js"></script>
  <script src="/code/kyc/js/reports/customersDecreasingSpend.js"></script>
  <script src="/code/kyc/js/reports/sleepingCustomers.js"></script>
  <script src="/code/kyc/js/reports/mostPopularItems.js"></script>
  <script src="/code/kyc/js/reports/itemPopularityIncrease.js"></script>
  <script src="/code/kyc/js/reports/itemPopularityDecrease.js"></script>
  <script src="/code/kyc/js/reports/highestGrossingDays.js"></script>
  <script src="/code/kyc/js/reports/lowestGrossingDays.js"></script>
  <script src="/code/kyc/js/reports/highestOrderDays.js"></script>
  <script src="/code/kyc/js/reports/lowestOrderDays.js"></script>
  <script src="/code/kyc/js/reports/highestGrossingHours.js"></script>
  <script src="/code/kyc/js/reports/highestOrderHours.js"></script>
  <script src="/code/kyc/js/filters.js"></script>
  <script src="/code/kyc/js/constants/marketingResources.js"></script>
  
  <!-- END WATCH -->
  
  
  <script src="/code/kyc/js/all.min.js"></script>
  <script src="/code/constants/session.php"></script>  
  <script type="text/javascript">  
  //always on session after login
  angular.module('kyc').constant('PUSHER_KEY', '<? echo $pusherKey ?>');
  //moment is not available here yet.
  angular.module('kyc').constant('INITIAL_DATES', {
       start: new Date().getTime() - (1000 * 60 * 60 * 24 * 30),
       end:  new Date()
       // start: new Date('2014-05-01'),
       // end:  new Date('2014-05-02')
  });

  String.prototype.replaceAll = function(de, para){
      var str = this;
      var pos = str.indexOf(de);
      while (pos > -1){
      str = str.replace(de, para);
      pos = str.indexOf(de);
    }
      return (str);
  } 

  function modal_url( url ) {
    return '/code/kyc/js/modals/' + url + '.php';
  }  

  function directive_url( url ) {
    return '/code/kyc/js/directives/' + url;
  }  

  </script>


<? require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/f.php'); ?> 

