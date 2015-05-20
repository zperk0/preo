<style> 
	@import "<?echo $_SESSION['path']?>/css/dashboard_override.css";
</style><!-- The dashboard looks slightly different than other pages -->
<?
//resetting global vars
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/global_vars.php');
	$accountId = $_SESSION['account_id'];
	$venueId = $_SESSION['venue_id'];
	$connectedFlag = 0;	

	$curlResult = callAPI('GET', $apiURL."venues/$venueId/paymentproviders", false, $apiAuth);
	$dataJSON = json_decode($curlResult, true);		

	if(!empty($dataJSON))
	{	
		foreach($dataJSON as $paymentProvider)
		{
			if(isset($paymentProvider['type']) && ($paymentProvider['type'] == 'Stripe' || $paymentProvider['type'] == 'CASH'))
				$connectedFlag = 1;
		}
	}	

	$accountCard = true;
	$curlResult = callAPI('GET', $apiURL."accounts/$accountId/accountcard", false, $apiAuth);
	$dataJSON = json_decode($curlResult, true);
	if(empty($dataJSON) || !is_array($dataJSON) || !isset($dataJSON['accountId'])) {
		$accountCard = false;
	}

	$curlResult = callAPI('GET', $apiURL."accounts/$accountId/packages", false, $apiAuth);
	$dataJSON = json_decode($curlResult, true);

	$showKYC = false;
	$packageTrial = false;
	if(!empty($dataJSON))
	{	
		foreach($dataJSON as $accountPackage)
		{
			if (isset($accountPackage['preoPackage']) && is_array($accountPackage['preoPackage'])) {

				if ($accountPackage['status'] === "TRIAL") {
					$endDate = strtotime($accountPackage['endDate']);
					$endDate = mktime(date("H", $endDate), date("i", $endDate), date("s", $endDate), date("m", $endDate), date("d", $endDate), date("Y", $endDate));

					if ($endDate > time() && !$accountCard) {
						$packageTrial = $accountPackage;
					}
				}

				if (is_array($accountPackage['preoPackage']['features']) && !$showKYC) {
					foreach($accountPackage['preoPackage']['features'] as $feature) {
						if ($feature['id'] == 4 && ($accountPackage['status'] === "INSTALLED" || $accountPackage['status'] === "TRIAL" || $accountPackage['status'] === "UNINSTALLED")) {
							$showKYC = true;
							break;
						}
					}
				}
			}

			if ($showKYC && $packageTrial) {
				break;
			}
		}
	}
		
?>
<div class="row dashContentTop">
	<div class="topSpacer"></div>
	<div class="large-12 columns">
		<h1 class=""><? echo _("Dashboard");?>&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("This is where you can monitor your takings and reports.");?>"></i></h1>
		<?php 
		if (isset($_SESSION['venue_permalink']) && $_SESSION['OVERRIDES']['has_web_orders']) {
		?>
		<p class="venueCode large-8 small-12"><?echo _("Your online order page is")." <a href='". $_SESSION['OVERRIDES']["site"] . "/menus/" . $_SESSION['venue_permalink']."' target='_blank'><strong>". str_replace("https://", "", str_replace("http://", "", $_SESSION['OVERRIDES']["site"])) . "/menus/" . $_SESSION['venue_permalink']."</strong></a>";?></p>
		<?php } ?>
	</div>
</div>

