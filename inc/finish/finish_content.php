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
	<div class="large-12 columns">
		<form id="finishForm" method="POST" action="<?echo $_SESSION['path']?>/code/finish/do_finish.php">
			
			<input type="hidden" name="liveFlag" value="<?echo $live?>"/>
			<input type="hidden" id="offFlag" name="offFlag" value="0"/>
			
			<div class="row">
				<?if( (isset($_SESSION['signupWizFlag']) && $_SESSION['signupWizFlag']) ){?>
					<h2 class="alignHeader"><? echo _("The finish line!");?></h2>
				<?}else{?>
					<h2 class="alignHeader"><? echo _("App mode");?></h2>
				<?}?>
				
				<h3 class="alignHeader"><?echo _("Your app is currently in ").$currentMode._(" mode.");?>&nbsp;&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom noPad" title="<?echo _("LIVE - Your app is available on My Order App and is ready to take real orders.<br/><br/>DEMO - Your app is available on My Order App but does not take real orders.<br/><br/>OFFLINE - Your app is not available on My Order App.");?>"></i></h3>
				
				<?if($noPaymentFlag){?><p class="alignHeader"><?echo _("After you setup a payment method, you can send it into the world!");?></p><?}?>
				
				<div class="large-12 columns">
					
					<?if($noPaymentFlag){?>
						<a id="startStripe" href="#"><button class="preodayButton large" type="button" tabindex=2><?echo _("SETUP PAYMENT");?></button></a><br/>
					<?}?>
					
					<?if($currentMode == "DEMO"){?>
							<?if(!$noPaymentFlag){?><button class="preodayButton large" type="submit" id="finishButton" tabindex=1><?echo _("MAKE MY APP LIVE");?></button><br/><?}?>
					
					<?} else if($currentMode == "LIVE"){?>
						<a id="goDemo" href="#"><button class="preodayButton large" type="button" tabindex=2><?echo _("SWITCH TO DEMO MODE");?></button></a><br/>
					
					<?} else if($currentMode == "OFFLINE"){?>
						<?if(!$noPaymentFlag){?><button class="preodayButton large" type="submit" id="finishButton" tabindex=1><?echo _("MAKE MY APP LIVE");?></button><br/><?}?>
						<a id="goDemo" href="#"><button class="preodayButton goBackToDash" type="button" tabindex=2><?echo _("PUT MY APP IN DEMO MODE");?></button></a><br/>
					
					<?} if($currentMode != "OFFLINE"){?><button class="preodayButton secondary goOffline" type="button" tabindex=1><?echo _("TAKE MY APP OFFLINE");?></button><br/><?}?>
					
					<a href="<?echo $_SESSION['path']?>/dashboard"><button class="preodayButton secondary" type="button" tabindex=2><?echo _("BACK TO THE DASHBOARD");?></button></a>
				</div>
			</div>
		</form>
	</div>
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
			  text: <? echo json_encode(_('Payment method was not setup.')) ?>
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