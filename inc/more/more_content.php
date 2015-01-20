<div class="row">
	<div class="topSpacer"></div>
	<div class="large-12 columns">
		<form id="moreForm" method="POST" data-abide>
			<div class="row">
				<h2 class="alignHeader"><? echo _("Support");?></h2>
			</div>
			<div class="row">
				<div class="large-12 columns">
					<label><?echo _("If you're stuck let us know what the problem is and a member of our support team will be in touch shortly");?></label>
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