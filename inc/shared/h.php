<?php require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
      require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function 
      require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/override_vars.php');

?>

<div class="contain-to-grid">
	<nav class="top-bar">
		<ul class="title-area">
			<li class="name">
				<h1>
					<a href="<?echo $_SESSION['path']?>/"><img src="<?echo $_SESSION['OVERRIDES']['logo']?>" alt="<? echo _("PreoDay");?>"/></a>
				</h1>
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
							
							<? if(preg_match('/^local/', $_SERVER['SERVER_NAME'])){ ?>
								<li><a href="//orders-dev.preoday.com" target="_blank"><? echo _("Order Screen");?></a></li>
							<? }
							else if(preg_match('/^app\-dev/', $_SERVER['SERVER_NAME'])){ ?>
								<li><a href="//orders-dev.preoday.com" target="_blank"><? echo _("Order Screen");?></a></li>
							<? }
							else if(preg_match('/^app\-demo/', $_SERVER['SERVER_NAME'])){ ?>
								<li><a href="//orders-demo.preoday.com" target="_blank"><? echo _("Order Screen");?></a></li>
							<? }
							else if(preg_match('/^app\./', $_SERVER['SERVER_NAME'])){ ?>
								<li><a href="//orders.preoday.com" target="_blank"><? echo _("Order Screen");?></a></li>
							<? } ?>

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
											foreach($mDataJSON as $menuL){?>
												<li><a href="<?echo $_SESSION['path']?>/menus/<?echo $menuL['id'];?>"><?echo _("Edit")." $menuL[name]";?></a></li>
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
							<li class="has-dropdown"><a href="#"><?echo _("Advanced Settings");?></a>
								<ul class="dropdown">
									<li><a href="<?echo $_SESSION['path']?>/users"><?echo _("Manage Users");?></a></li>
									<li><a href="<?echo $_SESSION['path']?>/payment"><?echo _("Payment Method");?></a></li>
									<li><a href="<?echo $_SESSION['path']?>/publish"><?echo _("Change my app mode");?>&nbsp;&nbsp;</a></li>
									
								</ul>
							</li>
						</ul>
					</li>
					<li class="has-dropdown"><a href="/accountSettings" class="activated"><? echo $_SESSION['user_fName']." ".$_SESSION['user_lName'];?></a>
						<ul class="dropdown">
							<li><a href="<?echo $_SESSION['path']?>/accountSettings"><?echo _("My Account");?></a></li>
							<li><a href="<?echo $_SESSION['path']?>/logout"><? echo _("Logout");?></a></li>
						</ul>
					</li>	
					<li class="has-dropdown lessLeft"><a href="#"><? echo _("Help");?></a>
						<ul class="dropdown makeULWider">
							<li class='link-to-video'><span ></span><a href='javascript:void(0)' target='_blank' class="openVideoModal" data-name="Preoday_-_Getting_Started"><?echo _("Getting Started")?></a></li>
							<li  class='link-to-video'><span></span><a href='javascript:void(0)' target='_blank' class="openVideoModal" data-name="Preoday_-_Editing_your_menu"><?echo _("Editing your Menu")?></a></li>
							<li><a href="http://www.preoday.com/faq/" target="_blank"><? echo _("FAQs");?></a></li>
							<li><a href="<?echo $_SESSION['path']?>/support"><? echo _("Support");?></a></li>
						</ul>
					</li>
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
