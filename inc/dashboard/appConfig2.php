<div class="row">
	<div class="topSpacer"></div>
	<div class="large-12 columns">
		<div class="row">
			<h1><?echo _("Style your app");?></h1>
			<div id="phonePreview">
				<form id="appConfig2Form" method="POST" data-abide>
					<div class="large-4 columns left">
						<div class="row">
							<div class="large-11 columns">
								<label class="left"><?echo _("Add your venue title");?></label>&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="This is a shorter version of your venue name that will be visible over your menu."></i>
								<input type="text" name="vTitle" id="vTitle" placeholder="Type a name..." required tabindex=1>
								<small class="error"><?echo _("Please type a venue title");?></small>
							</div>
						</div>
					</div>
					
					<div id="iphone5" class="large-4 columns left">
						<div id="frame_iphone5">
							<img id="phoneWallpaper" src="/img/wallpapers/menuWall.jpg" />
							<button type="button" class="tiny expand" id="buttonIMG2"><?echo _('BASKET');?></button>
							<button type="button" class="tiny expand menuMultiButton"><i class="fi-plus"></i></button>
							<button type="button" class="tiny expand menuMultiButton mmb2"><i class="icon-plus"></i></button>
							<button type="button" class="tiny expand menuMultiButton mmb3"><i class="icon-plus"></i></button>
							<button type="button" class="tiny expand menuMultiButton mmb4"><i class="icon-plus"></i></button>
							<button type="button" class="tiny expand menuMultiButton mmb5"><i class="icon-plus"></i></button>
							<button type="button" class="tiny expand menuMultiButton mmb6"><i class="icon-plus"></i></button>
							<p id="venTitle"><?echo _("Venue Title");?></p>
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
									<div class="large-1 small-1 columns">
										<input value="3AA2DC" type="text" class="squareInput color {pickerClosable:false, pickerFaceColor:'transparent',pickerFace:3,pickerBorder:0,pickerInsetColor:'black',onImmediateChange:'updateButton2Colour(this);'}" id="button2Colour" name="button2Colour" readonly/>
									</div>
									<div class="large-10 small-10 columns">
										<label for="buttonColour" class="left inline colorLabel"><?echo _("Choose colour one");?></label>
									</div>
								</div>
								<div class="row">
									<div class="large-1 small-1 columns">
										<input value="FFFFFF" type="text" class="squareInput color {pickerClosable:false, pickerFaceColor:'transparent',pickerFace:3,pickerBorder:0,pickerInsetColor:'black',onImmediateChange:'updateButton2TextColour(this);'}" id="button2TextColour" name="button2TextColour" readonly/>
									</div>
									<div class="large-10 small-10 columns">
										<label for="buttonTextColour" class="left inline colorLabel"><?echo _("Choose text colour");?></label>
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
									<div class="large-1 small-1 columns">
										<input value="2E70B7" type="text" class="squareInput color {pickerClosable:false, pickerFaceColor:'transparent',pickerFace:3,pickerBorder:0,pickerInsetColor:'black',onImmediateChange:'updateButton3Colour(this);'}" id="button3Colour" name="button3Colour" readonly/>
									</div>
									<div class="large-10 small-10 columns">
										<label for="buttonColour" class="left inline colorLabel"><?echo _("Choose colour two");?></label>
									</div>
								</div>
								<div class="row">
									<div class="large-1 small-1 columns">
										<input value="FFFFFF" type="text" class="squareInput color {pickerClosable:false, pickerFaceColor:'transparent',pickerFace:3,pickerBorder:0,pickerInsetColor:'black',onImmediateChange:'updateButton3TextColour(this);'}" id="button3TextColour" name="button3TextColour" readonly/>
									</div>
									<div class="large-10 small-10 columns">
										<label for="buttonTextColour" class="left inline colorLabel"><?echo _("Choose text colour");?></label>
									</div>
								</div>
							</div>
						</div>
						<div class="row row--space6u">
							<div class="large-12 small-12 columns text-right small-centered">
								<button id="appConfig2Sub" class="preodayButton" type="submit" tabindex=2><?echo _("SAVE");?></button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>	

<!-- Now we update progressBar tooltip, width and trigger mouseover -->
<script>
$(document).ready(function() {
	$('.progressIndicator').css('width','180%');
	$('.progressIndicator').attr('title', "35% done, even more artistic stuff...");
	setTimeout(function() { $('.progressIndicator').trigger("mouseover"); }, 1100);
});
</script>