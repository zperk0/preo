<?php session_start();
	  require('getPath.php'); //the only relative link we will have
	  require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/lang.php'); //need this for multi-language support
	  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php');
	  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php'); ?>


<div class="row">
	<div class="topSpacer"></div>
	<div class="large-12 columns" id="finishForm">
		<h1><? echo _("Whoops!");?></h1>
		<h3><? echo isset($content) ? $content : _("You do not have permission to view the dashboard.<br/> If you think this is a mistake please contact your account's administrator.");?> </h3>
	</div>
</div>



<?php require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/f.php');