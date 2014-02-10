<div class="row">
	<div class="topSpacer"></div>
	<div class="large-12 columns">
		<form id="moreForm" method="POST" data-abide>
			<div class="row">
				<h2 class="alignHeader"><? echo _("Find out more");?></h2>
				<div class="large-4 columns moreFormTopDiv">
					<select type="text" name="features[]" class="moreSelect" multiple required>
						<option value="ePOS Integration">ePOS Integration</option>
						<option value="Detailed reporting">Detailed reporting</option>
						<option value="Multiple menus">Multiple menus</option>
						<option value="Multiple outlets">Multiple outlets</option>
						<option value="Other">Other</option>
					</select>
					<small class="error moreSelectError"><?echo _("Please select at least one feature");?></small>
				</div>
			</div>
			<div class="row">
				<div class="large-12 columns">
					<label><?echo _("Describe your requirement. Include details like like the brand of ePOS you are using or the number of outlets you require.");?></label>
					<textarea class="moreTextArea" name="requirements" required></textarea>
					<small class="error"><?echo _("Please enter your requirement.");?></small>
				</div>
			</div>
			<br/>
			<div class="row">
				<div class="large-3 small-4 columns">
					<button type="submit" class="button" tabindex=6><?echo _("SEND");?></button>
				</div>
			</div>
		</form>
		<div id="thankyouArea" class="row hide">
			<h2><? echo _("Thank you for your request");?></h2>
			<h3><? echo _("We'll be in touch shortly.");?></h3>
		</div>
	</div>
</div>