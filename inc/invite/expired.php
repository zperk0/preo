<?if(!isset($_SESSION['venue_cat'])) $_SESSION['venue_cat'] = 1;?>
<div class="row">
	<div class="topSpacer"></div>
	<div class="large-12 columns" id="finishForm">
		<h1><? echo _("Whoops!");?></h1>
		<h3><? echo isset($content) ? $content : _("This invitation expired. Please request a new one.");?></h3>
	</div>
</div>


