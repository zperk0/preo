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
  <link href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">

<div ng-app="kyc">  
  
  <header >
    <div class="container-fluid faixa-orange">
      <div class="container">
        <h4 class="title-white"><span class="glyphicon glyphicon-star"></span> Know your customers</h4>
      </div>
    </div>

    <nav class="top-bar" data-topbar role="navigation" id="navbar-menu">
      <section class="top-bar-section">
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
      </section>
    </nav>
  </header>


  <div>
    <div class="container-fluid" id="container-search">
      <div class="container overflow">

        <div class="large-6 columns">
          <form>
            <div class="row">
              <div class="large-10 columns">
                <label>Outlet
                  <select name="" id="">
                    <option value="">Option 1</option>
                    <option value="">Option 2</option>
                  </select>
                </label>
              </div>
              <div class="large-2 columns">
                <label>&nbsp;
                  <button type="submit" class="button tiny">Update</button>            
                </label>
              </div>
            </div>
          </form>
        </div>
        <div class="large-6 columns">
          <form>
            <div class="row">
              <div class="small-5 columns">
                <label>Data
                  <input type="text" class="form-control" placeholder="01/02/2014">
                </label>
              </div>
              <div class="small-5 columns">
                <label>&nbsp;
                  <input type="text" class="form-control" placeholder="01/02/2014">
                </label>
              </div>
              <div class="small-2 columns">
                <label>&nbsp;
                  <button type="submit" class="button tiny">Update</button>
                </label>
              </div>
            </div>          
          </form>
        </div> 
      </div>
    </div>
    <div ng-view></div>
  </div>

</div>
  
  <script src="/js/angular_all.min.js"></script>  
  <script src="/bower_components/angular-foundation/mm-foundation-tpls.min.js"></script>
  <script src="/bower_components/gridster/dist/jquery.gridster.min.js"></script>
  <script src="/bower_components/highcharts/highcharts.js"></script>
  <script src="/code/kyc/js/app.js"></script>
  <script src="/code/kyc/js/services.js"></script>
  <script src="/code/kyc/js/controllers/dashboard.js"></script>
  <script src="/code/kyc/js/controllers/customers.js"></script>
  <script src="/code/kyc/js/controllers/reports.js"></script>
  <script src="/code/kyc/js/controllers/stock.js"></script>
  <script src="/code/kyc/js/controllers/stream.js"></script>
  <script src="/code/kyc/js/filters.js"></script>
  <script src="/code/kyc/js/directives/directives.js"></script>
  <script src="/code/kyc/js/directives/chart/chart.js"></script>
  <script src="/code/kyc/js/directives/gridster/gridster.js"></script>
  <script src="/code/kyc/js/directives/highcharts/highcharts.js"></script>

  <script type="text/javascript">

  function template_url( url ) {
    return '/code/kyc/js/directives/' + url;
  }

  function modal_url( url ) {
    return '/code/kyc/js/modals/' + url + '.htm';
  }  

  </script>


<? require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/f.php'); ?> 

