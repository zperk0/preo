<?php
	require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
    require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
    if ( isset($_SESSION['logged']) ) {
		require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/account_functions.php');   //kint

		$venues = getVenues( $_SESSION['user_id'] );
		$accountId = $_SESSION['account_id'];

		$curlResult = callAPI('GET', $apiURL."accounts/$accountId/packages", false, $apiAuth);
		$dataJSON = json_decode($curlResult, true);

		$isGroupBookingEnabled = false;
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

					if (is_array($accountPackage['preoPackage']['features']) && !$isGroupBookingEnabled) {
						foreach($accountPackage['preoPackage']['features'] as $feature) {
							if ($feature['id'] == 9 && ($accountPackage['status'] === "INSTALLED" || $accountPackage['status'] === "TRIAL" || $accountPackage['status'] === "UNINSTALLED")) {
								$isGroupBookingEnabled = true;
								break;
							}
						}
					}
				}

				if ($packageTrial && $isGroupBookingEnabled) {
					break;
				}
			}
		}
	}
?>

<div class="contain-to-grid">
	<nav class="top-bar">
		<ul class="title-area">
			<li class="name">
			<? if ($_SESSION['OVERRIDES']['logo'] != false) { ?>
				<h1>
					<a href="<?echo $_SESSION['path']?>/"><img src="<?echo $_SESSION['OVERRIDES']['logo']?>" alt="<? echo $_SESSION['OVERRIDES']["title"];?>"/></a>
				</h1>
			<? } ?>
				<div class="progressIndicator has-tip tip-right" data-tooltip></div>
			</li>
			<li class="toggle-topbar">
				<a href="#"><i class="fi-list large"></i> <? echo _("Menu");?></a>
			</li>
		</ul>

		<section class="top-bar-section">
			<!-- Right Nav Section -->
			<ul class="left pretendRight">
				<?php if(!isset($_SESSION['logged'])) { ?>
					<li><a href="<?echo $_SESSION['path']?>/signup"									><? echo _("Sign Up");?></a></li>
					<li><a href="<?echo $_SESSION['path']?>/signin"	class="activated"				><? echo _("Login");?></a></li>
				<?php } else {
						if(!isset($_SESSION['signupWizFlag']) || !$_SESSION['signupWizFlag']){ ?>
					<li class="has-dropdown"><a href="<?echo $_SESSION['path']?>/"><? echo _("Dashboard");?></a>
						<ul class="dropdown">
							<li><a href="<?echo $_SESSION['path']?>/dashboard"><? echo _("Go to Dashboard");?></a></li>

							<li><a href="<?echo $_SESSION['OVERRIDES']["link_orders"]?>" target="_blank"><? echo _("Order Screen");?></a></li>

							<li class="has-dropdown"><a href="#"><?echo _("Venue Settings");?></a>
								<ul class="dropdown">
									<li><a href="<?echo $_SESSION['path']?>/settings"><?echo _("Change Settings");?></a></li>
									<li><a href="<?echo $_SESSION['path']?>/deliverySettings"><?echo _("Delivery Settings");?></a></li>
									<?if(!isset($_SESSION['venue_eventFlag']) || !$_SESSION['venue_eventFlag']){?><li><a href="<?echo $_SESSION['path']?>/openinghours"><?echo _("Opening Hours");?></a></li><?}?>
									<li><a href="<?echo $_SESSION['path']?>/deliverySettings#/notifications"><?echo _("Preset Notifications");?></a></li>
								</ul>
							</li>
							<li class="has-dropdown"><a href="#"><?echo _("Styling");?></a>
								<ul class="dropdown">
									<li><a href="<?echo $_SESSION['path']?>/homescreen"><?echo _("Home Screen");?></a></li>
									<li><a href="<?echo $_SESSION['path']?>/menuscreen"><?echo _("Menu Screen");?></a></li>
								</ul>
							</li>
							<li class="has-dropdown"><a href="#"><?echo _("Menus");?></a>
								<ul class="dropdown">
									<?
										//query to find menus for this venue
										$accountID = $_SESSION['account_id'];
										$mCurlResult = callAPI('GET', $apiURL."menus?accountId=$accountID", false, $apiAuth);
										$mDataJSON = json_decode($mCurlResult,true);
										if(!empty($mDataJSON) && (!isset($mDataJSON['status'])))
										{
											$_SESSION['menus'] = $mDataJSON;
											foreach($mDataJSON as $menuL){?>
												<li><a href="<?echo $_SESSION['path']?>/editmenu/<?echo $menuL['id'];?>"><?echo _("Edit")." $menuL[name]";?></a></li>
											<?}?>
											<li><a href="<?echo $_SESSION['path']?>/mealdeals"><?echo _("Meal Deals");?></a></li><?
										}
										else {?>
											<li><a href="#"><?echo _("No menus");?></a></li>
										<?}?>
								</ul>
							</li>
							<?if(isset($_SESSION['venue_eventFlag']) && $_SESSION['venue_eventFlag']){?>
							<li class="has-dropdown"><a href="#"><?echo _("Events");?></a>
								<ul class="dropdown">
									<li><a href="<?echo $_SESSION['path']?>/events"><?echo _("Update Events");?></a></li>
								</ul>
							</li>
							<?}?>
							<?if($isGroupBookingEnabled){?>
							<li class="has-dropdown"><a href="#"><?echo _("Group Booking");?></a>
								<ul class="dropdown">
									<li><a href="<?echo $_SESSION['path']?>/groupBookingMenus"><?echo _("Menus");?></a></li>
									<li><a href="<?echo $_SESSION['path']?>/booking"><?echo _("Bookings");?></a></li>
									<li><a href="<?echo $_SESSION['path']?>/bookingSettings"><?echo _("Settings");?></a></li>
								</ul>
							</li>
							<?}?>
							<li class="has-dropdown"><a href="#"><?echo _("Advanced Settings");?></a>
								<ul class="dropdown">
									<li><a href="<?echo $_SESSION['path']?>/users"><?echo _("Manage Users");?></a></li>
									<li><a href="<?echo $_SESSION['path']?>/payment"><?echo _("Payment Method");?></a></li>
									<li><a href="<?echo $_SESSION['path']?>/publish"><?echo _("Change my app mode");?>&nbsp;&nbsp;</a></li>

								</ul>
							</li>
							<?php
							if ( is_array($venues) && count($venues) > 1 ) {
							?>
							<li><a href="<?echo $_SESSION['path']?>/selectVenue"><?echo _("Switch Venue");?></a></li>
							<?php } ?>
						</ul>
					</li>
					<li class="has-dropdown"><a href="/accountSettings" class="activated"><? echo $_SESSION['user_fName']." ".$_SESSION['user_lName'];?></a>
						<ul class="dropdown">
							<li><a href="<?echo $_SESSION['path']?>/accountSettings"><?echo _("My Account");?></a></li>
							<li><a href="<?echo $_SESSION['path']?>/logout"><? echo _("Logout");?></a></li>
						</ul>
					</li>
					<?php if ($_SESSION['OVERRIDES']['help_menu']) { ?>
					<li class="has-dropdown lessLeft"><a href="#"><? echo _("Help");?></a>
						<ul class="dropdown makeULWider">
							<li class='link-to-video'><span ></span><a href='javascript:void(0)' target='_blank' class="openVideoModal" data-name="Preoday_-_Getting_Started"><?echo _("Getting Started")?></a></li>
							<li  class='link-to-video'><span></span><a href='javascript:void(0)' target='_blank' class="openVideoModal" data-name="Preoday_-_Editing_your_menu"><?echo _("Editing your Menu")?></a></li>
							<li><a href="<?echo $_SESSION['OVERRIDES']["link_faq"]?>" target="_blank"><? echo _("FAQs");?></a></li>
							<li><a href="<?echo $_SESSION['path']?>/support"><? echo _("Support");?></a></li>
						</ul>
					</li>
					<?php  } else { ?>
					<li class="lessLeft"><a href="<?echo $_SESSION['path']?>/support"><? echo _("Support");?></a></li>
					<?php } ?>
					<?}else{?>
					<?if(isset($_SESSION['venue_cat'])){?><li><a target="_blank" href="<?echo $_SESSION['path']?>/docs/GettingStartedGuide_<?echo $_SESSION['venue_cat'];?>.pdf"><?echo _("Getting started");?></a></li><?}?>
					<li><a class="activated" href="<?echo $_SESSION['path']?>/logout"><? echo _("Logout");?></a></li>
					<?}?>
				<?php } ?>
			</ul>
		</section>
	</nav>
</div>

<!-- Foundation with required JS and Plugins minified COMBINED with Bespoke JS File Generated using 'grunt build' -->
<script src="<?echo $_SESSION['path']?>/code/shared/js_strings.php?lang=<?echo $lang?>"></script>