<div class="row row--space1u dashContent">
	<div class="large-8 small-12 columns innerDashContent">	
		<div class="large-5 columns dashStats">	
			<div class="row">
				<h3><?echo _("This month");?></h3>
			</div>
			<div class="row">
				<h6><?echo _("Total revenue");?></h6>
				<h1><?echo $_SESSION['venue_ccySymbol'].' '.locale_number_format($_SESSION['venue_report_totalRevenue'], 2);?></h1>
			</div>
			<div class="row">
				<h6><?echo _("Total orders");?></h6>
				<h1><?echo locale_number_format($_SESSION['venue_report_totalOrders'],0);?></h1>
			</div>
			<div class="row">
				<h6><?echo _("New users");?></h6>
				<h1><?echo locale_number_format($_SESSION['venue_report_newUsers'],0);?></h1>
			</div>
			<div class="row">
				<h6><?echo _("Returning users");?></h6>
				<h1><?echo locale_number_format($_SESSION['venue_report_returningUsers'],0);?></h1>
			</div>
		</div>			
		<div class="large-7 columns dashChangeApp">				
			<div class="row">
				<div class="large-12 columns">
					<div class="accordion contentSectionsDashboard" data-options="one_up: false;" data-section="accordion">
						<section>
							<h3 data-section-title><a href="<?echo $_SESSION['OVERRIDES']["link_orders"]?>" target="_blank" class="titleDashContent"><span><?echo _("Order Screen");?></span></a> <img src="<?echo $_SESSION['path']?>/img/dashboard/order-icon_small.png"/></h3>
						</section>
						<?php 
						if ($showKYC) {
						?>						
						<section>
							<h3 data-section-title><a href="/kyc" class="titleDashContent"><?echo _("Customer Analytics");?></a> <img src="<?echo $_SESSION['path']?>/img/dashboard/analytics-icon.png"/></h3>
						</section>
						<?php } ?>
						<section>
							<h3 data-section-title><span><?echo _("Menus");?></span><img src="<?echo $_SESSION['path']?>/img/dashboard/menu_small.png"/></h3>
							<div class="content" data-section-content>
								<?foreach($_SESSION['menus'] as $menuL){?>
									<p id="p-<?echo $menuL['id']?>">
										<a class="dashMenuIcon" 			href="<?echo $_SESSION['path']?>/menus/<?echo $menuL['id'];?>" title="<?echo _("Edit")." $menuL[name]";?>"><?echo htmlentities($menuL['name'], ENT_QUOTES)?></a>
										<!--<a class="dashMenuIcon deleteMenu" 	id="dmi-<?echo $menuL['id']?>"  title="<?echo _("Delete")." $menuL[name]";?>"><i class="fi-x"></i></a>-->
									</p>
								<?}?>
								<!--<p><a href="<?echo $_SESSION['path']?>/newMenu.php"><?echo _("Add new menu");?></a></p>-->
								<p><a href="<?echo $_SESSION['path']?>/mealdeals"><?echo _("Meal Deals");?></a></p>
							</div>
						</section>						
						<section>
							<h3 data-section-title><span><?echo _("Venue Settings");?></span><img src="<?echo $_SESSION['path']?>/img/dashboard/settings_small.png"/></h3>
							<div class="content" data-section-content>
								<p><a href="<?echo $_SESSION['path']?>/settings"><?echo _("Change settings");?></a></p>
								<p><a href="<?echo $_SESSION['path']?>/deliverySettings"><?echo _("Delivery settings");?></a></p>
								<p><a href="<?echo $_SESSION['path']?>/deliverySettings#/notifications"><?echo _("Preset notifications");?></a></p>
								<?if(!$_SESSION['venue_eventFlag']){?>
									<p><a href="<?echo $_SESSION['path']?>/openinghours"><?echo _("Opening hours");?></a></p>
								<?}?>
							</div>
						</section>
						<section>
							<h3 data-section-title><span><?echo _("Styling");?></span><img class="topFix" src="<?echo $_SESSION['path']?>/img/dashboard/styling_small.png"/></h3>
							<div class="content" data-section-content>
								<p><a href="<?echo $_SESSION['path']?>/homescreen"><?echo _("Home screen");?></a></p>
								<p><a href="<?echo $_SESSION['path']?>/menuscreen"><?echo _("Menu screen");?></a></p>
							</div>
						</section>
						<?if($_SESSION['venue_eventFlag']){?>		
						<section>
							<h3 data-section-title><span><?echo _("Events");?></span><img src="<?echo $_SESSION['path']?>/img/dashboard/events_small.png"/></h3>
							<div class="content" data-section-content>
								<p><a href="<?echo $_SESSION['path']?>/events"><?echo _("Update events");?></a></p>
							</div>
						</section>
						<?}?>						
						<section class="premiumSectionBorderBottom">
							<h3 data-section-title><span><?echo _("Advanced Settings");?></span><img src="<?echo $_SESSION['path']?>/img/dashboard/settings_small.png"/></h3>
							<div class="content" data-section-content>
								<p><a href="<?echo $_SESSION['path']?>/users"><?echo _("Manage users");?></a></p>
								<p><a href="<?echo $_SESSION['path']?>/payment"><?echo _("Add a payment method");?></a></p>
								<p><a href="<?echo $_SESSION['path']?>/publish"><?echo _("Change my app mode");?></a></p>
							</div>
						</section>
						<section class="premiumSection">
							<h3 data-section-title><a href="<?echo $_SESSION['path']?>/accountSettings"><?echo _("My Account");?></a><img src="<?echo $_SESSION['path']?>/img/dashboard/account-icon.png"/></h3>
						</section>	
						<section class="premiumSection">
							<?php if ($_SESSION['OVERRIDES']['help_menu']) { ?>
							<h3 data-section-title><?echo _("Help");?><img class="noFilter" src="<?echo $_SESSION['path']?>/img/dashboard/help-icon.png"/></h3>							
							<div class="content" data-section-content>
								<div> 
									<p class='link-to-video'><span ></span><a href='javascript:void(0)' target='_blank' class="openVideoModal" data-name="Preoday_-_Getting_Started"><?echo _("Getting Started")?></a></p>
									<p  class='link-to-video'><span></span><a href='javascript:void(0)' target='_blank' class="openVideoModal" data-name="Preoday_-_Editing_your_menu"><?echo _("Editing your Menu")?></a></p>
									<p><a href="<?echo $_SESSION['OVERRIDES']["link_faq"]?>" target="_blank" class='featureName'>Frequently Asked Questions</a></p>
									<p><a href="<?echo $_SESSION['path']?>/support"  class='featureName'>Support</a></p>
								</div>
							</div>
							<?php } else { ?>
							<h3 data-section-title><a href="<?echo $_SESSION['path']?>/support"><?echo _("Support");?></a><img src="<?echo $_SESSION['path']?>/img/dashboard/help-icon.png"/></h3>
							<?php } ?>
						</section>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div id="iphone5" class="large-4 columns">
		<div class="venueMode">
		 	<span><?echo _("Change app mode")?> <i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom noPad" title="<?echo _("LIVE - Your app is visible and is ready to take real orders.<br/><br/>DEMO - Your app is visible but does not take real orders.<br/><br/>OFFLINE - Your app is not visible.");?>"></i></span>

		 	<div class='switchModeWrapper columns'>
				<div class='switchDashboardMode columns large-4 <? if ($currentMode === "OFFLINE") echo _("active") ?>'  data-mode='o' ><?echo _("OFFLINE")?> </div>
				<div class='switchDashboardMode columns large-4 <? if ($currentMode === "DEMO") echo _("active") ?>' data-mode='d'><?echo _("DEMO")?> </div>
				<div class='switchDashboardMode columns large-4 <? if ($currentMode === "LIVE") echo _("active") ?>' data-mode='<? if ($connectedFlag){echo ("l");} else {echo ("n");} ?>'><?echo _("LIVE")?> </div>
			</div>
		</div>
		<div class="phoneContainer">
			<div id="frame_iphone5" class="phone1">
				<?if(isset($_SESSION['app_wallpaperId']) && $_SESSION['app_wallpaperId']!=1 && $_SESSION['app_wallpaperId']!=2 && $_SESSION['app_wallpaperId']!=3 && $_SESSION['app_wallpaperId']!=4 && $_SESSION['app_wallpaperId']!=5){?>
					<img id="phoneWallpaper" src="<?echo $wPath.'wall_wa_'.$_SESSION['app_wallpaperId'].'.jpg';?>" />
				<?}else if(isset($_SESSION['app_wallpaperId'])){?>
					<img id="phoneWallpaper" src="<?echo $_SESSION['path']?>/img/wallpapers/wall_wa_<? echo $_SESSION['app_wallpaperId'];?>.jpg" />
				<?}else{?>
					<img id="phoneWallpaper" src="<?echo $_SESSION['path']?>/img/wallpapers/wall_wa_1.jpg" />
				<?}?>
				<img id="carrierIMG" src="<?echo $_SESSION['path']?>/img/wallpapers/carrier.png" />
				<img id="poweredIMG" src="<?echo $_SESSION['path']?>/img/wallpapers/powered.png" />
				<button type="button" class="tiny expand" id="buttonIMG"><?echo _('ORDER NOW');?></button>
				<p id="appHeading"><?if(isset($_SESSION['app_heading'])) echo htmlentities($_SESSION['app_heading'], ENT_QUOTES);else echo "";?></p>
				<!--<p id="venSubHeading"><?echo htmlentities($_SESSION['venue_name'], ENT_QUOTES);?></p>-->
				<p id="venSubHeading">&nbsp;</p>
				<p id="subHeading"><?if(isset($_SESSION['app_subHeading'])) echo htmlentities($_SESSION['app_subHeading'], ENT_QUOTES);else echo "";?></p>
			</div>
			<div id="frame_iphone5" class="phone2 hide">
				<img id="phoneWallpaper" src="<?echo $_SESSION['path']?>/img/wallpapers/menuWall.jpg" />
				<button type="button" class="tiny expand" id="buttonIMG2"><?echo _('BASKET');?></button>
				<button type="button" class="tiny expand menuMultiButton"><i class="pd-add"></i></button>
				<button type="button" class="tiny expand menuMultiButton mmb2"><i class="pd-add"></i></button>
				<button type="button" class="tiny expand menuMultiButton mmb3"><i class="pd-add"></i></button>
				<button type="button" class="tiny expand menuMultiButton mmb4"><i class="pd-add"></i></button>
				<button type="button" class="tiny expand menuMultiButton mmb5"><i class="pd-add"></i></button>
				<button type="button" class="tiny expand menuMultiButton mmb6"><i class="pd-add"></i></button>
				<p id="venTitle"><?if(isset($_SESSION['app_title'])) echo htmlentities($_SESSION['app_title'], ENT_QUOTES);else echo _("Venue Title");?></p>
			</div>
		</div>
		<div class="pagerRow phone1pager">
			<i class="icon-circle"></i><a class="showNextPhone"><i class="icon-circle-blank"></i></a>
		</div>
		<div class="pagerRow phone2pager hide">
			<a class="showNextPhone"><i class="icon-circle-blank"></i></a><i class="icon-circle"></i>
		</div>
	</div>
