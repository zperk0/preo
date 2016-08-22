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
<?php
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/f.php');
?>

<script type="text/javascript" src="/code/v2/vendor.bundle.c85d9bee67e370eff047.js"></script>
<script type="text/javascript" src="/code/v2/outlets.bundle.157d173413a702e80e2b.js"></script>
<script type="text/javascript" src="/code/v2/app.bundle.bc6858584e96e8c84a91.js"></script>
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
    height: auto;
    min-height: 100vh;
  }
  body{
    max-height: 100vh;
    overflow: auto !important;
  }
  #wrap{
    background:transparent url(../img/bg.jpg) repeat!important;
    min-height: calc(100vh - 200px);
    margin: 0 auto;
    padding:0;
  }

  #webappv2{
    min-height: calc(100vh - 220px - 66px);
  }
  #webappv2 > md-toolbar{
    display: none;
  }

  #webappv2 > md-toolbar + md-sidenav{
    display: none;
  }

  #webappv2  .main-ui-view {
    padding: 0 !important;
    overflow: visible !important;
  }

  #webappv2 .dashboard{
    min-height: 0;
  }

  input[type=date]:focus, input[type=datetime-local]:focus, input[type=datetime]:focus, input[type=email]:focus, input[type=month]:focus, input[type=number]:focus, input[type=password]:focus, input[type=search]:focus, input[type=tel]:focus, input[type=text]:focus, input[type=time]:focus, input[type=url]:focus, input[type=week]:focus, textarea:focus {
    background: transparent;
    box-shadow: none;
    -webkit-box-shadow:none;
    -moz-box-shadow:none;
  }
  #webappv2 input[type=text]{
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
    top:0;
    position: relative;
  }
  #webappv2 form{
    margin-bottom: 0;
  }

  #webappv2 .main-content-right{
    left: auto !important;
    right:16px;
  }

  #webappv2 md-input-container label{
    font-weight: normal;
    font-size: 16px;
  }
</style>
</body>
</html>