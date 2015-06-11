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

  <div ng-app="events">
    
      <div ng-view> </div>
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
  <script src="/bower_components/javascript-core/preoday/preoday.min.js"></script>  

  
  <!-- BEGIN WATCH  -->
  <script src="/code/events/js/app.js"></script>  
  <script src="/code/events/js/controller.js"></script>  

  <script src="/code/events/js/directives/slot.js"></script>  
  <script src="/code/events/js/directives/event.js"></script>  

  <script src="/code/events/js/services/event.js"></script>  

  <script src="/code/notification/notification.js"></script>  
  <!-- END WATCH -->

  <!-- script src="/code/events/js/all.min.js"></script -->
  <script src="/code/constants/session.php"></script>    

<? require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/f.php'); ?> 


