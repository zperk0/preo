<?php session_start(); ?>
angular.module('constants',[])
angular.module('constants').constant('ACCOUNT_ID', <? echo $_SESSION['account_id']?>);
angular.module('constants').constant('VENUE_ID',<? echo $_SESSION['venue_id']?>);
angular.module('constants').constant('USER_ID',<? echo $_SESSION['user_id']?>);
angular.module('constants').constant('LANG',"<? echo $_SESSION['lang']?>");
angular.module('constants').constant('VENUE_PERMALINK',"<? echo $_SESSION['venue_permalink']?>");
