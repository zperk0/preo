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
      <div class='loader' ng-show="!finishedLoading">      
          <img src='/img/spinner.gif'/>
      </div>  
    	<div class='content' ng-show="finishedLoading">
    		<div ng-view> </div>
        <div class='bottomSpacer'></div>
    	</div>
    	<div class='menu'>
  		<h3>Account Settings</h3>

  		<ul>
  			<li ng-class="{'selected':currentView == Views.profile}" ng-click="setSelected(Views.profile)"> <a href="#/profile"><?echo _("Profile") ?></a></li>
  			<li ng-class="{'selected':currentView == Views.subscription}" ng-click="setSelected(Views.subscription)">  <a href="#/subscription"><?echo _("Subscriptions") ?></a></li>
  			<li ng-class="{'selected':currentView == Views.paymentMethod}" ng-click="setSelected(Views.paymentMethod)">  <a href="#/paymentMethod"><?echo _("Payment Methods") ?></a></li>
  			<li ng-class="{'selected':currentView == Views.billingHistory}" ng-click="setSelected(Views.billingHistory)">  <a href="#/billingHistory"><?echo _("Billing History") ?></a></li>

  		</ul>
    	</div>


    </div>
  </div>
  

  <script src="/js/angular_all.min.js"></script>  
  <script type="text/javascript" src="/code/accountSettings/app.js"></script>  
  <script>
  //always on session after login
  angular.module('accountSettings').constant('ACCOUNT_ID',<? echo $_SESSION['account_id']?>);
  angular.module('accountSettings').constant('USER_ID',<? echo $_SESSION['user_id']?>);


  
  </script>
  <script type="text/javascript" src="https://js.stripe.com/v2/"></script> 
  <script type="text/javascript" src="/code/accountSettings/directives/equals.js"></script>
  <script type="text/javascript" src="/code/accountSettings/resources/user.js"></script>
  <script type="text/javascript" src="/code/accountSettings/resources/account.js"></script>
  <script type="text/javascript" src="/code/accountSettings/resources/accountCard.js"></script>
  <script type="text/javascript" src="/code/accountSettings/resources/accountFeature.js"></script>  
  <script type="text/javascript" src="/code/accountSettings/resources/invoice.js"></script>  
  <script type="text/javascript" src="/code/accountSettings/resources/accountInvoice.js"></script>  
  <script type="text/javascript" src="/code/accountSettings/resources/pendingInvoice.js"></script>  
  <script type="text/javascript" src="/code/accountSettings/resources/stripeCharge.js"></script>    
  <script type="text/javascript" src="/code/accountSettings/controllers/billingCtrl.js"></script>
  <script type="text/javascript" src="/code/accountSettings/controllers/profileCtrl.js"></script>
  <script type="text/javascript" src="/code/accountSettings/controllers/passwordCtrl.js"></script>
  <script type="text/javascript" src="/code/accountSettings/controllers/paymentCtrl.js"></script>
  <script type="text/javascript" src="/code/accountSettings/controllers/subscriptionCtrl.js"></script>
  <script type="text/javascript" src="/code/accountSettings/controllers/menuCtrl.js"></script>
<? require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/f.php'); ?> 


