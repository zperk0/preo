<?php session_start();
require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/lang.php'); //need this for multi-language support
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/authentication.php');
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
  // require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php');
?>

<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>webapp</title>
  <base href="/">
  <?

$cdnRoot = "https://cdn-demo.preoday.com/";
$ordersapp = "https://orders-demo.preoday.com/";
$weborders = "https://menus-v2-demo.preoday.com/";
$analytics = '';

if(isset($_SERVER["PREO_CDN"]))
{
    $cdnRoot = $_SERVER["PREO_CDN"];
}

if(isset($_SERVER["PREO_WEBORDERS"]))
{
    $weborders = $_SERVER["PREO_WEBORDERS"];
}

if(isset($_SERVER["PREO_ORDERSAPP"]))
{
    $ordersapp = $_SERVER["PREO_ORDERSAPP"];
}

if (isset($_SERVER["PREO_PWA_ANALYTICS_UA"])){
    $analytics .=" <script>";
    $analytics .="   window.hasOwnProperty = window.hasOwnProperty || Object.prototype.hasOwnProperty;";
    $analytics .="   !function(A,n,g,u,l,a,r){A.GoogleAnalyticsObject=l,A[l]=A[l]||function(){";
    $analytics .="     (A[l].q=A[l].q||[]).push(arguments)},A[l].l=+new Date,a=n.createElement(g),";
    $analytics .="     r=n.getElementsByTagName(g)[0],a.src=u,r.parentNode.insertBefore(a,r)";
    $analytics .="   }(window,document,'script','//www.google-analytics.com/analytics.js','ga');";
    $analytics .="   ga('create', '".$_SERVER['PREO_PWO_ANALYTICS_UA']."');";
    $analytics .="   ga('send', 'pageview');";
    $analytics .=" </script>";
}

$overrides = "<script>";
$overrides .= "window._PREO_DATA={};";
$overrides .= "window._PREO_DATA._CDNROOT='$cdnRoot';";
$overrides .= "window._PREO_DATA._ORDERSAPP='$ordersapp';";
$overrides .= "window._PREO_DATA._WEBORDERS='$weborders';";
$overrides .= "</script>";

echo $overrides;

?>

<script src="<? echo $_SESSION['path']?>/js/modernizr_and_jquery1.10.2_min.js"></script>
<?php require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php'); ?>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link type="text/css" rel="stylesheet" href="<? echo $_SESSION['path']?>/css/normalize.css" />
<link type="text/css" rel="stylesheet" href="<? echo $_SESSION['path']?>/css/foundation.css"/>
<link href="<? echo $_SESSION['path']?>/css/header-footer.css" rel="stylesheet"><link href="/styling.css" rel="stylesheet"></head>
<link href="/code/v2/vendor.css" rel="stylesheet"></head>
<link href="/code/v2/styling.css" rel="stylesheet"></head>
<body>
  <div id="wrap">
    <div id="webappv2" class='webapp'>
      <toolbar></toolbar>
      <navbar></navbar>
      <div class='main-ui-view' ui-view></div>
      <spinner></spinner>
    </div>
  </div>

<script>
  (function (){
    angular.module('webapp.bookings',[]);
    angular.module('webapp.events',[]);
    angular.module('webapp.venueSettings',[]);
    angular.module('webapp.vouchers',[]);
    angular.module('webapp.menus',[]);
    angular.module('webapp.notifications',[]);
    angular.module('webapp.payments',[]);
    angular.module('webapp.promotions',[]);
    angular.module('webapp.outlets',[]);
    angular.module('webapp.venueSettings',[]);
    angular.module('webapp.vouchers',[]);
  })();
</script>
<style>
   html{
    overflow: hidden;
    /*height: auto;
    min-height: 100vh;*/
  }
  body{
    /*max-height: 100vh;*/
    /*overflow: auto !important;*/
    overflow: hidden !important;
  }
  #wrap{
    background: transparent url(../img/bg.jpg) repeat!important;
    height: calc(100vh - 117px);
    margin: 0 auto;
    top: 117px;
    position: relative;
    overflow: auto;
    padding: 0;
    min-height: 0;
  }

  #webappv2{
    /*min-height: calc(100vh - 66px);*/
  }
  #webappv2 .md-sidenav-left{
    display: none;
  }

  #webappv2  md-toolbar{
    display: none;
  }

  #webappv2  .main-ui-view {
    padding: 0 !important;
    overflow: auto !important;
  }

  #webappv2 .floating-right-buttons{
    top:120px;
  }

  input[type=date]:focus, input[type=datetime-local]:focus, input[type=datetime]:focus, input[type=email]:focus, input[type=month]:focus, input[type=number]:focus, input[type=password]:focus, input[type=search]:focus, input[type=tel]:focus, input[type=text]:focus, input[type=time]:focus, input[type=url]:focus, input[type=week]:focus, textarea:focus {
    background: transparent;
    box-shadow: none;
    -webkit-box-shadow:none;
    -moz-box-shadow:none;
  }
  #webappv2 input{
    outline: none ;
    box-shadow: none;
    margin:0;
  }
  #webappv2 .md-sidenav-right{
    top:0;
  }
  #webappv2 .layout-left-right{
    padding-top:0;
  }
  #webappv2 .outlet-location-view .outlet-location-toolbar{
    top:67px;
    /*position: relative;*/
  }
  #webappv2 form{
    margin-bottom: 0;
  }

  #webappv2 .main-content-right{
    position: fixed !important;
    top:120px !important;
    left: auto !important;
    right:16px;
  }

   #webappv2 md-input-container label{
    font-weight: normal;
    font-size: 16px;
  }
    #webappv2 .md-sidenav-right.contextual-drawer{
    z-index:124;
  }
  #webappv2 md-backdrop{
    height: 979px;
    top: 0;
    position: fixed ! important;
    z-index: 125 !important;
  }

  #webappv2 .md-dialog-container{
    top: -50px !important;
    z-index: 126 !important;
  }
  .contain-to-grid{
    position: fixed;
    z-index: 123;
  }

  body md-tooltip {
   z-index:200;
  }
  footer{
    display: none;
  }
</style>
<? require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/f.php'); ?>
<script type="text/javascript" src="/angular.bundle.2a7ca4570ec1fb1d4c61.js"></script><script type="text/javascript" src="/styling.bundle.d0c98b0d7e98478c984d.js"></script><script type="text/javascript" src="/vendor.bundle.2b113e169634b01e2a2e.js"></script><script type="text/javascript" src="/app.bundle.f25710a0696b578fcb27.js"></script></body>
</html>