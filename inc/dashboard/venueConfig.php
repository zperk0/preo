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
		<input type="hidden" id="redirectFlag" value="<?echo $redirectFlag;?>"/>
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
					<label><?echo _("Venue description");?>&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("Please enter a short description about your venue.<br/><br/>This will not appear on your branded app.");?>"></i></label>
					<textarea name="vDesc" required tabindex=4><?if(isset($_SESSION['venue_desc'])) echo $_SESSION['venue_desc'];?></textarea>
					<small class="error"><?echo _("Please type a venue description");?></small>
				</div>
			</div>

			<div class="row">
				<div class="large-12 columns">
					<label><?echo _("What type of venue are you?");?></label>
					<select name="vCat" class="dropdown" tabindex=5>
						<option value="1"	<?if(isset($_SESSION['venue_cat']) && $_SESSION['venue_cat']=='1')	{?>selected="selected"<?}?>><? echo _("Sports Arena");?></option>
						<option value="2"	<?if(isset($_SESSION['venue_cat']) && $_SESSION['venue_cat']=='2')	{?>selected="selected"<?}?>><? echo _("Bars, Pubs and Clubs");?></option>
						<option value="3"	<?if(isset($_SESSION['venue_cat']) && $_SESSION['venue_cat']=='3')	{?>selected="selected"<?}?>><? echo _("Workplace/Education Catering");?></option>
						<option value="4"	<?if(isset($_SESSION['venue_cat']) && $_SESSION['venue_cat']=='4')	{?>selected="selected"<?}?>><? echo _("Retail Catering (Cafe, Sandwich Bar, Restaurant, etc)");?></option>
						<option value="5" 	<?if(isset($_SESSION['venue_cat']) && $_SESSION['venue_cat']=='5')	{?>selected="selected"<?}?>><? echo _("Music and Cultural");?></option>
					</select>
				</div>
			</div>
			
			<div class="row">
				<div class="large-12 columns">
					<label><?echo _("Are you primarily an events based business?");?> &nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<? echo _("Does your business revolve around regular events, eg. football matches, performances, etc?");?>"></i></label>
					<div class="switch small large-2 columns eventFlagNoti"> 
						<input name="vEvent" value="0" type="radio" <?if((isset($_SESSION['venue_eventFlag']) && !$_SESSION['venue_eventFlag']) || !isset($_SESSION['venue_eventFlag'])){?>checked<?}?>>
						<label class="no"><?echo _("No");?></label>

						<input name="vEvent" value="1" type="radio" <?if((isset($_SESSION['venue_eventFlag']) && $_SESSION['venue_eventFlag'])){?>checked<?}?>>
						<label class="yes"><?echo _("Yes");?></label>

						<span></span>
					</div>
				</div>
			</div>
			
			<div class="row cSlotDiv <?if((isset($_SESSION['venue_eventFlag']) && $_SESSION['venue_eventFlag'])){?>hide<?}?>">
				<div class="large-12 columns">
					<label><?echo _("Collection Slot Duration (mins)");?>&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("This is the number of minutes after opening time and before closing time when customers are allowed to collect orders.");?>"></i></label>
					<input type="text" name="cDuration" id="cDuration" tabindex=7 placeholder="<?echo _("eg: 30");?>" value="<?if(isset($_SESSION['venue_collectinterval'])) echo $_SESSION['venue_collectinterval'];?>">
					<small class="error"><?echo _("Please provide a duration in mins");?></small>
				</div>
			</div>
			
			<div class="row leadTimeDiv <?if((isset($_SESSION['venue_eventFlag']) && $_SESSION['venue_eventFlag'])){?>hide<?}?>">
				<div class="large-12 columns">
					<label><?echo _("Lead Time (mins)");?>&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("The time it takes to prepare your order before the customer can pick it up.");?>"></i></label>
					<input type="text" name="leadtime" id="leadtime" tabindex=8 placeholder="<?echo _("eg: 25");?>" value="<?if(isset($_SESSION['venue_leadtime'])) echo $_SESSION['venue_leadtime'];?>">
					<small class="error"><?echo _("Please provide a lead time");?></small>
				</div>
			</div>
			
			<div class="row row--space1">
				<div class="small-12 large-12 columns">
					<button id="venueSave" type="submit" tabindex=9><?echo _("SAVE CHANGES");?></button>
					<button id="savingButton" class="hide secondary" type="button"><?echo _("SAVING...");?></button>
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