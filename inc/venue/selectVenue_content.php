<div class="row">
	<div class="topSpacer"></div>
	<div class="large-12 columns" id="finishForm">
		<h1><? echo _("Select venue");?></h1>
		<form id="selectVenueForm" method="POST" data-userid="<?php echo $_SESSION['user_id'] ?>" data-abide>
			<p>
				<select name="venueId" class="eventField noEnterSubmit inline venueSingleSelect selectCollectionSlot hide"/>
					<?php
					foreach ($venues as $Venue) {
					?>
					<option value="<?php echo $Venue['id'] ?>" <?php echo isset($_SESSION['venue_id']) && $_SESSION['venue_id'] == $Venue['id'] ? 'selected="selected"' : null ?>><?php echo $Venue['name']; ?></option>
					<?php } ?>
				</select>
				<small class="error"><?echo _("Please choose a venue.");?></small>
			</p>

			<div class="row">
				<div class="small-12 large-4 columns">
					<button id="venueSubButton" type="submit"><?echo _("SAVE CHANGES");?></button>
					<button id="savingButton" class="hide secondary" type="button"><?echo _("SAVING...");?></button>
				</div>
			</div>
		</form>
	</div>
</div>
