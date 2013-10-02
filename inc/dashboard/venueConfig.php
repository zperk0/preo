<div class="row">
	<div class="topSpacer"></div>
	<form id="venueConfigForm" method="POST" data-abide>
		<h1><?echo _("Tell us about your venue");?></h1>
		<div class="large-6 columns">
			<div class="row">
				<div class="large-9 small-9 columns">
					<label><?echo _("Venue lookup");?></label>
					<input type="text" class="noEnterSubmit" name="vSug" id="vSug" placeholder="Start typing a venue name..." tabindex=1>
				</div>
				<div class="large-3 small-3 columns">
					<label>&nbsp;</label>
					<button type="button" onClick="clearMapInput();">RESET</button>
				</div>
			</div>
			
			<div class="row">
				<div class="large-12 columns">
					<label><?echo _("Venue name");?></label>
					<input type="text" name="vName" id="vName" required tabindex=2>
					<small class="error"><?echo _("A venue name is required.");?></small>
				</div>
			</div>
			
			<div class="row">
				<div class="large-12 columns">
					<label><?echo _("Venue address");?></label>
					<input type="text" name="vAdd" id="vAdd" required tabindex=3>
					<input type="hidden" required name="vCode" id="vCode">
					<small class="error"><?echo _("A venue address is required.");?></small>
				</div>
			</div>
			
			<div class="row">
				<div class="large-12 columns">
					<label><?echo _("Venue description");?></label>
					<textarea name="vDesc" required tabindex=4></textarea>
					<small class="error"><?echo _("A venue description address is required.");?></small>
				</div>
			</div>
			
			<div class="row row--space1">
				<div class="small-12 large-2 columns">
					<button id="venueSave" type="submit" tabindex=5><?echo _("SAVE");?></button>
				</div>
			</div>
		</div>
		<div class="large-6 columns hide-for-small">
			<div class="row row--space1">
				<div id="map"></div>
			</div>
		</div>
	</form>
</div>

<!-- Now we update progressBar tooltip, width and trigger mouseover -->
<script>
$(document).ready(function() {
	$('.progressIndicator').css('width','100%');
	$('.progressIndicator').attr('title', "11% done, keep going!");
	setTimeout(function() { $('.progressIndicator').trigger("mouseover"); }, 1100);
});
</script>