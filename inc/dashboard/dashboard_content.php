<div class="row">
	<div class="large-6 columns small-centered large-centered">
		<h1><? echo _("Dashboard");?></h1>
		<label><? echo _("ID");?>: <?php echo $_SESSION['id']?></label>
		<label><? echo _("Name");?>: <?php echo $_SESSION['name']?></label>
		<label><? echo _("Email");?>: <?php echo $_SESSION['email']?></label>
		<label><? echo _("Business");?>: <?php if(isset($_SESSION['bName'])) echo $_SESSION['bName']; else echo "Scott hasn't sent me the Business name :(";?></label>
		<label><? echo _("Token");?>: <?php echo $_SESSION['token']?></label>
	</div>
</div>

<br/>
<br/>

<div class="row">
	<div class="large-12 columns small-centered large-centered" >
		<div class="section-container accordion" data-options="one_up: false;" data-section="accordion">
			<section>
				<p class="title" data-section-title><a href="#" onClick="resizeGMap();"><i class="fi-crown large"> </i>&nbsp;<? echo _("Venue Configuration");?></a></p>
				<div class="content" data-section-content>
					<div class="large-12 columns small-centered large-centered">
						<form id="venueConfigForm" method="POST" data-abide>
							<fieldset>
								<legend><?echo _("Tell us about your Venue");?></legend>
								<div class="row">
									<div class="large-12 columns">
										<label><?echo _("Venue Name");?></label>
										<input type="text" name="vName" placeholder="" required tabindex=1>
										<small class="error"><?echo _("A venue name is required.");?></small>
									</div>
								</div>
								
								<div class="row">
									<div class="large-12 columns">
										<label><?echo _("Description");?></label>
										<textarea required tabindex=2></textarea>
										<small class="error"><?echo _("A venue description address is required.");?></small>
									</div>
								</div>
								
								<div class="row">
									<div class="large-12 columns">
										<label><?echo _("Venue Address");?></label>
										<input type="text" class="noEnterSubmit" name="vAdd" id="vAdd" placeholder="" onFocus="clearMapInput();" required tabindex=3>
										<input type="hidden" required name="gCode" id="gCode">
										<small class="error"><?echo _("A venue address is required.");?></small>
									</div>
								</div>
								
								<div class="row">
									<div class="large-10 columns small-centered large-centered">
										<div id="map"></div>
									</div>
								</div>
								
								<br/>
								
								<div class="row">
									<div class="small-6 large-2 columns small-centered large-centered">
										<button type="submit" class="large button success radius" tabindex=3><?echo _("Save");?></button>
									</div>
								</div>
							</fieldset>
						</form>
					</div>
				</div>
			</section>
			<section>
				<p class="title" data-section-title><a href="#"><i class="fi-page-copy large"> </i>&nbsp;<? echo _("Menu Configuration");?></a></p>
				<div class="content" data-section-content>
					<p><? echo _("Blah blah");?></p>
				</div>
			</section><section>
				<p class="title" data-section-title><a href="#"><i class="fi-layout large"> </i>&nbsp;<? echo _("App Configuration");?></a></p>
				<div class="content" data-section-content>
					<p><? echo _("Blah blah");?></p>
				</div>
			</section>
		</div>
	</div>
</div>