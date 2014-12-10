<?  session_start();
  require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/lang.php'); //need this for multi-language support
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/authentication.php');  
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php'); 
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php'); 
?> 

  <div ng-app="accountSettings"  class='accountSettings row'>
    <div ng-controller="MenuCtrl">      
    	<div class='content'>
    		<div ng-view> </div>
        <div class='bottomSpacer'></div>
    	</div>
    	<div class='menu'>
  		<h3>My Account</h3>

  		<ul>  			
  			<li ng-class="{'selected':currentView == Views.subscription}" ng-click="setSelected(Views.subscription)">  <a href="#/subscription"><?echo _("Subscriptions") ?></a></li>
  			<li ng-class="{'selected':currentView == Views.paymentMethod}" ng-click="setSelected(Views.paymentMethod)">  <a href="#/paymentMethod"><?echo _("Payment Methods") ?></a></li>
  			<li ng-class="{'selected':currentView == Views.billingHistory}" ng-click="setSelected(Views.billingHistory)">  <a href="#/billingHistory"><?echo _("Billing History") ?></a></li>
        <li ng-class="{'selected':currentView == Views.profile}" ng-click="setSelected(Views.profile)"> <a href="#/profile"><?echo _("Profile") ?></a></li>

  		</ul>
    	</div>


    </div>

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

  <script type="text/javascript" src="https://js.stripe.com/v2/"></script> 
  <!-- BEGIN WATCH 
  <script src="/code/accountSettings/app.js"></script>  
  <script src="/code/accountSettings/directives/equals.js"></script>
  <script src="/code/accountSettings/resources/user.js"></script>
  <script src="/code/accountSettings/resources/account.js"></script>
  <script src="/code/accountSettings/resources/accountCard.js"></script>
  <script src="/code/accountSettings/resources/accountFeature.js"></script>  
  <script src="/code/accountSettings/resources/accountInvoice.js"></script>  
  <script src="/code/accountSettings/controllers/billingCtrl.js"></script>
  <script src="/code/accountSettings/controllers/profileCtrl.js"></script>
  <script src="/code/accountSettings/controllers/passwordCtrl.js"></script>
  <script src="/code/accountSettings/controllers/paymentCtrl.js"></script>
  <script src="/code/accountSettings/controllers/subscriptionCtrl.js"></script>
  <script src="/code/accountSettings/controllers/menuCtrl.js"></script>
  <script src="/code/loader/ajaxInterceptor.js"></script>
  <script src="/code/models/AccountFeature.js"></script>
  <script src="/code/notification/notification.js"></script>  
  <!-- END WATCH -->

  <script src="/code/accountSettings/js/all.min.js"></script>
  <script src="/code/constants/session.php"></script>  

<? require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/f.php'); ?> 


