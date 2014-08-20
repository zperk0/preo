<style> 
	@import '<?echo $_SESSION['path']?>/css/dashboard_override.css';
</style><!-- The dashboard looks slightly different than other pages -->
<?
//resetting global vars
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/global_vars.php');

	$curlResult = callAPI('GET', $apiURL."accounts/$accountId/paymentproviders", false, $apiAuth);
	$dataJSON = json_decode($curlResult, true);
	$connectedFlag = 0;	
	if(!empty($dataJSON))
	{	
		foreach($dataJSON as $paymentProvider)
		{
			if(isset($paymentProvider['type']) && $paymentProvider['type'] == 'Stripe')
				$connectedFlag = 1;
		}
	}
		
?>
<div class="row dashContentTop">
	<div class="topSpacer"></div>
	<div class="large-12 columns">
		<h1 class=""><? echo _("Dashboard");?>&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("This is where you can monitor your takings and reports.");?>"></i></h1>
		<p class="venueCode"><?echo _("Your venue shortcode is")." <strong>".$_SESSION['venue_code']."</strong>";?>&nbsp;&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom noPad" title="<?echo _("This is the code your customers need to use to find your venue on 'My Order App'");?>"></i></p>
		<p class="venueCode"><?echo _("Your app is currently in ")."<strong class='currentMode'>$currentMode</strong>"._(" mode.");?>&nbsp;&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom noPad" title="<?echo _("LIVE - Your app is available on My Order App and is ready to take real orders.<br/><br/>DEMO - Your app is available on My Order App but does not take real orders.<br/><br/>OFFLINE - Your app is not available on My Order App.");?>"></i></p>
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
					<h3 class="cyappHead"><?echo _("Change your app");?></h3>
				</div>
			</div>		
			<div class="row">
				<div class="large-12 columns">
					<div class="accordion" data-options="one_up: false;" data-section="accordion">
						<section>
							<h3 data-section-title><?echo _("Venue Settings");?></h3><img src="<?echo $_SESSION['path']?>/img/dashboard/settings_small.png"/>
							<div class="content" data-section-content>
								<p><a href="<?echo $_SESSION['path']?>/settings"><?echo _("Change settings");?></a></p>
								<p><a href="<?echo $_SESSION['path']?>/deliverySettings"><?echo _("Delivery settings");?></a></p>
								<?if(!$_SESSION['venue_eventFlag']){?>
									<p><a href="<?echo $_SESSION['path']?>/openinghours"><?echo _("Opening hours");?></a></p>
								<?}?>
							</div>
						</section>
						<section>
							<h3 data-section-title><?echo _("Styling");?></h3><img class="topFix" src="<?echo $_SESSION['path']?>/img/dashboard/styling_small.png"/>
							<div class="content" data-section-content>
								<p><a href="<?echo $_SESSION['path']?>/homescreen"><?echo _("Home screen");?></a></p>
								<p><a href="<?echo $_SESSION['path']?>/menuscreen"><?echo _("Menu screen");?></a></p>
							</div>
						</section>
						<section>
							<h3 data-section-title><?echo _("Menus");?></h3><img src="<?echo $_SESSION['path']?>/img/dashboard/menu_small.png"/>
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
						<?if($_SESSION['venue_eventFlag']){?>		
						<section>
							<h3 data-section-title><?echo _("Events");?></h3><img src="<?echo $_SESSION['path']?>/img/dashboard/events_small.png"/>
							<div class="content" data-section-content>
								<p><a href="<?echo $_SESSION['path']?>/events"><?echo _("Update events");?></a></p>
							</div>
						</section>
						<?}?>
						<section>
							<h3 data-section-title><?echo _("Advanced Settings");?></h3><img src="<?echo $_SESSION['path']?>/img/dashboard/settings_small.png"/>
							<div class="content" data-section-content>
								<p><a href="<?echo $_SESSION['path']?>/users"><?echo _("Manage users");?></a></p>
								<p><a href="<?echo $_SESSION['path']?>/payment"><?echo _("Add a payment method");?></a></p>
								<p><a href="<?echo $_SESSION['path']?>/publish"><?echo _("Change my app mode");?></a></p>
							</div>
						</section>
						<section class="premiumSection active">
							<h3 data-section-title><?echo _("Premium Features");?></h3><i class="icon-plus-sign"></i>
							<div class="content" data-section-content>

									<?  //get the features list we have for this acocunt 									   
											function filterActive($feat){
													if ($feat->status != 'CANCELED' && $feat->status != 'EXPIRED' ){
														return True;
													}
													return False;
											}											
										  $accountId = $_SESSION['account_id'];	  
											$result = callAPI('GET', $apiURL."accounts/$accountId/features", false,"PreoDay ".$_SESSION['token']);
											$resultArray = json_decode($result);
											if ( is_array($resultArray)) {
												$accountFeatures = array_filter(json_decode($result),"filterActive");
											}
											if(is_array($accountFeatures) && count($accountFeatures) > 0) { ?> 
												<div class='featuresList'> 
												<? foreach($accountFeatures as $feat) { ?>
													<p data-feature='<? echo $feat->featureId ;?>' class='featureHolder'><img class='featureIcon'/><a href="#"  class='featureName'></a></li>												
											<?} } else{?>											
												<div class='featuresText'>
												<p><? echo ("You don't currently have any active Premium Features on your account.")?></p><br/>
												<p><? echo ("Why not check out our")?><a href="<?echo $_SESSION['path']?>/shop"> <?echo _("Available Premium Features");?></a>
													<? echo ("and discover how they can start adding further value to your business, today?");?>
											 </p>
											<?}?>				
											</div>
								<p><button class='preodayButton shopButton'> <a href="<?echo $_SESSION['path']?>/shop"> <?echo _("STORE");?> </a> </button></p>
							</div>
						</section>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div id="iphone5" class="large-4 columns">
		<div class="venueMode">
		 	<span><?echo _("Change app mode")?> <i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom noPad" title="<?echo _("LIVE - Your app is available on My Order App and is ready to take real orders.<br/><br/>DEMO - Your app is available on My Order App but does not take real orders.<br/><br/>OFFLINE - Your app is not available on My Order App.");?>"></i></span>

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

<div id="noPaymentMethod" class="reveal-modal medium modal-preoday dashboard" data-reveal>
    <header class="title-notification"><?echo _("Payment provider is not connected!")?></header>
    <div class="container-modal-confirm"><? echo _("Before taking your app live you need to connect it to a payment providerso that you can start accepting payments and start getting paid!")?></div>      	    
    <button class='positiveDismiss preodayButton' ><? echo _("CONNECT")?></button>
    <button class='negativeDismiss preodayButton'><? echo _("CANCEL")?></button>    
</div>

<script type="text/javascript">
	$(document).ready(function() {
		

		//TODO replace all this horrible code with the correct angular modules 
		//----- start horrible code ------ 
		var isShowAgain = window.localStorage.getItem("showDialogAgain_4");
		var isShow = Number(window.localStorage.getItem("showDialog")) === 1 && (isShowAgain === null || Number(isShowAgain) === 1);
		
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
			console.log('here',dialog);
			if ($('.doNotShowAgain').is(':checked')) {
				window.localStorage.setItem("showDialogAgain_4",0) 
			}				
			switch (dialogId){
				case "expiredDialog":
					window.location.replace("/shop#/feature/4");
					break;							
				case "noPaymentMethod":
					console.log('nopay');
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