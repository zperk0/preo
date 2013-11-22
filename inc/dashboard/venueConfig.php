<div class="row">
	<div class="topSpacer"></div>
	<?if(isset($_SESSION['signupWizFlag']) && $_SESSION['signupWizFlag']){ ?>
	<nav class="breadcrumbs row--space1d">
		<a class="current"	   href="#"><? echo _("Venue Information");?></a>
		<?if(!$_SESSION['noAppFlag-1']){?>
			<a href="<?echo $_SESSION['path']?>/appSettings1.php"><? echo _("App Styling");?></a>
		<?}else{?>
			<a class="unavailable" href="#"><? echo _("App Styling");?></a>
		<?}?>
		<?if(!$_SESSION['noMenuFlag']){?>
			<a href="<?echo $_SESSION['path']?>/menuSettings.php"><? echo _("Menu Creation");?></a>
		<?}else{?>
			<a class="unavailable" href="#"><? echo _("Menu Creation");?></a>
		<?}?>
		<?if(!$_SESSION['noEHFlag']){?>
			<?if(isset($_SESSION['venue_eventFlag']) && $_SESSION['venue_eventFlag']){?><a href="<?echo $_SESSION['path']?>/eventSettings.php"><? echo _("Events");?></a>
			<?}else{?><a href="<?echo $_SESSION['path']?>/nonEventSettings.php"><? echo _("Opening Hours");?></a><?}?>
		<?}else{?>
			<?if(isset($_SESSION['venue_eventFlag']) && $_SESSION['venue_eventFlag']){?><a class="unavailable" href="#"><? echo _("Events");?></a>
			<?}else{?><a class="unavailable" href="#"><? echo _("Opening Hours");?></a><?}?>
		<?}?>
		
		<?if(!$_SESSION['noPaymentFlag']){?>
			<a href="<?echo $_SESSION['path']?>/paymentSettings.php"><? echo _("Payment Method");?></a>
		<?}else{?>
			<a class="unavailable" href="#"><? echo _("Add a Payment");?></a>
		<?}?>
		
		<a class="unavailable" href="#"><? echo _("Done");?></a>
	</nav>
	<?}?>
	<form id="venueConfigForm" method="POST" class="custom" data-abide>
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
					<input type="text" name="vName" id="vName" required tabindex=2 value="<?if(isset($_SESSION['venue_name'])) echo $_SESSION['venue_name'];?>">
					<small class="error"><?echo _("Please type a venue name");?></small>
				</div>
			</div>
			
			<div class="row">
				<div class="large-12 columns">
					<label><?echo _("Venue address");?></label>
					<input type="text" name="vAdd" id="vAdd" required tabindex=3 value="<?if(isset($_SESSION['venue_address'])) echo $_SESSION['venue_address'];?>">
					<input type="hidden" name="vCode" id="vCode" value="<?if(isset($_SESSION['venue_latitude']) && isset($_SESSION['venue_longitude']))  echo "(".$_SESSION['venue_latitude'].", ".$_SESSION['venue_longitude'].")"; else echo "(0, 0)";?>">
					<small class="error"><?echo _("Please type a venue address");?></small>
				</div>
			</div>
			
			<div class="row">
				<div class="large-12 columns">
					<label><?echo _("Venue description");?></label>
					<textarea name="vDesc" required tabindex=4><?if(isset($_SESSION['venue_desc'])) echo $_SESSION['venue_desc'];?></textarea>
					<small class="error"><?echo _("Please type a venue description");?></small>
				</div>
			</div>

			<div class="row">
				<div class="large-12 columns">
					<label><?echo _("What type of venue are you?");?></label>
					<select name="vCat" class="dropdown">
						<option value="1"	<?if(isset($_SESSION['venue_cat']) && $_SESSION['venue_cat']=='1')	{?>selected="selected"<?}?>><? echo _("Sports arena");?></option>
						<option value="2"	<?if(isset($_SESSION['venue_cat']) && $_SESSION['venue_cat']=='2')	{?>selected="selected"<?}?>><? echo _("Bars, pubs and clubs");?></option>
						<option value="3"	<?if(isset($_SESSION['venue_cat']) && $_SESSION['venue_cat']=='3')	{?>selected="selected"<?}?>><? echo _("Workplace catering");?></option>
						<option value="4"	<?if(isset($_SESSION['venue_cat']) && $_SESSION['venue_cat']=='4')	{?>selected="selected"<?}?>><? echo _("Retail catering");?></option>
						<option value="5" 	<?if(isset($_SESSION['venue_cat']) && $_SESSION['venue_cat']=='5')	{?>selected="selected"<?}?>><? echo _("Music and cultural");?></option>
					</select>
				</div>
			</div>
			
			<div class="row">
				<div class="large-12 columns">
					<label><?echo _("Are you an events based business?");?> &nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="Does your business revolve around regular events, eg. football matches, performances, etc?"></i></label>
					<div class="switch small large-2 columns eventFlagNoti"> 
						<input name="vEvent" value="0" type="radio" <?if((isset($_SESSION['venue_eventFlag']) && !$_SESSION['venue_eventFlag']) || !isset($_SESSION['venue_eventFlag'])){?>checked<?}?>>
						<label class="no"><?echo _("No");?></label>

						<input name="vEvent" value="1" type="radio" <?if(isset($_SESSION['venue_eventFlag']) && $_SESSION['venue_eventFlag']){?>checked<?}?>>
						<label class="yes"><?echo _("Yes");?></label>

						<span></span>
					</div>
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
<?if(!isset($_SESSION['venue_edit_on']) || !$_SESSION['venue_edit_on']){?>
<!-- Now we update progressBar tooltip, width and trigger mouseover -->
<script type="text/javascript">
$(document).ready(function() {
	$('.progressIndicator').css('width','100%');
	$('.progressIndicator').attr('title', "15% done, keep going!");
	setTimeout(function() { $('.progressIndicator').trigger("mouseover"); }, 1100);
	setTimeout(function() { $('.progressIndicator').trigger("mouseout"); }, 7500);
});
</script>
<?}?>