<?if(!isset($_SESSION['finish_edit_on'])) $_SESSION['finish_edit_on']=0; ?>
<div class="row">
	<div class="topSpacer"></div>
	<?if(isset($_SESSION['signupWizFlag']) && $_SESSION['signupWizFlag']){ ?>
		<nav class="breadcrumbs row--space1d">
			<a href="<?echo $_SESSION['path']?>/venueSettings.php"><? echo _("Venue Information");?></a>
			<a href="<?echo $_SESSION['path']?>/appSettings1.php"><? echo _("App Styling");?></a>
			<a href="<?echo $_SESSION['path']?>/menuSettings.php?id=<?echo $_SESSION['menu_id'];?>&r=1"><? echo _("Menu Creation");?></a>
			<?if(isset($_SESSION['venue_eventFlag']) && $_SESSION['venue_eventFlag']){?><a href="<?echo $_SESSION['path']?>/eventSettings.php?r=1"><? echo _("Events");?></a>
			<?}else{?><a href="<?echo $_SESSION['path']?>/nonEventSettings.php?r=1"><? echo _("Opening Hours");?></a><?}?>
			<a href="<?echo $_SESSION['path']?>/paymentSettings.php"><? echo _("Payment Method");?></a>
			
			<a class="current" href="#"><? echo _("Done");?></a>
		</nav>
	<?}?>
	<div class="large-12 columns">
		<form id="finishForm" method="POST" action="<?echo $_SESSION['path']?>/code/finish/do_finish.php">
			<div class="row">
				<h2><? echo _("The finish line!");?></h2>
				<h3><?echo _("Your app is built, you did it, all that's left now is to send it into the world!");?></h3>
				<div class="large-12 columns">
					<input type="hidden" name="liveFlag" value="<?echo $live?>"/>
					<?if(!$live){?><button class="preodayButton large" type="submit" id="finishButton" tabindex=1><?echo _("LAUNCH MY APP");?></button><?}
					else{?><button class="preodayButton large secondary" type="submit" id="finishButton" tabindex=1><?echo _("MAKE MY APP OFFLINE");?></button><?}?>
				</div>
				<div class="large-12 columns">
					<?if(!$live){?><a href="<?echo $_SESSION['path']?>/dashboard.php"><button class="preodayButton goBackToDash" type="button" tabindex=2><?echo _("I'LL COME BACK LATER TO PUBLISH MY APP");?></button></a><?}
					else{?><a href="<?echo $_SESSION['path']?>/dashboard.php"><button class="preodayButton goBackToDash" type="button" tabindex=2><?echo _("I'LL COME BACK LATER TO CHANGE MY APP STATUS");?></button></a><?}?>
				</div>
			</div>
		</form>
	</div>
</div>

<script type="text/javascript">
	$(document).ready(function() {
		<?if(isset($_SESSION['paymentMethodApproved']) && $_SESSION['paymentMethodApproved']=='08C56E86512EAA9F108042253982AB4B7DD4F87BE8D66095D3655BB71F82123B'){
			$_SESSION['paymentMethodApproved']=0;?>
			noty({
			  type: 'success',  layout: 'topCenter',
			  text: '<?echo $_SESSION['pmaReply'];?>'
			});
		<?
			$_SESSION['pmaReply']='';
		}?>
	});
</script>
<?if(!$_SESSION['pay_edit_on']){?>
<script type="text/javascript">
$(document).ready(function() {
	$('.progressIndicator').css('width','510%');
	$('.progressIndicator').attr('title', "100% done, phew! you're done!!");
	setTimeout(function() { $('.progressIndicator').trigger("mouseover"); }, 1100);
	setTimeout(function() { $('.progressIndicator').trigger("mouseout"); }, 7500);
});
</script>
<?}?>