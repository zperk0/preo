<?  session_start();
  require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/lang.php'); //need this for multi-language support
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/authentication.php');  
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php'); 
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php'); 
?> 

  <style>

  .accountSettings{
  	padding-top:50px;
  }
  .accountSettings .content{
  		width:70%;
  		margin:0;
  		float:left;
  }
  .accountSettings .menu{
  		width:25%;
  		margin-right:0;
  		margin-left:5%;
  		float:left;
  }

  .accountSettings ul,li {
  	list-style: none
  }

  .accountSettings li{
  	font-size:1em;
  	padding:10px 0;
  	border-bottom:1px solid #333;
  }
  .accountSettings li:hover{
  	cursor:pointer;
  	color:#2e70b7;
  }

  .accountSettings li.selected{
  	color:#2e70b7;
  }
  

  </style>
  <div ng-app="accountSettings"  class='accountSettings row'>
  
  	<div class='content'>
  		<div ng-view> </div>
  	</div>
  	<div class='menu' ng-controller="MenuCtrl">
		<h3>Account Settings</h3>

		<ul>
			<li ng-class="{'selected':currentView == Views.profile}" > <a href="#/profile"><?echo _("Profile") ?></a></li>
			<li ng-class="{'selected':currentView == Views.profile}">  <a href="#/subscription"><?echo _("Subscriptions") ?></a></li>
			<li ng-class="{'selected':currentView == Views.profile}">  <a href="#/paymentMethod"><?echo _("Payment Methods") ?></a></li>
			<li ng-class="{'selected':currentView == Views.profile}">  <a href="#/billingHistory"><?echo _("Billing History") ?></a></li>

		</ul>
  	</div>


  </div>

  <script src="/js/angular_all.min.js"></script>  
  <script type="text/javascript" src="/code/accountSettings/app.js"></script>  
  <script type="text/javascript" src="/code/accountSettings/resource.js"></script>  
  <script type="text/javascript" src="/code/accountSettings/controllers/profileCtrl.js"></script>
  <script type="text/javascript" src="/code/accountSettings/controllers/menuCtrl.js"></script>
<? require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/f.php'); ?> 


