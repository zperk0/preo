<div class="row">
	<div class="topSpacer"></div>
	<?if(isset($_SESSION['signupWizFlag']) && $_SESSION['signupWizFlag']){ ?>
	<nav class="breadcrumbs row--space1d">
		<a href="<?echo $_SESSION['path']?>/venueSettings.php"><? echo _("Venue Information");?></a>
		<a class="current" href="#"><? echo _("App Styling 1/2");?></a>
		<?if(!$_SESSION['noMenuFlag']){?>
			<a href="<?echo $_SESSION['path']?>/menuSettings.php"><? echo _("Menu Creation");?></a>
		<?}else{?>
			<a class="unavailable" href="#"><? echo _("Menu Creation");?></a>
		<?}?>
	</nav>
	<?}?>
	<div class="large-12 columns">
		<div class="row">
			<h1><?echo _("Style your app");?></h1>
			<div id="phonePreview">
				<form id="appConfigForm" method="POST" data-abide>
					<div class="large-4 columns left">
						<div class="row">
							<div class="large-11 columns">
								<label class="left"><?echo _("Create a main heading");?></label>
								<a href="#" data-dropdown="sugDrop" class="button dropdown secondary sugDropButton"><?echo _("Choose one here");?></a>
								<ul id="sugDrop" class="f-dropdown" data-dropdown-content>
								  <li><a href="#"><? echo _("Leave the 4 deep queue to everyone else and pre-order.");?></a></li>
								  <li><a href="#"><? echo _("Don't miss the game, jump the long queue and pre-order.");?></a></li>
								  <li><a href="#"><? echo _("Intermission pre-order.");?></a></li>
								  <li><a href="#"><? echo _("A sparkling fruity alternative to queuing.");?></a></li>
								  <li><a href="#"><? echo _("Go on, jump the crazy queue and pre-order.");?></a></li>
								</ul>
								<textarea name="aHeading" id="aHeading" placeholder="<?echo _("or create your own...");?>" required tabindex=1><?if(isset($_SESSION['app_heading'])) echo $_SESSION['app_heading'];?></textarea>
								<small class="error"><?echo _("Please create a headline message");?></small>
							</div>
						</div>
						<div class="row">
							<div class="large-11 columns">
								<label class="left"><?echo _("Create a subheading");?></label>
								<a href="#" data-dropdown="sugDrop2" class="button dropdown secondary sugDropButton"><?echo _("Choose one here");?></a>
								<ul id="sugDrop2" class="f-dropdown" data-dropdown-content>
								  <li><a href="#"><? echo _("Pre-order food and drinks");?></a></li>
								  <li><a href="#"><? echo _("Pre-order drinks+food");?></a></li>
								</ul>
								<input type="text" name="aSubheading" id="aSubheading" placeholder="<?echo _("or create your own...");?>" required tabindex=2 value="<?if(isset($_SESSION['app_subHeading'])) echo $_SESSION['app_subHeading'];?>">
								<small class="error"><?echo _("Please create a sub-heading");?></small>
							</div>
						</div>
						
						<div class="row">
							<div class="large-11 columns">
								<div class="row">
									<div class="large-4 small-4 columns">
										<input value="<?if(isset($_SESSION['app_textColour'])) echo $_SESSION['app_textColour'];else echo "FFFFFF";?>" type="text" id="textColour" name="textColour" class="squareInput color {pickerClosable:false, pickerFaceColor:'transparent',pickerFace:3,pickerBorder:0,pickerInsetColor:'black',onImmediateChange:'updateTextColour(this);'}"/>
									</div>
									<div class="large-7 small-7 columns">
										<label for="textColour" class="left inline colorLabel"><?echo _("Choose text colour");?></label>
									</div>
								</div>
							</div>
						</div>
						
						<div class="row">
							<div class="large-11 columns">
								<label class="row--space0-5"><?echo _("ORDER NOW button");?></label>
								<div class="row">
									<div class="large-4 small-4 columns">
										<input value="<?if(isset($_SESSION['app_buttonColour'])) echo $_SESSION['app_buttonColour'];else echo "3AA2DC";?>" type="text" class="squareInput color {pickerClosable:false, pickerFaceColor:'transparent',pickerFace:3,pickerBorder:0,pickerInsetColor:'black',onImmediateChange:'updateButtonColour(this);'}" id="buttonColour" name="buttonColour" />
									</div>
									<div class="large-7 small-7 columns">
										<label for="buttonColour" class="left inline colorLabel"><?echo _("Choose button colour");?></label>
									</div>
								</div>
								<div class="row">
									<div class="large-4 small-4 columns">
										<input value="<?if(isset($_SESSION['app_buttonTextColour'])) echo $_SESSION['app_buttonTextColour'];else echo "FFFFFF";?>" type="text" class="squareInput color {pickerClosable:false, pickerFaceColor:'transparent',pickerFace:3,pickerBorder:0,pickerInsetColor:'black',onImmediateChange:'updateButtonTextColour(this);'}" id="buttonTextColour" name="buttonTextColour" />
									</div>
									<div class="large-7 small-7 columns">
										<label for="buttonTextColour" class="left inline colorLabel"><?echo _("Choose text colour");?></label>
									</div>
								</div>
							</div>
						</div>
				
						<input type="hidden" id="wallPaperID" name="wallPaperID" value="<?if(isset($_SESSION['app_wallpaperId'])) echo $_SESSION['app_wallpaperId'];else echo "1";?>"/>
						<input type="hidden" id="picFileName" name="picFileName" value="<?if(isset($_SESSION['app_logo'])) echo $_SESSION['app_logo'];else echo "";?>"/>
					</div>
					<div id="iphone5" class="large-4 columns left">
						<div id="frame_iphone5">
							<img id="phoneWallpaper" src="<?echo $_SESSION['path']?>/img/wallpapers/wall<?if(isset($_SESSION['app_wallpaperId'])) echo $_SESSION['app_wallpaperId'];else echo "1";?>.jpg" />
							<img id="carrierIMG" src="<?echo $_SESSION['path']?>/img/wallpapers/carrier.png" />
							<img id="poweredIMG" src="<?echo $_SESSION['path']?>/img/wallpapers/powered.png" />
							<button type="button" class="tiny expand" id="buttonIMG"><?echo _('ORDER NOW');?></button>
							<p id="appHeading"><?echo _("Your heading goes here");?></p>
							<p id="venSubHeading"><?echo $_SESSION['venue_name'];?></p>
							<p id="subHeading"><?echo _("Your subheading goes here");?></p>
						</div>
					</div>
				</form>
				
				<div class="large-4 columns right">
					<form id="logoUpForm" method="POST" enctype="multipart/form-data">
						<div class="row">
							<div class="large-12 columns">
								<label class="row--space0-5d"><?echo _("Select a home-screen background");?></label>
							</div>
						</div>
						<div class="row thumbRow">
							<div class="large-4 small-4 columns">
								<a class="thumb <?if(isset($_SESSION['app_wallpaperId'])) { if($_SESSION['app_wallpaperId']=="1") echo "selected";} else echo "selected";?>" id="thumb1">
									<img src="<?echo $_SESSION['path']?>/img/wallpapers/thumb1.jpg">
								</a>
							</div>
							<div class="large-4 small-4 columns">
								<a class="thumb <?if(isset($_SESSION['app_wallpaperId'])) { if($_SESSION['app_wallpaperId']=="2") echo "selected";}?>" id="thumb2">
									<img src="<?echo $_SESSION['path']?>/img/wallpapers/thumb2.jpg">
								</a>
							</div>
							<div class="large-4 small-4 columns">
								<a class="thumb <?if(isset($_SESSION['app_wallpaperId'])) { if($_SESSION['app_wallpaperId']=="3") echo "selected";}?>" id="thumb3">
									<img src="<?echo $_SESSION['path']?>/img/wallpapers/thumb3.jpg">
								</a>
							</div>
						</div>
						<div class="visibleUpload">
							<div class="row row--space2u row--space1d">
								<div class="large-12 small-12 columns">
									<button type="button" class="secondary small"><?echo _("UPLOAD YOUR OWN LOGO");?></button>
								</div>
							</div>
						</div>
						<div class="hiddenUpload">
							<div class="row row--space2u row--space1d">
								<div class="large-12 small-12 columns">
									<label class="left row--space0-5d"><?echo _("Logo Upload");?></label>&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="Note: This will replace your main heading."></i>
									<input type="file" id="picFile" name="picFile" accept="image/png,image/jpeg" class="" />
									<p><?echo _("Supported types: JPG or PNG");?><br/><?echo _("Max file size: 10MB");?></p>
								</div>
							</div>
							<div class="row row--space1">
								<div class="large-8 small-8 columns">
									<button id="doLogoUp" type="button" class="small"><?echo _("UPLOAD");?></button>
									<button id="logoReset" type="button" class="small secondary"><?echo _("RESET");?></button>
								</div>
							</div>
						</div>
					</form>
					<div class="row row--space6u">
						<div class="large-12 small-12 columns text-right small-centered">
							<button id="appConfig1Sub" class="preodayButton" type="submit" tabindex=3><?echo _("SAVE");?></button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>	
<?if(!isset($_SESSION['app1_edit_on']) || !$_SESSION['app1_edit_on']){?>
<!-- Now we update progressBar tooltip, width and trigger mouseover -->
<script type="text/javascript">
$(document).ready(function() {
	$('.progressIndicator').css('width','130%');
	$('.progressIndicator').attr('title', "26% done, time for the artistic bit...");
	setTimeout(function() { $('.progressIndicator').trigger("mouseover"); }, 1100);
	setTimeout(function() { $('.progressIndicator').trigger("mouseout"); }, 7500);
});
</script>
<?}?>