<?if(!isset($_SESSION['pay_edit_on'])) $_SESSION['pay_edit_on']=0; ?>
<div class="row">
	<div class="topSpacer"></div>
	<?if(isset($_SESSION['signupWizFlag']) && $_SESSION['signupWizFlag']){ ?>
		<nav class="breadcrumbs row--space1d">
			<a href="<?echo $_SESSION['path']?>/venueSettings.php"><? echo _("Venue Information");?></a>
			<a href="<?echo $_SESSION['path']?>/appSettings1.php"><? echo _("App Styling 1/2");?></a>
			<a href="<?echo $_SESSION['path']?>/menuSettings.php?id=<?echo $_SESSION['menu_id'];?>&r=1"><? echo _("Menu Creation");?></a>
			<?if(isset($_SESSION['venue_eventFlag']) && $_SESSION['venue_eventFlag']){?><a href="<?echo $_SESSION['path']?>/eventSettings.php?r=1"><? echo _("Events");?></a>
			<?}else{?><a href="<?echo $_SESSION['path']?>/nonEventSettings.php?r=1"><? echo _("Opening Hours");?></a><?}?>
			<?if(!$_SESSION['noPaymentFlag']){?>
				<a href="<?echo $_SESSION['path']?>/paymentSettings.php"><? echo _("Payment Method");?></a>
			<?}else{?>
				<a class="current" href="#"><? echo _("Add a Payment");?></a>
			<?}?>
			
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
			<?}else{?>
			<div class="large-6 columns">
				<button class="preodayButton secondary" type="submit" tabindex=2><?echo _("YOU'RE ALREADY CONNECTED");?></button>
			</div>
			<?}?>
		</div>
	</div>
</div>	
<?if(!$_SESSION['pay_edit_on']){?>
<script type="text/javascript">
$(document).ready(function() {
	$('.progressIndicator').css('width','450%');
	$('.progressIndicator').attr('title', "85% done, we've saved the best for last!");
	setTimeout(function() { $('.progressIndicator').trigger("mouseover"); }, 1100);
	setTimeout(function() { $('.progressIndicator').trigger("mouseout"); }, 7500);
});
</script>
<?}?>