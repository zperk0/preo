<div class="row">
	<div class="topSpacer"></div>
	<div class="large-12 columns">
		<div class="row">
			<h1><?echo _("APP2");?></h1>
			<div id="phonePreview">
				<form id="appConfigForm" method="POST" data-abide>
					<div class="large-4 columns left">
						<div class="row">
							<div class="large-11 columns">
								<label class="left"><?echo _("Create a main heading");?></label>
								<textarea name="aHeading" id="aHeading" placeholder="<?echo _("Your heading goes here");?>" required tabindex=1></textarea>
								<small class="error"><?echo _("A header is required.");?></small>
							</div>
						</div>
						<div class="row">
							<div class="large-11 columns">
								<label class="left"><?echo _("Create a subheading");?></label>
								<input type="text" name="aSubheading" id="aSubheading" placeholder="<?echo _("Subheading goes here");?>" required tabindex=2>
								<small class="error"><?echo _("A subheading is required.");?></small>
							</div>
						</div>
						
						<div class="row">
							<div class="large-11 columns">
								<div class="row">
									<div class="large-1 small-1 columns">
										<input type="text" class="squareInput color {pickerClosable:false, pickerFaceColor:'transparent',pickerFace:3,pickerBorder:0,pickerInsetColor:'black',onImmediateChange:'updateTextColour(this);'}" id="textColour" name="textColour" readonly/>
									</div>
									<div class="large-10 small-10 columns">
										<label for="textColour" class="left inline colorLabel"><?echo _("Choose text colour");?></label>
									</div>
								</div>
							</div>
						</div>
						
						<div class="row">
							<div class="large-11 columns">
								<label class="row--space0-5"><?echo _("ORDER NOW button");?></label>
								<div class="row">
									<div class="large-1 small-1 columns">
										<input value="3AA2DC" type="text" class="squareInput color {pickerClosable:false, pickerFaceColor:'transparent',pickerFace:3,pickerBorder:0,pickerInsetColor:'black',onImmediateChange:'updateButtonColour(this);'}" id="buttonColour" name="buttonColour" readonly/>
									</div>
									<div class="large-10 small-10 columns">
										<label for="buttonColour" class="left inline colorLabel"><?echo _("Choose button colour");?></label>
									</div>
								</div>
								<div class="row">
									<div class="large-1 small-1 columns">
										<input type="text" class="squareInput color {pickerClosable:false, pickerFaceColor:'transparent',pickerFace:3,pickerBorder:0,pickerInsetColor:'black',onImmediateChange:'updateButtonTextColour(this);'}" id="buttonTextColour" name="buttonTextColour" readonly/>
									</div>
									<div class="large-10 small-10 columns">
										<label for="buttonTextColour" class="left inline colorLabel"><?echo _("Choose text colour");?></label>
									</div>
								</div>
							</div>
						</div>
				
						<input type="hidden" id="wallPaperID" name="wallPaperID" value="1"/>
						<input type="hidden" id="picFileName" name="picFileName" value=""/>
					</div>
					<div id="iphone5" class="large-4 columns left">
						<div id="frame_iphone5">
							<img id="phoneWallpaper" src="/img/wallpapers/wall1.jpg" />
							<img id="carrierIMG" src="/img/wallpapers/carrier.png" />
							<img id="poweredIMG" src="/img/wallpapers/powered.png" />
							<button type="button" class="tiny expand" id="buttonIMG"><?echo _('ORDER NOW');?></button>
							<p id="appHeading"><?echo _("Your heading goes here");?></p>
							<p id="venSubHeading"><?echo $_SESSION['venue_name'];?></p>
							<p id="subHeading"><?echo _("Subheading goes here");?></p>
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
								<a class="thumb selected" id="thumb1">
									<img src="/img/wallpapers/thumb1.jpg">
								</a>
							</div>
							<div class="large-4 small-4 columns">
								<a class="thumb" id="thumb2">
									<img src="/img/wallpapers/thumb2.jpg">
								</a>
							</div>
							<div class="large-4 small-4 columns">
								<a class="thumb" id="thumb3">
									<img src="/img/wallpapers/thumb3.jpg">
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
									<label class="left"><?echo _("Logo Upload");?></label>
									<input type="file" id="picFile" name="picFile" accept="image/png,image/jpeg" class="" />
									<small class="left"><?echo _("Supported types: JPG, PNG. Max filesize: 10MB.");?></small>
									<small class="left"><?echo _("Note: This will replace your main heading.");?></small>
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
							<button id="appConfigButton" class="preodayButton" type="submit" tabindex=3><?echo _("SAVE");?></button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>	

<!-- Now we update progressBar tooltip, width and trigger mouseover -->
<script>
$(document).ready(function() {
	$('.progressIndicator').css('width','130%');
	$('.progressIndicator').attr('title', "26% done, time for the artistic bit...");
	setTimeout(function() { $('.progressIndicator').trigger("mouseover"); }, 1100);
});
</script>