<div class="row">
	<div class="topSpacer"></div>
	<div class="large-12 columns">
		<div class="row">
			<h1><?echo _("Style your app");?>&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("Gives you the opportunity to brand your menu pages and choose which colours you would like to have on your app.");?>"></i></h1>
			<div id="phonePreview">
				<form id="appConfig2Form" method="POST" data-abide>
					<div class="large-4 columns left">
						<div class="row">
							<div class="large-8 columns">
								<label class="left"><?echo _("Add your venue title");?></label>&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<? echo _("This is a shorter version of your venue name that will be visible over your menu.");?>"></i>
								<input type="text" name="vTitle" id="vTitle" placeholder="Type a name..." required tabindex=1 value="<?if(isset($_SESSION['app_title'])) echo $_SESSION['app_title']; else echo $_SESSION['venue_name'];?>">
								<small class="error"><?echo _("Please type a venue title");?></small>
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
										<h6 class="row--space0d">Colour one</h6>
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