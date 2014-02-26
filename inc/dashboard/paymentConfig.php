<?if(!isset($_SESSION['pay_edit_on'])) $_SESSION['pay_edit_on']=0;?>
<div class="row">
	<div class="topSpacer"></div>
	<?if(isset($_SESSION['signupWizFlag']) && $_SESSION['signupWizFlag']){ ?>
		<nav class="breadcrumbs row--space1d">
			<a href="<?echo $_SESSION['path']?>/settings"><? echo _("Venue Information");?></a>
			<a href="<?echo $_SESSION['path']?>/homescreen"><? echo _("App Styling 1/2");?></a>
			<a href="<?echo $_SESSION['path']?>/menuscreen"><? echo _("App Styling 2/2");?></a>
			<a href="<?echo $_SESSION['path']?>/menus/<?echo $_SESSION['menus'][0]['id'];?>?r=1"><? echo _("Menu Creation");?></a>
			<?if(isset($_SESSION['venue_eventFlag']) && $_SESSION['venue_eventFlag']){?><a href="<?echo $_SESSION['path']?>/events?r=1"><? echo _("Events");?></a>
			<?}else{?><a href="<?echo $_SESSION['path']?>/openinghours?r=1"><? echo _("Opening Hours");?></a><?}?>
			<a class="current" href="#"><? echo _("Add a Payment");?></a>

			
			<a class="unavailable" href="#"><? echo _("Done");?></a>
		</nav>
	<?}?>
	<div class="large-12 columns">
		<h1><?echo _("Don't forget to get paid");?></h1>
		<div class="row">
			<div class="large-6 columns">
				<img src="<?echo $_SESSION['path']?>/img/stripe.png"/>					
			</div>
		</div>
		<div class="row row--space3">
			<?if(!$connectedFlag){?>
			<div class="large-6 columns">
				<a href="<?echo $stripeLink;?>"><button class="preodayButton" type="submit" tabindex=2><?echo _("CONNECT TO STRIPE");?></button></a>
			</div>
			<div class="large-12 columns">
				<button id="skipStripe" class="preodayButton secondary" type="button" tabindex=3><?echo _("SKIP THIS FOR NOW");?></button>
			</div>
			<?}else{?>
			<div class="large-6 columns">
				<button class="preodayButton secondary" type="submit" tabindex=2><?echo _("YOU'RE ALREADY CONNECTED");?></button>
			</div>
			<?}?>
		</div>
	</div>
</div>	
<?if((isset($_SESSION['signupWizFlag']) && $_SESSION['signupWizFlag'])){?>
<script type="text/javascript">
$(document).ready(function() {
	$('.progressIndicator').css('width','450%');
	$('.progressIndicator').attr('title', "85% done, we've saved the best for last!");
	setTimeout(function() { $('.progressIndicator').trigger("mouseover"); }, 1100);
	setTimeout(function() { $('.progressIndicator').trigger("mouseout"); }, 7500);
});
</script>
<?}?>