</div>

<div class="loading" id="loadingDashboard" ng-show="requests">
  <div class="background-loading"></div>
  <div class="loading-content">
    <div class="spinner">
      <div class="b1 se"></div>
      <div class="b2 se"></div>
      <div class="b3 se"></div>
      <div class="b4 se"></div>
      <div class="b5 se"></div>
      <div class="b6 se"></div>
      <div class="b7 se"></div>
      <div class="b8 se"></div>
      <div class="b9 se"></div>
      <div class="b10 se"></div>
      <div class="b11 se"></div>
      <div class="b12 se"></div>
    </div>
  </div>
</div>  

<div id="expiredDialog" class="reveal-modal medium modal-preoday dashboard" data-reveal>
    <header class="title-notification">Know your customer - 30 DAYS FREE TRIAL</header>
    <div class="container-modal-confirm"><? echo _("Your 30 day free trial 	of this Premium Feature has now expired. Would you like to purchase it?")?></div>      	    
    <button class='positiveDismiss preodayButton' ><? echo _("YES PLEASE")?></button>
    <button class='negativeDismiss preodayButton'><? echo _("NOT RIGHT NOW")?></button>
    <p class='modal-term'>
      <label>
        <input type="checkbox" class='doNotShowAgain'/>  
          Do not show this message again
      </label>
    </p>  
