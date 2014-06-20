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

<div ng-app="kyc" ng-controller='MenuCtrl'>  
  
  <header>
    <div class="container-fluid faixa-orange">
      <div class="container">
        <h4 class="title-white"><span class="glyphicon glyphicon-star"></span> Know your customers</h4>
      </div>
    </div>

    <nav class="navbar navbar-default" role="navigation" id="navbar-menu">
      <div class="container">
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li>
              <a href="#/dashboard" active-link="active"><i class="fa fa-signal icon-large"></i>Metrics</a>
            </li>
            <li><a href="#/stock" active-link="active"><i class="fa fa-arrows-alt icon-large"></i>Stock</a></li>
            <li><a href="#/customers" active-link="active"><i class="fa fa-user icon-large"></i>Customers</a></li>
            <li><a href="#/reports" active-link="active"><i class="fa fa-search icon-large"></i>Reports</a></li>
            <li><a href="#/stream" active-link="active"><i class="fa fa-rss icon-large"></i>Live stream</a></li>
          </ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>
    <div class="container-fluid" id="container-search">
    <div class="container">
      <form class="navbar-form navbar-left" role="search" ng-submit="fetchData()">
        <div class="form-group">
          <select name="outlets" id="outlets" multiple>
            <option ng-repeat="outlet in outlets" value="outlet.id">{{outlet.name}}</option>
          </select>
        </div>
        <div class="form-group">
          <input type="text" class="form-control" placeholder="01/01/2014">
        </div>
        <div class="form-group">
          <input type="text" class="form-control" placeholder="01/01/2014">
        </div>
        <button type="submit" class="btn btn-default">Update</button>
      </form>   
    </div>
  </div>
  </header>


  <div ng-view></div>

</div>
  
  <script src="/js/angular_all.min.js"></script>  
  <script src="/bower_components/gridster/dist/jquery.gridster.min.js"></script>
  <script src="/bower_components/highcharts/highcharts.js"></script>
  <script src="/code/kyc/js/app.js"></script>
  <script src="/code/kyc/js/services/outlets.js"></script>
  <script src="/code/kyc/js/controllers/dashboard.js"></script>
  <script src="/code/kyc/js/controllers/customers.js"></script>
  <script src="/code/kyc/js/controllers/reports.js"></script>
  <script src="/code/kyc/js/controllers/stock.js"></script>
  <script src="/code/kyc/js/controllers/stream.js"></script>
  <script src="/code/kyc/js/controllers/menu.js"></script>
  <script src="/code/kyc/js/resources/outlet.js"></script>
  <script src="/code/kyc/js/resources/orders.js"></script>  
  <script src="/code/kyc/js/constants/chartType.js"></script>
  <script src="/code/kyc/js/constants/colors.js"></script>
  <script src="/code/kyc/js/directives/directives.js"></script>
  <script src="/code/kyc/js/directives/chart/chart.js"></script>
  <script src="/code/kyc/js/directives/gridster/gridster.js"></script>
  <script src="/code/kyc/js/directives/highcharts/highcharts.js"></script>
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
  <script src="/code/kyc/js/charts/revenue.js"></script>

  <script type="text/javascript">
  
  //always on session after login
  angular.module('kyc').constant('ACCOUNT_ID',<? echo $_SESSION['account_id']?>);

  </script>


<? require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/f.php'); ?> 

