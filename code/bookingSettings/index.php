<?php  session_start();
  require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/lang.php'); //need this for multi-language support
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/authentication.php');
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php');
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php');
?>

<link rel="stylesheet" type="text/css" href="/code/bookingSettings/css/style.css">

  <div ng-app="bookingSettings">

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
  </div>

  <script src="/js/angular_all.min.js"></script>

  <!-- BEGIN WATCH
  <script src="/bower_components/angular-gettext/dist/angular-gettext.min.js"></script>
  <script src="/locale_angular/translations.js"></script>
  <script src="/bower_components/javascript-core/preoday/preoday.min.js"></script>
  <script src="/code/loader/ajaxInterceptor.js"></script>
  <script src="/code/bookingSettings/js/app.js"></script>
  <script src="/code/bookingSettings/js/controllers/bookingSettings.js"></script>
  <script src="/code/bookingSettings/js/services/bookingSettingsService.js"></script>
  <!-- END WATCH -->

   <script src="/code/bookingSettings/all.min.js"></script>

  <script src="/code/constants/session.php"></script>

<? require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/f.php'); ?>

