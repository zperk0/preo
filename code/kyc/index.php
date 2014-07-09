<?  session_start();
  require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/lang.php'); //need this for multi-language support
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/authentication.php');  
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php'); 
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php'); 
?>
  
  <link rel="stylesheet" href="/code/kyc/js/directives/gridster/gridster.css">  
  <link rel="stylesheet" href="/code/kyc/js/directives/multiselect/multiselect.css"/>  
  <link rel="stylesheet" href="/code/kyc/css/app.css"/>    
  <link href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">

<div ng-app="kyc" ng-controller='MenuCtrl' >  
  
   <div class="container-fluid faixa-orange">
      <div class="row">
        <h4 class="title-white"><span class="icon-know-customers"></span><? echo _("Know your customers")?></h4>
      </div>
    </div> 
  <header>    
    <nav class="row" data-topbar role="navigation" id="navbar-menu">      
          <ul>
            <li class="metrics" ng-class='{active:currentLocation==="dashboard"}' ng-click='setLocation("dashboard")'><span><? echo _("Metrics")?></span></li>
            <li class="stock" ng-class='{active:currentLocation==="stock"}' ng-click='setLocation("stock")'><span><? echo _("Stock")?></span></li>
            <li class="customers" ng-class='{active:currentLocation==="customers"}' ng-click='setLocation("customers")'><span><? echo _("Customers")?></span></li>
            <li class="reports" ng-class='{active:currentLocation==="reports"}' ng-click='setLocation("reports")'><span><? echo _("Reports")?></span></li>
            <li class="live-stream" ng-class='{active:currentLocation==="stream"}' ng-click='setLocation("stream")'><span><? echo _("Live stream")?></span></li>
          </ul>
    </nav>
  </header>
  <div class='clearfix'></div>

  <div>
    <div class="container-fluid" id="container-search">
      <div class="row">

        <div class="large-6 columns">
          <form class="navbar-form navbar-left" role="search" ng-submit="update()">
            <div class="row">
              <div class="large-10 columns">
                <label><? echo _("Outlet:")?>
                  <multi-select    
                      input-model="outlets"    
                      button-label="name"
                      item-label="name"
                      tick-property="selected"
                      default-label="All Outlets"
                  >
                  </multi-select>
                </label>
              </div>
              <div class="large-2 columns">
                <label>&nbsp;
                  <button type="submit" class="button small"><? echo _("Update")?></button>            
                </label>
              </div>
            </div>
          </form>
        </div>
        
        <div class="large-6 columns">
          <form ng-submit="update()" class='navbar-form'>
            <div class="row">
              <div class="small-5 columns">
                <label><? echo _("Date:")?>
                  <input type="text" class="form-control input-search dropdown pdDropdown" datepicker ng-model="search.start_date" /> 
                </label>
              </div>
              <div class="small-5 columns">
                <label>&nbsp;
                  <input type="text" class="form-control input-search dropdown pdDropdown" datepicker compare="search.start_date" ng-model="search.end_date" />
                </label>
              </div>
              <div class="small-2 columns">
                <label>&nbsp;
                  <button type="submit" class="button small" ng-click="fetchDataByDate()"><? echo _("Update")?></button>
                </label>
              </div>
            </div>          
          </form>
        </div> 
      </div>
    </div>
    <div class='row' ng-view></div>
  </div>
  

  
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
  <script src="/code/kyc/js/app.js"></script>
  <script src="/code/kyc/js/services/chart.js"></script>
  <script src="/code/kyc/js/services/grid.js"></script>
  <script src="/code/loader/ajaxInterceptor.js"></script>
  <script src="/code/kyc/js/services/outlets.js"></script>
  <script src="/code/kyc/js/services/pusher.js"></script>
  <script src="/code/kyc/js/services/orders.js"></script>
  <script src="/code/kyc/js/services/currency.js"></script>
  <script src="/code/kyc/js/controllers/dashboard.js"></script>
  <script src="/code/kyc/js/controllers/customers.js"></script>
  <script src="/code/kyc/js/controllers/reports.js"></script>
  <script src="/code/kyc/js/controllers/stock.js"></script>
  <script src="/code/kyc/js/controllers/stream.js"></script>
  <script src="/code/kyc/js/controllers/menu.js"></script>
  <script src="/code/kyc/js/resources/export.js"></script>
  <script src="/code/kyc/js/resources/outlet.js"></script>
  <script src="/code/kyc/js/resources/order.js"></script>  
  <script src="/code/kyc/js/resources/venue.js"></script>  
  <script src="/code/kyc/js/constants/chartType.js"></script>
  <script src="/code/kyc/js/constants/colors.js"></script>
  <script src="/code/kyc/js/directives/chart/chart.js"></script>
  <script src="/code/kyc/js/directives/gridster/gridster.js"></script>
  <script src="/code/kyc/js/directives/highcharts/highcharts.js"></script>
  <script src="/code/kyc/js/directives/datepicker/datepicker.js"></script>
  <script src="/code/kyc/js/directives/multiselect/multiselect.js"></script>
  <script src="/code/kyc/js/charts/allCharts.js"></script>
  <script src="/code/kyc/js/charts/chartHelper.js"></script>
  <script src="/code/kyc/js/charts/payingCustomers.js"></script>
  <script src="/code/kyc/js/charts/ordersPerCustomer.js"></script>
  <script src="/code/kyc/js/charts/averageOrderValue.js"></script>
  <script src="/code/kyc/js/charts/itemsOrdered.js"></script>
  <script src="/code/kyc/js/charts/ordersByOutlet.js"></script>
  <script src="/code/kyc/js/charts/mostPopularItems.js"></script>
  <script src="/code/kyc/js/charts/timeOfOrdersPlaced.js"></script>
  <script src="/code/kyc/js/charts/customersPie.js"></script>
  <script src="/code/kyc/js/charts/customersBar.js"></script>
  <script src="/code/kyc/js/charts/numberOfOrders.js"></script>
  <script src="/code/kyc/js/charts/menuItemPopularity.js"></script>
  <script src="/code/kyc/js/charts/revenue.js"></script>
  <script src="/code/kyc/js/filters.js"></script>

  <script type="text/javascript">
  
  //always on session after login
  angular.module('kyc').constant('ACCOUNT_ID',<? echo $_SESSION['account_id']?>);
  angular.module('kyc').constant('PUSHER_KEY', '<? echo $pusherKey ?>');
  function modal_url( url ) {
    return '/code/kyc/js/modals/' + url + '.htm';
  }  

  function directive_url( url ) {
    return '/code/kyc/js/directives/' + url;
  }  

  </script>


<? require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/f.php'); ?> 