</div>

<?php 
if ($packageTrial) {
?>
<div id="expiredPackageDialog" class="reveal-modal small modal-preoday dashboard" data-reveal>
	<a class="close-reveal-modal">×</a>
    <header class="title-notification"><?php echo $packageTrial['preoPackage']['name'] . _(" trial"); ?></header>
    <div class="container-modal-confirm">
	    <?php 
	    $start = time(); // or your date as well
	    $end = strtotime($packageTrial['endDate']);
	    $days = ceil(abs($end - $start) / 86400);
	    ?>
    	<p class="text"><? echo _("Your free trial expires in ") . "<b>$days</b>" . _(" days.") . _(" To continue using your app after the free trial, register your card details for the ") . "<b>" . $packageTrial['preoPackage']['name'] . "</b>" . _(" on the 'My Account' tab located on your dashboard.")?></p>
    </div>
    <a class='preodayButton blue' href="/accountSettings"><? echo _("GO TO MY ACCOUNT")?></a>
</div>
<?php } ?>

<div id="noPaymentMethod" class="reveal-modal medium modal-preoday dashboard" data-reveal>
    <header class="title-notification"><?echo _("Payment provider is not connected!")?></header>
    <div class="container-modal-confirm"><? echo _("Before taking your app live you need to connect it to a payment provider or enable cash payments so that you can start accepting payments and start getting paid!")?></div>
    <button class='positiveDismiss preodayButton' ><? echo _("CONNECT")?></button>
    <button class='negativeDismiss preodayButton'><? echo _("CANCEL")?></button>    
