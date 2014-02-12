<?if(!isset($_SESSION['finish_edit_on'])) $_SESSION['finish_edit_on']=0; ?>
<?if(!isset($_SESSION['pmaReply'])) $_SESSION['pmaReply']=0; ?>
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
			<a href="<?echo $_SESSION['path']?>/payment"><? echo _("Payment Method");?></a>
			
			<a class="current" href="#"><? echo _("Done");?></a>
		</nav>
	<?}?>
	<?if(!$_SESSION['venue_demoFlag']){?>
	<div class="large-12 columns">
		<form id="finishForm" method="POST" action="<?echo $_SESSION['path']?>/code/finish/do_finish.php">
			<div class="row">
				<h2 class="alignHeader"><? echo _("The finish line!");?></h2>
				<?if(!preg_match('/500/',$_SESSION['pmaReply'])){?><h3 class="alignHeader"><?echo _("Your app is built, you did it, all that's left now is to send it into the world!");?></h3>
				<?}else{?><h3 class="alignHeader"><?echo _("Your app is built and after you setup a payment method, you can send it into the world!");?></h3><?}?>
				<div class="large-12 columns">
					<input type="hidden" name="liveFlag" value="<?echo $live?>"/>
					<?if(!$live && !preg_match('/500/',$_SESSION['pmaReply'])){?><button class="preodayButton large" type="submit" id="finishButton" tabindex=1><?echo _("LAUNCH MY APP");?></button><?}
					else if($live){?><button class="preodayButton large secondary" type="submit" id="finishButton" tabindex=1><?echo _("TAKE MY APP OFFLINE");?></button><?}?>
				</div>
				<div class="large-12 columns">
					<?if(!$live){?><a href="<?echo $_SESSION['path']?>/dashboard"><button class="preodayButton goBackToDash" type="button" tabindex=2><?echo _("I'LL COME BACK LATER TO PUBLISH MY APP");?></button></a><?}
					else{?><a href="<?echo $_SESSION['path']?>/dashboard"><button class="preodayButton goBackToDash" type="button" tabindex=2><?echo _("I'LL COME BACK LATER TO CHANGE MY APP STATUS");?></button></a><?}?>
				</div>
			</div>
		</form>
	</div>
	<?}else{?>
	<div class="large-12 columns">
		<form id="finishForm" method="POST" action="">
			<div class="row">
				<h2><? echo _("The finish line!");?></h2>
				<h3><?echo _("Your app is built but you are currently in DEMO mode. After you setup a payment method, you can send it into the world!");?></h3>
				<div class="large-12 columns">
					<a id="startStripe" href="#"><button class="preodayButton goBackToDash" type="button" tabindex=2><?echo _("SETUP PAYMENT AND LEAVE DEMO MODE");?></button></a>
					<br/>
					<a href="<?echo $_SESSION['path']?>/dashboard"><button class="preodayButton secondary" type="button" tabindex=3><?echo _("I'LL COME BACK LATER TO PUBLISH MY APP");?></button></a>
				</div>
			</div>
		</form>
	</div>
	<?}?>
</div>

<script type="text/javascript">
	$(document).ready(function() {
		<?if(isset($_SESSION['paymentMethodApproved']) && $_SESSION['paymentMethodApproved']=='08C56E86512EAA9F108042253982AB4B7DD4F87BE8D66095D3655BB71F82123B'){
			$_SESSION['paymentMethodApproved']=0;
			if(!preg_match('/500/',$_SESSION['pmaReply'])){
			?>
			noty({
			  type: 'success',  layout: 'topCenter',
			  text: '<?echo $_SESSION['pmaReply'];?>'
			});
		<?}
		else{?>
			noty({
			  type: 'error',  layout: 'topCenter',
			  text: 'Payment method was not setup.'
			});
		<?}
			$_SESSION['pmaReply']='';
		}?>
	});
</script>
<?if((isset($_SESSION['signupWizFlag']) && $_SESSION['signupWizFlag'])){?>
<script type="text/javascript">
$(document).ready(function() {
	$('.progressIndicator').css('width','510%');
	$('.progressIndicator').attr('title', "100% phew! you're done!!");
	setTimeout(function() { $('.progressIndicator').trigger("mouseover"); }, 1100);
	setTimeout(function() { $('.progressIndicator').trigger("mouseout"); }, 7500);
});
</script>
<?}?>