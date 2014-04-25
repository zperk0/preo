<?if(!isset($_SESSION['venue_netimes_edit_on'])) $_SESSION['venue_netimes_edit_on']=0;?>
<div class="row">
	<div class="topSpacer"></div>
	<?if(isset($_SESSION['signupWizFlag']) && $_SESSION['signupWizFlag']){ ?>
		<nav class="breadcrumbs row--space1d">
			<a href="<?echo $_SESSION['path']?>/settings"><? echo _("Venue Information");?></a>
			<a href="<?echo $_SESSION['path']?>/homescreen"><? echo _("App Styling 1/2");?></a>
			<a href="<?echo $_SESSION['path']?>/menuscreen"><? echo _("App Styling 2/2");?></a>
			<a href="<?echo $_SESSION['path']?>/menus/<?echo $_SESSION['menus'][0]['id'];?>?r=1"><? echo _("Menu Creation");?></a>
			<?if(isset($_SESSION['venue_eventFlag']) && $_SESSION['venue_eventFlag']){?><a class="current" href="#"><? echo _("Events");?></a>
			<?}else{?><a class="current" href="#"><? echo _("Opening Hours");?></a><?}?>
			<?if(!$_SESSION['noPaymentFlag']){?>
				<a href="<?echo $_SESSION['path']?>/payment"><? echo _("Payment Method");?></a>
			<?}else{?>
				<a class="unavailable" href="#"><? echo _("Add a Payment");?></a>
			<?}?>
			
			<a class="unavailable" href="#"><? echo _("Done");?></a>
		</nav>
	<?}?>
	<form id="nonEventConfigForm" method="POST" class="custom" data-abide>
		<h1 class="alignHeader"><?echo _("Tell us about your opening times");?></h1>
		<div class="large-12 columns alignHeader">
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
			
			$dow = array('dummy','sunday','monday','tuesday','wednesday','thursday','friday','saturday');
			for($i=1;$i<8;$i++){?>
			<div class="row row--space1 openingHoursDiv <?echo $dow[$i];?>" id="<?echo $dow[$i];?>">
				<h4><?echo _("Opening Hours");?>&nbsp;<span><button class="addMoreOH" type="button"><i class="pd-add"></i></button> <?echo _("Add another opening hour");?></span>&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("eg: if you close for lunch and reopen in the evening.");?>"></i></h4>

				<?if(isset($neTimes) && isset($neTimes[$i]) && count($neTimes["$i"]))
				{
					$counter = 0;
					foreach($neTimes["$i"] as $entry){ ?>					
					<div class="large-12 columns openingHours openHWrapper">

						<div class="small-3 columns">
							<label><?echo _("Open ");?><i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("Let us know if your venue is open for delivery, open for pickup, open for both or if you are closed today.");?>"></i></label>
							<select class='oh-is-open'  name="ohIsOpen[<?echo $dow[$i];?>][]">

								<option value='b' <? if (!(isset($entry)) || ($entry['pickup'] == 1 && $entry['delivery'] == 1)) {?>selected="selected"<?}?>><?echo _("For delivery and collection") ?> </option>
								<option value='d' <? if (isset($entry) && ($entry['pickup'] == 0 && $entry['delivery'] == 1)) {?>selected="selected"<?}?>> <?echo _("For delivery only") ?> </option>
								<option value='p' <? if (isset($entry) && ($entry['pickup'] == 1 && $entry['delivery'] == 0)) {?>selected="selected"<?}?>><?echo _("For collection only") ?> </option>							
								<option value='c' <? if (isset($entry) && ($entry['pickup'] == 0 && $entry['delivery'] == 0)) {?>selected="selected"<?}?>><?echo _("Closed Today") ?></option>
							</select>
						</div>						
						<div class="large-2 columns ui-timepicker-input-wrapper">
							<label><?echo _("Opens at");?></label>
							<input type="text" name="ohStartTime[<?echo $dow[$i];?>][]" class="noEnterSubmit" pattern="\d\d:\d\d" value="<?echo $entry['ohstarttime'];?>" placeholder="<?echo _("HH:MM");?>" required/>
							<small class="error"><?echo _("Time?");?></small>
						</div>
						<div class="large-2 columns ui-timepicker-input-wrapper">
							<label><?echo _("Closes at");?></label>
							<input type="text" name="ohEndTime[<?echo $dow[$i];?>][]" class="noEnterSubmit" pattern="\d\d:\d\d" value="<?echo $entry['ohendtime'];?>" placeholder="<?echo _("HH:MM");?>" required/>
							<small class="error"><?echo _("Time?");?></small>
						</div>
						<div class="large-1 columns removeOHDiv <?if($counter < 1) echo 'hide';?>">
							<label>&nbsp;</label>
							<button class="removeOH secondary small" type="button" title="<?echo _("Remove opening hour");?>"><i class="pd-delete"></i></button>
						</div>
						<div class="large-5 columns"></div>
					</div>
					<?$counter++;
					}
				}else{?>
				<div class="large-12 columns openingHours openHWrapper">
				<div class="small-3 columns">
							<label><?echo _("Open ");?><i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("Let us know if your venue is open for delivery, open for pickup, open for both or if you are closed today.");?>"></i></label>
							<select class='oh-is-open' name="ohIsOpen[<?echo $dow[$i];?>][]">								
								<option value='b' selected="selected"><?echo _("For delivery and collection") ?> </option>
								<option value='d' > <?echo _("For delivery only") ?> </option>
								<option value='p' ><?echo _("For collection only") ?> </option>							
								<option value='c' ><?echo _("Closed Today") ?></option>
							</select>
						</div>						
					<div class="large-2 columns ui-timepicker-input-wrapper">
						<label><?echo _("Opens at");?></label>
						<input type="text" name="ohStartTime[<?echo $dow[$i];?>][]" class="noEnterSubmit" pattern="\d\d:\d\d" placeholder="<?echo _("HH:MM");?>" required/>
						<small class="error"><?echo _("Time?");?></small>
					</div>
					<div class="large-2 columns ui-timepicker-input-wrapper">
						<label><?echo _("Closes at");?></label>
						<input type="text" name="ohEndTime[<?echo $dow[$i];?>][]" class="noEnterSubmit" pattern="\d\d:\d\d" placeholder="<?echo _("HH:MM");?>" required/>
						<small class="error"><?echo _("Time?");?></small>
					</div>
					<div class="large-1 columns removeOHDiv hide">
						<label>&nbsp;</label>
						<button class="removeOH secondary small" type="button" title="<?echo _("Remove opening hour");?>"><i class="pd-delete"></i></button>
					</div>
					<div class="large-5 columns"></div>
				</div>
				<?}?>
			</div>
			
			<div id="<?echo $dow[$i];?>C" class="row row--space1 applyAllDiv <?echo $dow[$i];?>">
				<a class="applyTimesAllDays" href="#"><?echo _("Apply these times to all days");?></a>
				<input type="hidden" name="dow[]" value="<?echo $dow[$i];?>"/>
			</div>
			<?}?>
			<div class="row row--space1">
				<button id="ohSubButton" type="submit"><?echo _("SAVE CHANGES");?></button>
				<button id="savingButton" class="hide secondary" type="button"><?echo _("SAVING...");?></button>
			</div>
		</div>
	</form>
</div>
<script>
<?for($i=1;$i<8;$i++){?>
	$('.<?echo $dow[$i];?>').addClass('hide');
	
	if ($('.<?echo $dow[$i];?> .oh-is-open').val() == "c"){
		console.log('hereeee','.<?echo $dow[$i];?>',$('.<?echo $dow[$i];?> .oh-is-open').val())
		$('.<?echo $dow[$i];?> .ui-timepicker-input-wrapper').hide();	
	}
<?}?>
$('.monday').removeClass('hide');
</script>
<?if((isset($_SESSION['signupWizFlag']) && $_SESSION['signupWizFlag'])){?>
<script type="text/javascript">
$(document).ready(function() {
	$('.progressIndicator').css('width','350%');
	$('.progressIndicator').attr('title', "75% done, almost there now...");
	setTimeout(function() { $('.progressIndicator').trigger("mouseover"); }, 1100);
	setTimeout(function() { $('.progressIndicator').trigger("mouseout"); }, 7500);

});
</script>
<?}?>