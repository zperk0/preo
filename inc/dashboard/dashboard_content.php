<style> 
	@import '<?echo $_SESSION['path']?>/css/dashboard_override.css';
</style><!-- The dashboard looks slightly different than other pages -->

<div class="row dashContentTop">
	<div class="topSpacer"></div>
	<div class="large-12 columns">
		<h1><? echo _("Dashboard");?></h1>
		<!--<p>Now we can give accordion-style links to Add Events, Add Payments, Edit settings. Once everything required is done (and account activated) then the link to publish appears.</p>-->
	</div>
</div>

<div class="row row--space1u dashContent">
	<div class="large-2 columns">
		<img src="<?echo $_SESSION['path']?>/img/dashboard/menu.png"/>
		<h3><?echo _("Menu");?></h3>
		<p><a href="<?echo $_SESSION['path']?>/menuSettings.php"><?echo _("Update menu");?></a></p>
	</div>
	<div class="large-2 columns">
		<img src="<?echo $_SESSION['path']?>/img/dashboard/events.png"/>
		<h3><?echo _("Events");?></h3>
		<p><a href=""><?echo _("Update events");?></a></p>
	</div>
	<div class="large-2 columns">
		<img src="<?echo $_SESSION['path']?>/img/dashboard/settings.png"/>
		<h3><?echo _("Settings");?></h3>
		<p><a href="<?echo $_SESSION['path']?>/venueSettings.php"><?echo _("Venue settings");?></a></p>
		<p><a href="#" data-reveal-id="settingsM"><?echo _("Account settings");?></a></p>
		<p><a href=""><?echo _("Manage users");?></a></p>
	</div>
	<div class="large-2 columns">
		<img src="<?echo $_SESSION['path']?>/img/dashboard/styling.png"/>
		<h3><?echo _("Styling");?></h3>
		<p><a href="<?echo $_SESSION['path']?>/appSettings1.php"><?echo _("Home screen");?></a></p>
		<p><a href="<?echo $_SESSION['path']?>/appSettings2.php"><?echo _("Inner screen");?></a></p>
	</div>
	<div id="iphone5" class="large-4 columns right">
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
			<i class="icon-circle"></i><a href="#" class="showNextPhone"><i class="icon-circle-blank"></i></a>
		</div>
		<div class="pagerRow phone2pager hide">
			<a href="#" class="showNextPhone"><i class="icon-circle-blank"></i></a><i class="icon-circle"></i>
		</div>
	</div>
</div>

<div class="row">
	<div class="large-4 columns premiumDiv">
		<h3><?echo _("Premium features");?></h3>
		<p>Add premium features to your app, from bespoke home screen backgrounds to multiple menus...</p>
		<button type="button" class="success small"><?echo _("FIND OUT MORE");?></button>
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