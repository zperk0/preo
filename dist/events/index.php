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
<link href="<? echo $_SESSION['path']?>/css/header-footer.css" rel="stylesheet" />
<link type="text/css" rel="stylesheet" href="<? echo $_SESSION['path']?>/v2/v1.css"/>
</head>
<body>
  <div id="wrap" class="<?echo $_GET['class']?>">
    <div id="webappv2" class='webapp'>
      <toolbar></toolbar>
      <navbar></navbar>
      <div class='main-ui-view' ui-view></div>
      <full-spinner></full-spinner>
    </div>
  </div>
<? require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/f.php'); ?>
<script type="text/javascript" src="/v2/vendor.bundle.6e07db19933d648e7d7b.js"></script><script type="text/javascript" src="/v2/events.bundle.cfe5eeebde7d781b12a2.js"></script><script type="text/javascript" src="/v2/outlets.bundle.79efb47cf36b68838e59.js"></script><script type="text/javascript" src="/v2/app.bundle.0982a37e299990244478.js"></script></body>
</html>