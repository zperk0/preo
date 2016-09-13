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
  <!-- @@OVERRIDES -->
  <!-- @@ANALYTICS -->
<script src="<? echo $_SESSION['path']?>/js/modernizr_and_jquery1.10.2_min.js"></script>
<?php require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php'); ?>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link type="text/css" rel="stylesheet" href="<? echo $_SESSION['path']?>/css/normalize.css" />
<link type="text/css" rel="stylesheet" href="<? echo $_SESSION['path']?>/css/foundation.css"/>
<link href="<? echo $_SESSION['path']?>/css/header-footer.css" rel="stylesheet"></head>
<link href="/code/v2/vendor.css" rel="stylesheet"></head>
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
    angular.module('webapp.styling',[]);
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
  .contain-to-grid{
    position: fixed;
  }
</style>
<script type="text/javascript" src="/angular.bundle.2a7ca4570ec1fb1d4c61.js"></script><script type="text/javascript" src="/outlets.bundle.00da37b9d805450dd832.js"></script><script type="text/javascript" src="/vendor.bundle.3bdbadca73a643258a45.js"></script><script type="text/javascript" src="/app.bundle.541cfa3665d399df102e.js"></script></body>
</html>