<?  session_start();
  require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/lang.php'); //need this for multi-language support
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/authentication.php');  
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php'); 
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php'); 
?>

  <link rel="stylesheet" href="/bower_components/gridster/dist/jquery.gridster.min.css">
  <link rel="stylesheet" href="/code/kyc/js/directives/gridster/gridster.css">  
  <link rel="stylesheet" href="/code/kyc/css/app.css"/>  
  <link rel="stylesheet" href="/code/kyc/js/directives/multiselect/multiselect.css"/>  
  <link href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">

<div ng-app="kyc" ng-controller='MenuCtrl'>  
  
  <header>
    <div class="container-fluid faixa-orange">
      <div class="container">
        <h4 class="title-white"><span class="icon-know-customers"></span> Know your customers</h4>
      </div>
    </div>

    <nav class="top-bar" data-topbar role="navigation" id="navbar-menu">
      <section class="top-bar-section">
          <!-- Collect the nav links, forms, and other content for toggling -->
          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              <li class="metrics">
                <a href="#/dashboard" active-link="active"><i class="fa icon-large"></i>Metrics</a>
              </li>
              <li class="stock"><a href="#/stock" active-link="active"><i class="fa icon-large"></i>Stock</a></li>
              <li class="customers"><a href="#/customers" active-link="active"><i class="fa icon-large"></i>Customers</a></li>
              <li class="reports"><a href="#/reports" active-link="active"><i class="fa icon-large"></i>Reports</a></li>
              <li class="live-stream"><a href="#/stream" active-link="active"><i class="fa icon-large"></i>Live stream</a></li>
            </ul>
          </div><!-- /.navbar-collapse -->
      </section>
    </nav>
  </header>


  <div>
    <div class="container-fluid" id="container-search">
      <div class="container">

        <div class="large-6 columns">
          <form class="navbar-form navbar-left" role="search" ng-submit="update()">
            <div class="row">
              <div class="large-10 columns">
                <label>Outlet
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
                  <button type="submit" class="button small">Update</button>            
                </label>
              </div>
            </div>
          </form>
        </div>
        
        <div class="large-6 columns">
          <form ng-submit="update()">
            <div class="row">
              <div class="small-5 columns">
                <label>Data
                  <input type="text" class="form-control input-search dropdown pdDropdown"  datepicker ng-model="minData" />
                </label>
              </div>
              <div class="small-5 columns">
                <label>&nbsp;
                  <input type="text" class="form-control input-search dropdown pdDropdown"  datepicker ng-model="maxData" />
                </label>
              </div>
              <div class="small-2 columns">
                <label>&nbsp;
                  <button type="submit" class="button small">Update</button>
                </label>
              </div>
            </div>          
          </form>
        </div> 
      </div>
    </div>
    <div ng-view></div>
  </div>

  <div class="loading" ng-show="requests">
    <div class="background-loading"></div>
    <div class="loading-content">
      <img src="/img/spinner.gif" />
    </div>
  </div>  

</div>
  
  <script src="//d3dy5gmtp8yhk7.cloudfront.net/2.1/pusher.min.js" type="text/javascript"></script>
  <script src="/js/angular_all.min.js"></script>  
  <script src="/bower_components/angular-foundation/mm-foundation-tpls.min.js"></script>
  <script src="/bower_components/gridster/dist/jquery.gridster.min.js"></script>
  <script src="/bower_components/highcharts/highcharts.js"></script>
  <script src="/code/kyc/js/app.js"></script>
  <script src="/code/kyc/js/services/chart.js"></script>
  <script src="/code/kyc/js/services/grid.js"></script>
  <script src="/code/kyc/js/services/ajaxinterceptor.js"></script>
  <script src="/code/kyc/js/services/outlets.js"></script>
  <script src="/code/kyc/js/services/pusher.js"></script>
  <script src="/code/kyc/js/services/stream.js"></script>
  <script src="/code/kyc/js/services/orders.js"></script>
  <script src="/code/kyc/js/controllers/dashboard.js"></script>
  <script src="/code/kyc/js/controllers/customers.js"></script>
  <script src="/code/kyc/js/controllers/reports.js"></script>
  <script src="/code/kyc/js/controllers/stock.js"></script>
  <script src="/code/kyc/js/controllers/stream.js"></script>
  <script src="/code/kyc/js/controllers/menu.js"></script>
  <script src="/code/kyc/js/resources/outlet.js"></script>
  <script src="/code/kyc/js/resources/order.js"></script>  
  <script src="/code/kyc/js/constants/chartType.js"></script>
  <script src="/code/kyc/js/constants/colors.js"></script>
  <script src="/code/kyc/js/directives/directives.js"></script>
  <script src="/code/kyc/js/directives/chart/chart.js"></script>
  <script src="/code/kyc/js/directives/gridster/gridster.js"></script>
  <script src="/code/kyc/js/directives/highcharts/highcharts.js"></script>
  <script src="/code/kyc/js/directives/datepicker/datepicker.js"></script>
  <script src="/code/kyc/js/directives/multiselect/multiselect.js"></script>
  <script src="/code/kyc/js/charts/allCharts.js"></script>
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
  angular.module('kyc').constant('PUSHER_KEY', '63aabf4f8531a582c3e6');
  function modal_url( url ) {
    return '/code/kyc/js/modals/' + url + '.htm';
  }  

  function directive_url( url ) {
    return '/code/kyc/js/directives/' + url;
  }  

  </script>


<? require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/f.php'); ?> 

