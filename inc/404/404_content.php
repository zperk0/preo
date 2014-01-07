<?if(!isset($_SESSION['venue_cat'])) $_SESSION['venue_cat'] = 1;?>
<div class="row">
	<div class="topSpacer"></div>
	<div class="large-12 columns" id="finishForm">
		<h1><? echo _("Whoops!");?></h1>
		<h3><? echo _("We can't find the page you're looking for.");?> <?echo _("Please check out the");?> <a target="_blank" href="<?echo $_SESSION['path']?>/docs/GettingStartedGuide_<?echo $_SESSION['venue_cat'];?>.pdf"><?echo _("help section");?></a>, <br/><? echo _("or return to the");?> <a href="/dashboard"><?echo _("Dashboard");?></a></h3>
	</div>
</div>