</div>

<script type="text/javascript">
	$(document).ready(function() {

		//TODO replace all this horrible code with the correct angular modules 
		//----- start horrible code ------ 
		var isShowAgain = window.localStorage.getItem("showDialogAgain_4");
		var isShow = Number(window.localStorage.getItem("showDialog")) === 1 && (isShowAgain === null || Number(isShowAgain) === 1);

		<?php 
		if ($packageTrial) {
		 ?>
		var isShowAgainTrial = window.localStorage.getItem("showDialogAgainTrial");
		if (!isShowAgainTrial) {
			var message = _tr("Your app has been assigned to the ") + "<b><?php echo $packageTrial['preoPackage']['name']; ?></b>" + _tr(", which includes a ") + "<b>" + _tr("2 week") + "</b>" + _tr(" free trial. To continue using your app after the free trial, you will need to register your card details on the 'My Account' tab located on your dashboard.");
			$('#expiredPackageDialog .text').html(message);
			window.localStorage.setItem("showDialogAgainTrial", true);
		}
		$('#expiredPackageDialog').foundation('reveal', 'open');
		 <?php } ?>
		
		$('.positiveDismiss').on('click',positiveDismiss);
		$('.negativeDismiss').on('click',negativeDismiss);
		if (isShow) {		
			$('#expiredDialog').foundation('reveal', 'open');			
			$('.termsAndConditions').on("change",function(){
				if ($(this).is(":checked")){
					$('.secondaryIfNotTermsAndConditions').removeClass("secondary")
				}
				else{
					$('.secondaryIfNotTermsAndConditions').addClass("secondary")	
				}
			})
		}
		function positiveDismiss(){
			var dialog = $(this).parent(".modal-preoday");
			var dialogId = dialog.attr("id");
			if ($('.doNotShowAgain').is(':checked')) {
				window.localStorage.setItem("showDialogAgain_4",0) 
			}				
			switch (dialogId){
				case "expiredDialog":
					window.location.replace("/shop#/feature/4");
					break;							
				case "noPaymentMethod":
					window.location.replace("/payment");
				break;
			}
		}

		function negativeDismiss(){

			var dialog = $(this).parent(".modal-preoday");
			var dialogId = dialog.attr("id");
			switch (dialogId){
				case "expiredDialog":
					if ($('.doNotShowAgain').is(':checked')) {
						//TODO add featureId dynamically
						window.localStorage.setItem("showDialogAgain_4",0) 
					}
					break;
				default:
					break;
				}								
			$('#'+dialogId).foundation('reveal', 'close');
		}
		//------  end horible code ------ 


		<?if(isset($_SESSION['app_textColour'])){?>updateTextColour('<?echo $_SESSION['app_textColour']?>');<?}?>
		<?if(isset($_SESSION['app_buttonColour'])){?>updateButtonColour('<?echo $_SESSION['app_buttonColour']?>');<?}?>
		<?if(isset($_SESSION['app_buttonTextColour'])){?>updateButtonTextColour('<?echo $_SESSION['app_buttonTextColour']?>');<?}?>
		
		<?if(isset($_SESSION['app_logo']) && !empty($_SESSION['app_logo'])){?>
			content="<img src='<?echo $lPath.$_SESSION['app_logo']."_thumb.png";?>'/>";
			$('#appHeading').html(content);
		<?}?>
		
		<?if(isset($_SESSION['app_button2Colour'])){?>updateButton2Colour('<?echo $_SESSION['app_button2Colour']?>');<?}?>
		<?if(isset($_SESSION['app_button2TextColour'])){?>updateButton2TextColour('<?echo $_SESSION['app_button2TextColour']?>');<?}?>
		
		<?if(isset($_SESSION['app_button3Colour'])){?>updateButton3Colour('<?echo $_SESSION['app_button3Colour']?>');<?}?>
		<?if(isset($_SESSION['app_button3TextColour'])){?>updateButton3TextColour('<?echo $_SESSION['app_button3TextColour']?>');<?}?>
		
		<?if(isset($_SESSION['paymentMethodApproved']) && $_SESSION['paymentMethodApproved']=='08C56E86512EAA9F108042253982AB4B7DD4F87BE8D66095D3655BB71F82123B'){
			$_SESSION['paymentMethodApproved']=0;?>
			noty({
			  type: 'success',  layout: 'topCenter',
			  text: '<?echo $_SESSION['pmaReply'];?>'
			});
		<?
			$_SESSION['pmaReply']='';
		}?>
		
		<?if(isset($_SESSION['appPublished']) && $_SESSION['appPublished']=='08C56E86512EAA9F108042253982AB4B7DD4F87BE8D66095D3655BB71F82123B'){
			$_SESSION['appPublished']=0;?>
			noty({
			  type: 'success',  layout: 'topCenter',
			  text: <?echo json_encode(_("Your app is now live!"));?>
			});
		<?
		}?>
		
		<?if(isset($_SESSION['appUnPublished']) && $_SESSION['appUnPublished']=='08C56E86512EAA9F108042253982AB4B7DD4F87BE8D66095D3655BB71F82123B'){
			$_SESSION['appUnPublished']=0;?>
			noty({
			  type: 'success',  layout: 'topCenter',
			  text: <?echo json_encode(_("Your app is now in DEMO mode."));?>
			});
		<?
		}?>
		
		<?if(isset($_SESSION['appStripeSkipped']) && $_SESSION['appStripeSkipped']=='08C56E86512EAA9F108042253982AB4B7DD4F87BE8D66095D3655BB71F82123B'){
			$_SESSION['appStripeSkipped']=0;?>
			noty({
			  type: 'success',  layout: 'topCenter',
			  text: <?echo json_encode(_("Your app is now in OFFLINE mode."));?>
			});
		<?
		}?>
		
		<?if(isset($_SESSION['appStripeDemo']) && $_SESSION['appStripeDemo']=='08C56E86512EAA9F108042253982AB4B7DD4F87BE8D66095D3655BB71F82123B'){
			$_SESSION['appStripeDemo']=0;?>
			noty({
			  type: 'success',  layout: 'topCenter',
			  text: <?echo json_encode(_("Your app is now in Demo mode."));?>
			});
		<?
		}?>
		
		<?if(isset($_SESSION['appOffline']) && $_SESSION['appOffline']=='08C56E86512EAA9F108042253982AB4B7DD4F87BE8D66095D3655BB71F82123B'){
			$_SESSION['appOffline']=0;?>
			noty({
			  type: 'success',  layout: 'topCenter',
			  text: <?echo json_encode(_("Your app is now in OFFLINE mode."));?>
			});
		<?
		}?>
	});
</script>