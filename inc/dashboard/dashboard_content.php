<style> 
	@import '<?echo $_SESSION['path']?>/css/dashboard_override.css';
</style><!-- The dashboard looks slightly different than other pages -->

<div class="row dashContentTop">
	<div class="topSpacer"></div>
	<div class="large-12 columns">
		<h1><? echo _("Dashboard");?></h1>
	</div>
</div>

<div class="row row--space1u dashContent">
	<div class="large-8 columns">	
		<div class="large-6 columns dashStats">	
			<div class="row">
				<div class="large-12 columns">
					<h3><?echo _("This month");?></h3>
				</div>
			</div>
			<div class="row">
				<div class="large-12 columns">
					<h6><?echo _("Total revenue");?></h6>
					<h1>&pound; <?echo number_format($_SESSION['venue_report_totalRevenue'],2);?></h1>
				</div>
			</div>
			<div class="row">
				<div class="large-12 columns">
					<h6><?echo _("Total orders");?></h6>
					<h1><?echo number_format($_SESSION['venue_report_totalOrders'],0);?></h1>
				</div>
			</div>
			<div class="row">
				<div class="large-12 columns">
					<h6><?echo _("New users");?></h6>
					<h1><?echo number_format($_SESSION['venue_report_newUsers'],0);?></h1>
				</div>
			</div>
			<div class="row">
				<div class="large-12 columns">
					<h6><?echo _("Returning users");?></h6>
					<h1><?echo number_format($_SESSION['venue_report_returningUsers'],0);?></h1>
				</div>
			</div>
		</div>	
		<div class="large-6 columns">
			<div class="row">
				<div class="large-12 columns">
					<h3><?echo _("Edit");?></h3>
				</div>
			</div>		
			<div class="row">
				<div class="large-12 columns">
					<div class="accordion" data-options="one_up: false;" data-section="accordion">
						<section>
							<h3 data-section-title><?echo _("Menus");?></h3><img src="<?echo $_SESSION['path']?>/img/dashboard/menu_small.png"/>
							<div class="content" data-section-content>
								<?foreach($_SESSION['menus'] as $menu){?>
									<p id="p-<?echo $menu['id']?>">
										<a class="dashMenuIcon" 			href="<?echo $_SESSION['path']?>/menuSettings.php?id=<?echo $menu['id'];?>" title="<?echo _("Edit")." $menu[name]";?>"><i class="fi-pencil"></i></a>
										<a class="dashMenuIcon deleteMenu" 	id="dmi-<?echo $menu['id']?>"  title="<?echo _("Delete")." $menu[name]";?>"><i class="fi-x"></i></a> |
										<?echo $menu['name']?>
									</p>
								<?}?>
								<p><a href="<?echo $_SESSION['path']?>/newMenu.php"><?echo _("Add new menu");?></a></p>
								<p><a href="<?echo $_SESSION['path']?>/mealDealSettings.php"><?echo _("Meal Deals");?></a></p>
							</div>
						</section>
						<section>
							<h3 data-section-title><?echo _("Events");?></h3><img src="<?echo $_SESSION['path']?>/img/dashboard/events_small.png"/>
							<div class="content" data-section-content>
								<p><a href="<?echo $_SESSION['path']?>/eventSettings.php"><?echo _("Update events");?></a></p>
							</div>
						</section>
						<section>
							<h3 data-section-title><?echo _("Styling");?></h3><img class="topFix" src="<?echo $_SESSION['path']?>/img/dashboard/styling_small.png"/>
							<div class="content" data-section-content>
								<p><a href="<?echo $_SESSION['path']?>/appSettings1.php"><?echo _("Home screen");?></a></p>
								<p><a href="<?echo $_SESSION['path']?>/appSettings2.php"><?echo _("Inner screen");?></a></p>
							</div>
						</section>
						<section>
							<h3 data-section-title><?echo _("Settings");?></h3><img src="<?echo $_SESSION['path']?>/img/dashboard/settings_small.png"/>
							<div class="content" data-section-content>
								<p><a href="<?echo $_SESSION['path']?>/venueSettings.php"><?echo _("Venue settings");?></a></p>
								<p><a href="#" data-reveal-id="settingsM"><?echo _("Account settings");?></a></p>
								<p><a href="<?echo $_SESSION['path']?>/userSettings.php"><?echo _("Manage users");?></a></p>
								<?if($_SESSION['venue_eventFlag']){?>
									<p><a href="<?echo $_SESSION['path']?>/eventBasedSettings.php"><?echo _("Events, Collection Slots, Lead Times");?></a></p>
								<?}else{?>
								<p><a href="<?echo $_SESSION['path']?>/nonEventSettings.php"><?echo _("Hours, Collection Slots, Lead Times");?></a></p>
								<?}?>
							</div>
						</section>
						<section class="premiumSection">
							<h3 data-section-title><?echo _("Premium");?></h3><i class="icon-plus-sign"></i>
							<div class="content" data-section-content>
								<p><a href="<?echo $_SESSION['path']?>/outletSettings.php"><?echo _("Manage outlets");?></a></p>
								<p><a href="#"><?echo _("Find out more");?></a></p>
							</div>
						</section>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div id="iphone5" class="large-4 columns">
		<div class="phoneContainer">
			<div id="frame_iphone5" class="phone1">
				<img id="phoneWallpaper" src="<?echo $_SESSION['path']?>/img/wallpapers/wall<?if(isset($_SESSION['app_wallpaperId'])) echo $_SESSION['app_wallpaperId'];else echo "1";?>.jpg" />
				<img id="carrierIMG" src="<?echo $_SESSION['path']?>/img/wallpapers/carrier.png" />
				<img id="poweredIMG" src="<?echo $_SESSION['path']?>/img/wallpapers/powered.png" />
				<button type="button" class="tiny expand" id="buttonIMG"><?echo _('ORDER NOW');?></button>
				<p id="appHeading"><?if(isset($_SESSION['app_heading'])) echo $_SESSION['app_heading'];else echo _("Your heading goes here");?></p>
				<p id="venSubHeading"><?echo $_SESSION['venue_name'];?></p>
				<p id="subHeading"><?if(isset($_SESSION['app_subHeading'])) echo $_SESSION['app_subHeading'];else echo _("Your subheading goes here");?></p>
			</div>
			<div id="frame_iphone5" class="phone2 hide">
				<img id="phoneWallpaper" src="<?echo $_SESSION['path']?>/img/wallpapers/menuWall.jpg" />
				<button type="button" class="tiny expand" id="buttonIMG2"><?echo _('BASKET');?></button>
				<button type="button" class="tiny expand menuMultiButton"><i class="fi-plus"></i></button>
				<button type="button" class="tiny expand menuMultiButton mmb2"><i class="icon-plus"></i></button>
				<button type="button" class="tiny expand menuMultiButton mmb3"><i class="icon-plus"></i></button>
				<button type="button" class="tiny expand menuMultiButton mmb4"><i class="icon-plus"></i></button>
				<button type="button" class="tiny expand menuMultiButton mmb5"><i class="icon-plus"></i></button>
				<button type="button" class="tiny expand menuMultiButton mmb6"><i class="icon-plus"></i></button>
				<p id="venTitle"><?if(isset($_SESSION['app_title'])) echo $_SESSION['app_title'];else echo _("Venue Title");?></p>
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
<script type="text/javascript">
	$(document).ready(function() {
		<?if(isset($_SESSION['app_textColour'])){?>updateTextColour('<?echo $_SESSION['app_textColour']?>');<?}?>
		<?if(isset($_SESSION['app_buttonColour'])){?>updateButtonColour('<?echo $_SESSION['app_buttonColour']?>');<?}?>
		<?if(isset($_SESSION['app_buttonTextColour'])){?>updateButtonTextColour('<?echo $_SESSION['app_buttonTextColour']?>');<?}?>
		
		<?if(isset($_SESSION['app_logo']) && !empty($_SESSION['app_logo'])){?>
			content="<img src='<?echo $_SESSION['path']?>/img/logoUploads/<?echo $_SESSION['app_logo']?>'/>";
			$('#appHeading').html(content);
		<?}?>
		
		<?if(isset($_SESSION['app_button2Colour'])){?>updateButton2Colour('<?echo $_SESSION['app_button2Colour']?>');<?}?>
		<?if(isset($_SESSION['app_button2TextColour'])){?>updateButton2TextColour('<?echo $_SESSION['app_button2TextColour']?>');<?}?>
		
		<?if(isset($_SESSION['app_button3Colour'])){?>updateButton3Colour('<?echo $_SESSION['app_button3Colour']?>');<?}?>
		<?if(isset($_SESSION['app_button3TextColour'])){?>updateButton3TextColour('<?echo $_SESSION['app_button3TextColour']?>');<?}?>
	});
</script>