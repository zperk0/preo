<?php session_start(); ?>
(function(){
	var app = null;

	try { app = angular.module('constants'); }
	catch(e) { app = angular.module('constants', []); }

	app.constant('ACCOUNT_ID', <? echo $_SESSION['account_id']?>);
	app.constant('VENUE_ID',<? echo $_SESSION['venue_id']?>);
	app.constant('USER_ID',<? echo $_SESSION['user_id']?>);
	app.constant('LANG',"<? echo $_SESSION['lang']?>");
	app.constant('VENUE_PERMALINK',"<? echo $_SESSION['venue_permalink']?>");
})();