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
					<textarea name="vDesc" required tabindex=2></textarea>
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
					<button id="venueSave" type="submit" class="large button success radius" tabindex=4><?echo _("Save");?></button>
				</div>
			</div>
		</fieldset>
	</form>
</div>