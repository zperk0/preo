<?
	if(!isset($_SESSION['app_title'])) $_SESSION['app_title']=null;
	if(!isset($_SESSION['app_button2Colour'])) $_SESSION['app_button2Colour']=null;
	if(!isset($_SESSION['app_button3Colour'])) $_SESSION['app_button3Colour']=null;
	if(!isset($_SESSION['app_button2TextColour'])) $_SESSION['app_button2TextColour']=null;
	if(!isset($_SESSION['app_button3TextColour'])) $_SESSION['app_button3TextColour']=null;
?>
<div class="row">
	<div class="topSpacer"></div>
	<?if(isset($_SESSION['signupWizFlag']) && $_SESSION['signupWizFlag']){ ?>
	<nav class="breadcrumbs row--space1d">
		<a href="<?echo $_SESSION['path']?>/settings"><? echo _("Venue Information");?></a>
		<a class="current" href="#"><? echo _("App Styling 1/2");?></a>
		<?if(!$_SESSION['noAppFlag-2']){?>
			<a href="<?echo $_SESSION['path']?>/menuscreen"><? echo _("App Styling 2/2");?></a>
		<?}else{?>
			<a class="unavailable" href="#"><? echo _("App Styling 2/2");?></a>
		<?}?>
		<?if(!$_SESSION['noMenuFlag']){?>
			<a href="<?echo $_SESSION['path']?>/menus/<?echo $_SESSION['menus'][0]['id'];?>?r=1"><? echo _("Menu Creation");?></a>
		<?}else{?>
			<a class="unavailable" href="#"><? echo _("Menu Creation");?></a>
		<?}?>
		<?if(!$_SESSION['noEHFlag']){?>
			<?if(isset($_SESSION['venue_eventFlag']) && $_SESSION['venue_eventFlag']){?><a href="<?echo $_SESSION['path']?>/events?r=1"><? echo _("Events");?></a>
			<?}else{?><a href="<?echo $_SESSION['path']?>/openinghours?r=1"><? echo _("Opening Hours");?></a><?}?>
		<?}else{?>
			<?if(isset($_SESSION['venue_eventFlag']) && $_SESSION['venue_eventFlag']){?><a class="unavailable" href="#"><? echo _("Events");?></a>
			<?}else{?><a class="unavailable" href="#"><? echo _("Opening Hours");?></a><?}?>
		<?}?>
		
		<?if(!$_SESSION['noPaymentFlag']){?>
			<a href="<?echo $_SESSION['path']?>/payment"><? echo _("Payment Method");?></a>
		<?}else{?>
			<a class="unavailable" href="#"><? echo _("Add a Payment");?></a>
		<?}?>
		
		<a class="unavailable" href="#"><? echo _("Done");?></a>
	</nav>
	<?}?>
	<div class="large-12 columns">
		<div class="row">
			<h1><?echo _("Style your app");?>&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("This is the first screen that your customers will see.");?>"></i></h1>
			<div id="phonePreview">
				<form id="appConfigForm" method="POST" data-abide>
					<input type="hidden" id="redirectFlag" value="<?echo $redirectFlag;?>"/>
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
								  <li><a href="#"><? echo _("Don't miss the game! Order online and skip the half-time rush");?></a></li>
								  <li><a href="#"><? echo _("Order interval drinks before the show starts");?></a></li>
								  <li><a href="#"><? echo _("Stay with friends while the bar prepares your round");?></a></li>
								  <li><a href="#"><? echo _("Order your coffee and croissant from your table, or from the train.");?></a></li>
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
								  <li><a href="#"><?echo $_SESSION['venue_name'];?></a></li>
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
										<label for="textColour" class="left inline colorLabel"><?echo _("Text colour");?>&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("Enter Hex Colour Code or click to choose your colour.");?>"></i></label>
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
										<label for="buttonColour" class="left inline colorLabel"><?echo _("Button colour");?>&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("Enter Hex Colour Code or click to choose your colour.");?>"></i></label>
									</div>
								</div>
								<div class="row">
									<div class="large-4 small-4 columns">
										<input value="<?if(isset($_SESSION['app_buttonTextColour'])) echo $_SESSION['app_buttonTextColour'];else echo "FFFFFF";?>" type="text" class="squareInput color {pickerClosable:false, pickerFaceColor:'transparent',pickerFace:3,pickerBorder:0,pickerInsetColor:'black',onImmediateChange:'updateButtonTextColour(this);'}" id="buttonTextColour" name="buttonTextColour" />
									</div>
									<div class="large-7 small-7 columns">
										<label for="buttonTextColour" class="left inline colorLabel"><?echo _("Button text colour");?>&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("Enter Hex Colour Code or click to choose your colour.");?>"></i></label>
									</div>
								</div>
							</div>
						</div>
				
						<input type="hidden" id="wallPaperID" name="wallPaperID" value="<?if(isset($_SESSION['app_wallpaperId'])) echo $_SESSION['app_wallpaperId'];else echo "1";?>"/>
						<input type="hidden" id="picFileName" name="picFileName" value="<?if(isset($_SESSION['app_logo'])) echo $_SESSION['app_logo'];else echo "";?>"/>
					</div>
					<div id="iphone5" class="large-4 columns left">
						<div id="frame_iphone5">
							<img id="phoneWallpaper" src="<?echo $_SESSION['path']?>/img/wallpapers/wall_wa_<?if(isset($_SESSION['app_wallpaperId'])) echo $_SESSION['app_wallpaperId'];else echo "1";?>.jpg" />
							<img id="carrierIMG" src="<?echo $_SESSION['path']?>/img/wallpapers/carrier.png" />
							<img id="poweredIMG" src="<?echo $_SESSION['path']?>/img/wallpapers/powered.png" />
							<button type="button" class="tiny expand" id="buttonIMG"><?echo _('ORDER NOW');?></button>
							<p id="appHeading"><?echo _("Your heading goes here");?></p>
							<!--<p id="venSubHeading"><?echo $_SESSION['venue_name'];?></p>-->
							<p id="venSubHeading">&nbsp;</p>
							<p id="subHeading"><?echo _("Your subheading goes here");?></p>
						</div>
					</div>
				</form>
				
				<div class="large-4 columns right appstlyeright">
						<div class="row">
							<div class="large-12 columns">
								<label class="row--space0-5d appTop"><?echo _("Select a home-screen background");?></label>
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
						<div class="row thumbRow">
							<div class="large-4 small-4 columns">
								<a class="thumb <?if(isset($_SESSION['app_wallpaperId'])) { if($_SESSION['app_wallpaperId']=="4") echo "selected";}?>" id="thumb4">
									<img src="<?echo $_SESSION['path']?>/img/wallpapers/thumb4.jpg">
								</a>
							</div>
							<div class="large-4 small-4 columns">
								<a class="thumb <?if(isset($_SESSION['app_wallpaperId'])) { if($_SESSION['app_wallpaperId']=="5") echo "selected";}?>" id="thumb5">
									<img src="<?echo $_SESSION['path']?>/img/wallpapers/thumb5.jpg">
								</a>
							</div>
							<div class="large-4 small-4 columns customBGArea">
								<?php if(isset($_SESSION['app_wallpaperId']) && $_SESSION['app_wallpaperId']!="5" && $_SESSION['app_wallpaperId']!="4" && $_SESSION['app_wallpaperId']!="3" && $_SESSION['app_wallpaperId']!="2" && $_SESSION['app_wallpaperId']!="1" ) { ?>
								<a class="thumb selected" id="thumb<?echo $_SESSION['app_wallpaperId']?>">
									<img src="<?echo $_SESSION['path']?>/img/wallpapers/thumb<?echo $_SESSION['app_wallpaperId']?>.jpg">
								</a>
								<? } ?>
							</div>
						</div>
					<form id="bgUpForm" method="POST" enctype="multipart/form-data">	
						<div class="visibleUploadBG">
							<div class="row row--space1u row--space1d">
								<div class="large-12 small-12 columns">
									<button type="button" class="secondary small"><?echo _("UPLOAD YOUR OWN BACKGROUND");?></button>
								</div>
							</div>
						</div>
						<div class="hiddenUploadBG">
							<div class="row">
								<div class="large-12 small-12 columns">
									<label class="left row--space0-5d"><?echo _("Custom Background Upload");?></label>
								</div>
							</div>
							<div class="row row--space1">
								<div class="large-8 small-8 columns">
									<button id="doBGUp" type="button" class="small"><?echo _("UPLOAD");?></button>
									<button id="bgReset" type="button" class="small secondary"><?echo _("CANCEL");?></button>
									<input type="file" id="bgFile" name="bgFile" accept="image/jpeg" class="hide" />
									<p><?echo _("Supported types: JPG");?><br/><?echo _("Max file size: 10MB");?><br/><?echo _("Dimensions: 1080x1920");?></p>
								</div>
							</div>
						</div>
					</form>
					<form id="logoUpForm" method="POST" enctype="multipart/form-data">
						<div class="visibleUpload">
							<div class="row">
								<div class="large-12 small-12 columns">
									<button type="button" class="secondary small"><?echo _("UPLOAD YOUR OWN LOGO");?></button>
								</div>
							</div>
						</div>
						<div class="hiddenUpload">
							<div class="row">
								<div class="large-12 small-12 columns">
									<label class="left row--space0-5d"><?echo _("Logo Upload");?></label>&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("Note: This will replace your main heading.");?>"></i>
								</div>
							</div>
							<div class="row row--space1">
								<div class="large-8 small-8 columns">
									<button id="doLogoUp" type="button" class="small"><?echo _("UPLOAD");?></button>
									<button id="logoReset" type="button" class="small secondary"><?echo _("RESET");?></button>
									<input type="file" id="picFile" name="picFile" accept="image/png,image/jpeg" class="hide" />
									<p><?echo _("Supported types: JPG or PNG");?><br/><?echo _("Max file size: 10MB");?><br/><?echo _("Dimensions: 100x75");?></p>
								</div>
							</div>
						</div>
						
					</form>
					<div class="row row--space2u">
						<div class="large-12 small-12 columns text-right small-centered">
							<button id="appConfig1Sub" class="preodayButton" type="submit" tabindex=3><?echo _("SAVE CHANGES");?></button>
							<button id="savingButton" class="hide secondary" type="button"><?echo _("SAVING...");?></button>
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
	$('.progressIndicator').css('width','150%');
	$('.progressIndicator').attr('title', "30% done, time for the artistic bit...");
	setTimeout(function() { $('.progressIndicator').trigger("mouseover"); }, 1100);
	setTimeout(function() { $('.progressIndicator').trigger("mouseout"); }, 7500);
});
</script>
<?}?>