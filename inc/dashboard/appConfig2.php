<div class="row">
	<div class="topSpacer"></div>
	<?if(isset($_SESSION['signupWizFlag']) && $_SESSION['signupWizFlag']){ ?>
	<nav class="breadcrumbs row--space1d">
		<a href="<?echo $_SESSION['path']?>/settings"><? echo _("Venue Information");?></a>
		<a href="<?echo $_SESSION['path']?>/homescreen"><? echo _("App Styling 1/2");?></a>
		<a class="current" href="#"><? echo _("App Styling 2/2");?></a>
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
			<h1 class="alignHeader"><?echo _("Style your app");?>&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("This is where you can brand your menu page");?>"></i></h1>
			<div id="phonePreview">
				<form id="appConfig2Form" method="POST" data-abide>
					<input type="hidden" id="redirectFlag" value="<?echo $redirectFlag;?>"/>
					<div class="large-4 columns left">
						<div class="row">
							<div class="large-8 columns">
								<label class="left"><?echo _("Add a short venue title");?></label>&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<? echo _("This is a shorter version of your venue name that will be visible over your menu.");?>"></i>
								<input type="text" name="vTitle" id="vTitle" placeholder="Type a name..." required tabindex=1 value="<?if(isset($_SESSION['app_title'])) echo $_SESSION['app_title']; else echo $_SESSION['venue_name'];?>" pattern="^.{0,22}$">
								<small class="error"><?echo _("Please type a venue title <br/>(max 22chars)");?></small>
							</div>
						</div>
					</div>
					
					<div id="iphone5" class="large-4 columns left">
						<div id="frame_iphone5">
							<img id="phoneWallpaper" src="<?echo $_SESSION['path']?>/img/wallpapers/menuWall.jpg" />
							<button type="button" class="tiny expand" id="buttonIMG2"><?echo _('BASKET');?></button>
							<button type="button" class="tiny expand menuMultiButton"><i class="fi-plus"></i></button>
							<button type="button" class="tiny expand menuMultiButton mmb2"><i class="icon-plus"></i></button>
							<button type="button" class="tiny expand menuMultiButton mmb3"><i class="icon-plus"></i></button>
							<button type="button" class="tiny expand menuMultiButton mmb4"><i class="icon-plus"></i></button>
							<button type="button" class="tiny expand menuMultiButton mmb5"><i class="icon-plus"></i></button>
							<button type="button" class="tiny expand menuMultiButton mmb6"><i class="icon-plus"></i></button>
							<p id="venTitle"><?echo $_SESSION['venue_name'];?></p>
						</div>
					</div>
				
					<div class="large-4 columns right">
						<div class="row">
							<div class="large-11 columns">
								<label class="row--space0-5"><?echo _("Colour scheme");?></label>
								<div class="row">
									<div class="large-11 columns">
										<h6 class="row--space0d"><?echo _("Colour one");?></h6>
										<p><?echo _("This colour is used across section progress buttons and as a highlight colour.");?></p>
									</div>
								</div>
								<div class="row">
									<div class="large-4 small-4 columns">
										<input value="<?if(isset($_SESSION['app_button2Colour'])) echo $_SESSION['app_button2Colour'];else echo "3AA2DC";?>" type="text" class="squareInput color {pickerClosable:false, pickerFaceColor:'transparent',pickerFace:3,pickerBorder:0,pickerInsetColor:'black',onImmediateChange:'updateButton2Colour(this);'}" id="button2Colour" name="button2Colour" />
									</div>
									<div class="large-7 small-7 columns">
										<label for="buttonColour" class="left inline colorLabel"><?echo _("Button one colour");?>&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("Enter Hex Colour Code or click to choose your colour.");?>"></i></label>
									</div>
								</div>
								<div class="row">
									<div class="large-4 small-4 columns">
										<input value="<?if(isset($_SESSION['app_button2TextColour'])) echo $_SESSION['app_button2TextColour'];else echo "FFFFFF";?>" type="text" class="squareInput color {pickerClosable:false, pickerFaceColor:'transparent',pickerFace:3,pickerBorder:0,pickerInsetColor:'black',onImmediateChange:'updateButton2TextColour(this);'}" id="button2TextColour" name="button2TextColour" />
									</div>
									<div class="large-7 small-7 columns">
										<label for="buttonTextColour" class="left inline colorLabel"><?echo _("Button text colour");?>&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("Enter Hex Colour Code or click to choose your colour.");?>"></i></label>
									</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="large-11 columns">
								<div class="row">
									<div class="large-11 columns">
										<h6 class="row--space0d">Colour two</h6>
										<p><?echo _("This colour is used across item select buttons and as a highlight colour.");?></p>
									</div>
								</div>
								<div class="row">
									<div class="large-4 small-4 columns">
										<input value="<?if(isset($_SESSION['app_button3Colour'])) echo $_SESSION['app_button3Colour'];else echo "2E70B7";?>" type="text" class="squareInput color {pickerClosable:false, pickerFaceColor:'transparent',pickerFace:3,pickerBorder:0,pickerInsetColor:'black',onImmediateChange:'updateButton3Colour(this);'}" id="button3Colour" name="button3Colour" />
									</div>
									<div class="large-7 small-7 columns">
										<label for="buttonColour" class="left inline colorLabel"><?echo _("Button two colour");?>&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("Enter Hex Colour Code or click to choose your colour.");?>"></i></label>
									</div>
								</div>
								<div class="row">
									<div class="large-4 small-4 columns">
										<input value="<?if(isset($_SESSION['app_button3TextColour'])) echo $_SESSION['app_button3TextColour'];else echo "FFFFFF";?>" type="text" class="squareInput color {pickerClosable:false, pickerFaceColor:'transparent',pickerFace:3,pickerBorder:0,pickerInsetColor:'black',onImmediateChange:'updateButton3TextColour(this);'}" id="button3TextColour" name="button3TextColour" />
									</div>
									<div class="large-7 small-7 columns">
										<label for="buttonTextColour" class="left inline colorLabel"><?echo _("Button text colour");?>&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("Enter Hex Colour Code or click to choose your colour.");?>"></i></label>
									</div>
								</div>
							</div>
						</div>
						<div class="row row--space6u">
							<div class="large-12 small-12 columns text-right small-centered">
								<button id="appConfig2Sub" class="preodayButton" type="submit" tabindex=2><?echo _("SAVE CHANGES");?></button>
								<button id="savingButton" class="hide secondary" type="button"><?echo _("SAVING...");?></button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>	
<?if((isset($_SESSION['signupWizFlag']) && $_SESSION['signupWizFlag'])){?>
<!-- Now we update progressBar tooltip, width and trigger mouseover -->
<script type="text/javascript">
$(document).ready(function() {
	$('.progressIndicator').css('width','180%');
	$('.progressIndicator').attr('title', "40% done, a couple more design touches...");
	setTimeout(function() { $('.progressIndicator').trigger("mouseover"); }, 1100);
	setTimeout(function() { $('.progressIndicator').trigger("mouseout"); }, 7500);
});
</script>
<?}?>