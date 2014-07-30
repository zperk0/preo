<?  session_start();
  require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/lang.php'); //need this for multi-language support
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/authentication.php');  
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php'); 
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php'); 
?> 

  <div class="row">
    <div class="topSpacer"></div>
  </div>

  <div  ng-app="delivery" ng-init="requests = 0" ng-cloak>
    <div class='loader' ng-show="requests">      
      <img src='/img/spinner.gif'/>
    </div>


    <div ng-view></div>

  </div>


  <script src="/js/angular_all.min.js"></script>


  <!-- BEGIN WATCH
  <script src="/code/settings/delivery/app.js"></script>
  <script src="/code/settings/delivery/resource.js"></script>
  <script src="/code/settings/delivery/controllers.js"></script>
  <script src="/code/settings/delivery/directive.js"></script>
  <!-- END WATCH -->  

  <script src="/code/settings/delivery/js/all.min.js"></script>
  <script> 
    angular.module('delivery').constant('VENUE_ID', <? echo json_encode($_SESSION['venue_id']) ?>)
  </script>


<? require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/f.php'); ?> 


