<style> 
	@import '<?echo $_SESSION['path']?>/css/dashboard_override.css';
</style><!-- The dashboard looks slightly different than other pages -->
<?
//resetting global vars
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/global_vars.php'); 
?>
<div class="row dashContentTop">
	<div class="topSpacer"></div>
	<div class="large-12 columns">
		<h1><? echo _("Dashboard");?>&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("This is where you can monitor your takings and reports.");?>"></i></h1>
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
					<h3 class="cyappHead"><?echo _("Change your app");?></h3>
				</div>
			</div>		
			<div class="row">
				<div class="large-12 columns">
					<div class="accordion" data-options="one_up: false;" data-section="accordion">
						<section>
							<h3 data-section-title><?echo _("Venue Settings");?></h3><img src="<?echo $_SESSION['path']?>/img/dashboard/settings_small.png"/>
							<div class="content" data-section-content>
								<p><a href="<?echo $_SESSION['path']?>/venueSettings.php"><?echo _("Change settings");?></a></p>
								<?if(!$_SESSION['venue_eventFlag']){?>
									<p><a href="<?echo $_SESSION['path']?>/nonEventSettings.php"><?echo _("Opening Hours");?></a></p>
								<?}?>
								<p><a><?echo _("Your venue shortcode is")." <strong>".$_SESSION['venue_code']."</strong>";?>&nbsp;&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom noPad" title="<?echo _("This in the code you need to give to customers so they can type it into 'my order app' to get your branded app.");?>"></i></a></p>
							</div>
						</section>
						<section>
							<h3 data-section-title><?echo _("Styling");?></h3><img class="topFix" src="<?echo $_SESSION['path']?>/img/dashboard/styling_small.png"/>
							<div class="content" data-section-content>
								<p><a href="<?echo $_SESSION['path']?>/appSettings1.php"><?echo _("Home screen");?></a></p>
								<p><a href="<?echo $_SESSION['path']?>/appSettings2.php"><?echo _("Menu screen");?></a></p>
							</div>
						</section>
						<section>
							<h3 data-section-title><?echo _("Menus");?></h3><img src="<?echo $_SESSION['path']?>/img/dashboard/menu_small.png"/>
							<div class="content" data-section-content>
								<?foreach($_SESSION['menus'] as $menu){?>
									<p id="p-<?echo $menu['id']?>">
										<a class="dashMenuIcon" 			href="<?echo $_SESSION['path']?>/menuSettings.php?id=<?echo $menu['id'];?>" title="<?echo _("Edit")." $menu[name]";?>"><?echo $menu['name']?></a>
										<!--<a class="dashMenuIcon deleteMenu" 	id="dmi-<?echo $menu['id']?>"  title="<?echo _("Delete")." $menu[name]";?>"><i class="fi-x"></i></a>-->
									</p>
								<?}?>
								<!--<p><a href="<?echo $_SESSION['path']?>/newMenu.php"><?echo _("Add new menu");?></a></p>-->
								<!--<p><a href="<?echo $_SESSION['path']?>/mealDealSettings.php"><?echo _("Meal Deals");?></a></p>-->
							</div>
						</section>
						<?if($_SESSION['venue_eventFlag']){?>		
						<section>
							<h3 data-section-title><?echo _("Events");?></h3><img src="<?echo $_SESSION['path']?>/img/dashboard/events_small.png"/>
							<div class="content" data-section-content>
								<p><a href="<?echo $_SESSION['path']?>/eventSettings.php"><?echo _("Update events");?></a></p>
							</div>
						</section>
						<?}?>
						<section>
							<h3 data-section-title><?echo _("Advanced Settings");?></h3><img src="<?echo $_SESSION['path']?>/img/dashboard/settings_small.png"/>
							<div class="content" data-section-content>
								<p><a href="<?echo $_SESSION['path']?>/userSettings.php"><?echo _("Manage users");?></a></p>
								<p><a href="<?echo $_SESSION['path']?>/paymentSettings.php"><?echo _("Add a payment method");?></a></p>
								<?if(!$_SESSION['venue_liveFlag']){?><p><a href="<?echo $_SESSION['path']?>/finish.php"><?echo _("Publish My App");?></a></p>
								<?}else{?><p><a href="<?echo $_SESSION['path']?>/finish.php"><?echo _("Take My App Offline");?></a></p><?}?>
							</div>
						</section>
						<section class="premiumSection">
							<h3 data-section-title><?echo _("Premium Features");?></h3><i class="icon-plus-sign"></i>
							<div class="content" data-section-content>
								<!--<p><a href="<?echo $_SESSION['path']?>/outletSettings.php"><?echo _("Manage outlets");?></a></p>-->
								<p><a href="<?echo $_SESSION['path']?>/more.php"><?echo _("Find out more");?></a></p>
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
			  text: '<?echo _("Your app is now live!");?>'
			});
		<?
		}?>
		
		<?if(isset($_SESSION['appUnPublished']) && $_SESSION['appUnPublished']=='08C56E86512EAA9F108042253982AB4B7DD4F87BE8D66095D3655BB71F82123B'){
			$_SESSION['appUnPublished']=0;?>
			noty({
			  type: 'success',  layout: 'topCenter',
			  text: '<?echo _("Your app is now offline!");?>'
			});
		<?
		}?>
	});
</script>