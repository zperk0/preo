<?if(!isset($_SESSION['venue_netimes_edit_on'])) $_SESSION['venue_netimes_edit_on']=0;?>
<div class="row">
	<div class="topSpacer"></div>
	<?if(isset($_SESSION['signupWizFlag']) && $_SESSION['signupWizFlag']){ ?>
		<nav class="breadcrumbs row--space1d">
			<a href="<?echo $_SESSION['path']?>/venueSettings.php"><? echo _("Venue Information");?></a>
			<a href="<?echo $_SESSION['path']?>/appSettings1.php"><? echo _("App Styling");?></a>
			<a href="<?echo $_SESSION['path']?>/menuSettings.php?id=<?echo $_SESSION['menus'][0]['id'];?>&r=1"><? echo _("Menu Creation");?></a>
			<?if(isset($_SESSION['venue_eventFlag']) && $_SESSION['venue_eventFlag']){?><a class="current" href="#"><? echo _("Events");?></a>
			<?}else{?><a class="current" href="#"><? echo _("Opening Hours");?></a><?}?>
			<?if(!$_SESSION['noPaymentFlag']){?>
				<a href="<?echo $_SESSION['path']?>/paymentSettings.php"><? echo _("Payment Method");?></a>
			<?}else{?>
				<a class="unavailable" href="#"><? echo _("Add a Payment");?></a>
			<?}?>
			
			<a class="unavailable" href="#"><? echo _("Done");?></a>
		</nav>
	<?}?>
	<form id="nonEventConfigForm" method="POST" class="custom" data-abide>
		<h1><?echo _("Tell us about your opening times");?></h1>
		<div class="large-12 columns">
			<div class="row openDayContainer">
				<label><?echo _("Days your venue is open");?></label>
				<button id="mondayB" 	type="button" class="openDay"><?echo _("Mon");?></button>
				<button id="tuesdayB" 	type="button" class="openDay secondary"><?echo _("Tue");?></button>
				<button id="wednesdayB" type="button" class="openDay secondary"><?echo _("Wed");?></button>
				<button id="thursdayB" 	type="button" class="openDay secondary"><?echo _("Thu");?></button>
				<button id="fridayB" 	type="button" class="openDay secondary"><?echo _("Fri");?></button>
				<button id="saturdayB" 	type="button" class="openDay secondary"><?echo _("Sat");?></button>
				<button id="sundayB" 	type="button" class="openDay secondary"><?echo _("Sun");?></button>
			</div>
			
			<input type="hidden" id="redirectFlag" value="<?echo $redirectFlag;?>"/>
			
			<?php 
			
			$dow = array('monday','tuesday','wednesday','thursday','friday','saturday','sunday');
			for($i=0;$i<7;$i++){?>
			<div class="row row--space1 openingHoursDiv <?echo $dow[$i];?>">
				<div class="large-6 columns openingHours">
					<h4><?echo _("Opening Hours");?></h4>
					<div class="large-3 columns">
						<label><?echo _("Opens at");?></label>
						<input type="text" name="ohStartTime[]" class="noEnterSubmit" pattern="\d\d:\d\d" value="<?if($_SESSION['venue_netimes_edit_on']) echo $neTimes[$i]['ohstarttime'];?>" placeholder="<?echo _("HH:MM");?>" required/>
						<small class="error"><?echo _("Time?");?></small>
					</div>
					<div class="large-3 columns">
						<label><?echo _("Closes at");?></label>
						<input type="text" name="ohEndTime[]" class="noEnterSubmit" pattern="\d\d:\d\d" value="<?if($_SESSION['venue_netimes_edit_on']) echo $neTimes[$i]['ohendtime'];?>" placeholder="<?echo _("HH:MM");?>" required/>
						<small class="error"><?echo _("Time?");?></small>
					</div>
					<div class="large-3 columns"></div>
				</div>
			</div>
			
			<div id="<?echo $dow[$i];?>" class="row row--space1 collectionSlotDiv <?echo $dow[$i];?>">
				<div class="large-6 columns openingHours">
					<h4><?echo _("Collection Slot");?></h4>
					<div class="large-3 columns">
						<label><?echo _("Duration");?></label>
						<input type="text" pattern="^[\d]+$" name="duration[]" value="<?if($_SESSION['venue_netimes_edit_on']) echo $neTimes[$i]['duration'];?>" class="noEnterSubmit justMins"  placeholder="0" required/><span class="inline minSpan"><?echo _("mins");?></span>
					</div>
					<div class="large-6 columns">
					</div>
					<div class="large-3 columns">
					</div>
				</div>
			</div>

			<div class="row row--space1 <?echo $dow[$i];?>">
				<div class="large-6 columns openingHours">
					<h4><?echo _("Lead Times");?>&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("How much time do you need to prepare advance orders?");?>"></i></h4>
					<div class="large-3 columns">
						<input type="text" pattern="^[\d]+$" name="leadtime[]" value="<?if($_SESSION['venue_netimes_edit_on']) echo $neTimes[$i]['leadtime'];?>" class="noEnterSubmit justMins"  placeholder="0" required/><span class="inline minSpan"><?echo _("mins");?></span>
					</div>
					<div class="large-3 columns"></div>
					<div class="large-3 columns"></div>
				</div>
			</div>
			
			<div id="<?echo $dow[$i];?>C" class="row row--space1 applyAllDiv <?echo $dow[$i];?>">
				<label id="applyTimesAllDays"><?echo _("Apply these times to all days");?></label>
				<input type="hidden" name="dow[]" value="<?echo $dow[$i];?>"/>
			</div>
			<?}?>
			<div class="row row--space1">
				<button type="submit"><?echo _("SAVE");?></button>
			</div>
		</div>
	</form>
</div>
<script>
<?for($i=0;$i<7;$i++){?>
	$('.<?echo $dow[$i];?>').addClass('hide');
<?}?>
$('.monday').removeClass('hide');
<?if($_SESSION['venue_netimes_edit_on']){?>
$(document).ready(function(){
	<?for($i=0;$i<7;$i++){
		$dow = '';
		switch($i)
		{
			case 0:{ $dow = 'monday'; break; }
			case 1:{ $dow = 'tuesday'; break; }
			case 2:{ $dow = 'wednesday'; break; }
			case 3:{ $dow = 'thursday'; break; }
			case 4:{ $dow = 'friday'; break; }
			case 5:{ $dow = 'saturday'; break; }
			case 6:{ $dow = 'sunday'; break; }
		}?>
	<?}?>
});
<?}?>
</script>
<script type="text/javascript">
$(document).ready(function() {
	$('.progressIndicator').css('width','350%');
	$('.progressIndicator').attr('title', "75% done, almost there now...");
	setTimeout(function() { $('.progressIndicator').trigger("mouseover"); }, 1100);
	setTimeout(function() { $('.progressIndicator').trigger("mouseout"); }, 7500);
});
</script>