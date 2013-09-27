<div id="phonePreview" class="text-center">
	<fieldset>
		<legend><?echo _("Customize your App");?></legend>
		<form id="appConfigForm" method="POST" data-abide>
			<div class="large-6 columns">
				<div class="row">
					<div class="large-12 columns">
						<label class="left"><?echo _("Main Heading");?></label>
						<input type="text" name="aHeading" id="aHeading" placeholder="<?echo _("Your heading goes here");?>" required tabindex=1>
						<small class="error"><?echo _("A header is required.");?></small>
					</div>
				</div>
				<div class="row">
					<div class="large-12 columns">
						<label class="left"><?echo _("Subheading");?></label>
						<input type="text" name="aSubheading" id="aSubheading" placeholder="<?echo _("Subheading goes here");?>" required tabindex=2>
						<small class="error"><?echo _("A subheading is required.");?></small>
					</div>
				</div>
				<br/>
				<div class="row">
					<div class="large-4 columns">
						<label><?echo _("Thumbnail 1");?></label>
						<a class="th radius" id="thumb1">
							<img src="/img/wallpapers/thumb1.jpg">
						</a>
					</div>
					<div class="large-4 columns">
						<label><?echo _("Thumbnail 2");?></label>
						<a class="th radius" id="thumb2">
							<img src="/img/wallpapers/thumb2.jpg">
						</a>
					</div>
					<div class="large-4 columns">
						<label><?echo _("Thumbnail 3");?></label>
						<a class="th radius" id="thumb3">
							<img src="/img/wallpapers/thumb3.jpg">
						</a>
					</div>
				</div>
				<br/>
				<div class="row">
					<div class="large-4 columns">
						<label><?echo _("Thumbnail 4");?></label>
						<a class="th radius" id="thumb4">
							<img src="/img/wallpapers/thumb4.jpg">
						</a>
					</div>
					<div class="large-4 columns ">
						<label><?echo _("Thumbnail 5");?></label>
						<a class="th radius" id="thumb5">
							<img src="/img/wallpapers/thumb5.jpg">
						</a>
					</div>
					<div class="large-4 columns">
						<label><?echo _("Thumbnail 6");?></label>
						<a class="th radius" id="thumb6">
							<img src="/img/wallpapers/thumb6.jpg">
						</a>
					</div>
				</div>
				<br/>
				<input type="hidden" id="wallPaperID" name="wallPaperID" value="1"/>
				<input type="hidden" id="picFileName" name="picFileName" value=""/>
				<br/>
				<div class="row">
					<div class="large-4 columns ">
						<label><?echo _("Text Colour");?></label>
						<input type="text" class="color {pickerFaceColor:'transparent',pickerFace:3,pickerBorder:0,pickerInsetColor:'black',onImmediateChange:'updateTextColour(this);'}" id="colour1" name="colour1"/>
					</div>
					<div class="large-4 columns">
						<label><?echo _("Button Colour");?></label>
						<input type="text" class="color {pickerFaceColor:'transparent',pickerFace:3,pickerBorder:0,pickerInsetColor:'black',onImmediateChange:'updateButtonColour(this);'}" id="colour2" name="colour2"/>
					</div>
					<div class="large-4 columns">
						<label><?echo _("Button Text Colour");?></label>
						<input type="text" class="color {pickerFaceColor:'transparent',pickerFace:3,pickerBorder:0,pickerInsetColor:'black',onImmediateChange:'updateButtonTextColour(this);'}" id="colour3" name="colour3"/>
					</div>
				</div>
			</div>
			<div id="iphone5" class="large-6 columns">
				<div id="frame_iphone5">
					<img id="phoneWallpaper" src="/img/wallpapers/wall1.jpg" />
					<img id="carrierIMG" src="/img/wallpapers/carrier.png" />
					<img id="poweredIMG" src="/img/wallpapers/powered.png" />
					<button type="button" class="tiny expand" id="buttonIMG"><?echo _('ORDER NOW');?></button>
					<p id="appHeading"><?echo _("Your heading goes here");?></p>
					<p id="subHeading"><?echo _("Subheading goes here");?></p>
				</div>
			</div>
		</form>
		
		<div class="large-6 columns">
			<br/>
			<br/>
			<form id="logoUpForm" method="POST" enctype="multipart/form-data">
				<div class="row">
					<div class="large-9 small-9 columns">
						<label class="left"><?echo _("Logo Upload");?></label>
						<input type="file" id="picFile" name="picFile" accept="image/png,image/jpeg" class="" />
						<small class="left"><?echo _("Supported types: JPG, PNG. Max filesize: 10MB.");?></small>
						<small class="left"><?echo _("Note: This will replace your main heading.");?></small>
					</div>
					<div class="large-3 small-3 columns">
						<label class="left">&nbsp;</label>
						<span id="doLogoUp" class="button small expand"><?echo _("Upload");?></span>
					</div>
				</div>
			</form>
		</div>	
		<div class="large-12 columns">
			<div class="row">
				<br/>
				<br/>
				<div class="small-12 large-4 columns small-centered large-centered">
					<button id="appConfigButton" type="submit" class="large success radius" tabindex=2><?echo _("Save App Settings");?></button>
				</div>
			</div>
		</div>
	</fieldset>
</div>