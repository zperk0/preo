<?php  session_start();
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/global_vars.php');
  require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/lang.php'); //need this for multi-language support
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/authentication.php');
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php');
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php');
?>

<!-- <link rel="stylesheet" type="text/css" href="/code/events/css/foundation.css"> -->
<!-- <link rel="stylesheet" href="http://cdn.jsdelivr.net/zurb/foundation-apps-1.1.0.css"> -->
<link rel="stylesheet" type="text/css" href="/code/events/css/style.css">

  <div ng-app="events">

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

  <link rel="stylesheet" href="/code/kyc/js/directives/multiselect/multiselect.css"/>

  <script src="/js/angular_all.min.js"></script>
  <script src="/code/kyc/js/directives/multiselect/multiselect.js"></script>



  <!-- BEGIN WATCH
  <script src="/bower_components/javascript-core/preoday/preoday.min.js"></script>
  <script src="/code/events/js/utils/fallbacks.js"></script>
  <script src="/code/loader/ajaxInterceptor.js"></script>
  <script src="/code/events/js/app.js"></script>
  <script src="/code/events/js/controllers/controller.js"></script>
  <script src="/code/events/js/controllers/modalController.js"></script>
  <script src="/code/events/js/directives/slot/slot.js"></script>
  <script src="/code/events/js/directives/event/event.js"></script>
  <script src="/code/events/js/directives/preo-calendar/preo-calendar.js"></script>
  <script src="/code/events/js/services/collectionslots.js"></script>
  <script src="/code/events/js/services/events.js"></script>
  <script src="/code/events/js/services/date.js"></script>

  <script src="/code/notification/notification.js"></script>
  <!-- END WATCH -->

  <script src="/code/events/all.min.js"></script>

  <script src="/code/constants/session.php"></script>

<? require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/f.php'); ?>


