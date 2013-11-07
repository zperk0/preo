<?if(!isset($_SESSION['venue_ebtimes_edit_on'])) $_SESSION['venue_ebtimes_edit_on']=0;?>
<div class="row">
	<div class="topSpacer"></div>
	<form id="eventBasedConfigForm" method="POST" class="custom" data-abide>
		<input type="hidden" name="eventCount" id="eventCount" value="1"/>
		<input type="hidden" name="eventCountAct" id="eventCountAct" value="1"/>
		<h1><?echo _("Tell us about your event times");?></h1>
		<div class="large-12 columns">
			<?php 
			if($_SESSION['venue_ebtimes_edit_on']){
				for($i=0;$i<$eventCount;$i++){?>	
				<div class="row openingHours <?echo $ebTimes[$i]['id'];?>">
					<div class="large-6 columns">
						<h4><?echo _("Event Info");?></h4>
						<div class="large-12 columns">
							<label><?echo _("Name");?></label>
							<input type="text" name="ebName[]" value="<?echo $ebTimes[$i]['name'];?>"class="noEnterSubmit text-left" required/>
							<small class="error"><?echo _("Name?");?></small>
						</div>
					</div>
				</div>
				<div class="row openingHours <?echo $ebTimes[$i]['id'];?>">
					<div class="large-6 columns">
						<div class="large-12 columns">
							<label><?echo _("Description");?></label>
							<input type="text" name="ebDesc[]" value="<?echo $ebTimes[$i]['desc'];?>" class="noEnterSubmit text-left"/>
						</div>
					</div>
				</div>
				<div class="row openingHours <?echo $ebTimes[$i]['id'];?>">
					<div class="large-6 columns">
						<div class="large-4 columns">
							<label><?echo _("Event date");?></label>
							<input type="text" name="ebDate[]" value="<?echo $ebTimes[$i]['date'];?>" class="noEnterSubmit" pattern="^\d\d\/\d\d\/\d\d\d\d$" placeholder="<?echo _("DD/MM/YYYY");?>" required />
							<small class="error"><?echo _("Date?");?></small>
						</div>
						<div class="large-4 columns">
							<label><?echo _("Start time");?></label>
							<input type="text" name="ebTime[]" value="<?echo $ebTimes[$i]['starttime'];?>" class="noEnterSubmit" pattern="\d\d:\d\d" placeholder="<?echo _("HH:MM");?>" required />
							<small class="error"><?echo _("Time?");?></small>
						</div>
						<div class="large-4 columns">
							<label><?echo _("End time");?></label>
							<input type="text" name="ebETime[]" value="<?echo $ebTimes[$i]['endtime'];?>" class="noEnterSubmit" pattern="\d\d:\d\d" placeholder="<?echo _("HH:MM");?>" required />
							<small class="error"><?echo _("Time?");?></small>
						</div>
					</div>
				</div>
				<div id="<?echo $ebTimes[$i]['id'];?>" class="row row--space1 collectionSlotDiv <?echo $ebTimes[$i]['id'];?>">
					<div class="large-6 columns openingHours">
						<h4><?echo _("Collection Slots");?></h4>
						<div class="large-3 columns">
							<label><?echo _("Starts at");?></label>
							<input type="text" name="csStartTime[]" class="noEnterSubmit" value="<?if($_SESSION['venue_ebtimes_edit_on']) echo $ebTimes[$i]['csstarttime'];?>" placeholder="<?echo _("HH:MM");?>" required/>
							<small class="error"><?echo _("Time?");?></small>
						</div>
						<div class="large-3 columns">
							<label><?echo _("Ends at");?></label>
							<input type="text" name="csEndTime[]" class="noEnterSubmit" value="<?if($_SESSION['venue_ebtimes_edit_on']) echo $ebTimes[$i]['csendtime'];?>" placeholder="<?echo _("HH:MM");?>" required/>
							<small class="error"><?echo _("Time?");?></small>
						</div>
						<div class="large-6 columns">
							<label><?echo _("Duration");?></label>
							<span name="csDuration[]" class="slotDuration">0hrs 0mins</span>
						</div>
					</div>
				</div>

				<div class="row row--space1 <?echo $ebTimes[$i]['id'];?>">
					<div class="large-6 columns openingHours">
						<h4><?echo _("Lead Times");?></h4>
						<div class="large-3 columns">
							<label><?echo _("Drinks");?> &nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("How much time do you need to prepare advance drink orders?");?>"></i></label>
							<input type="text" name="leadDrinksMins[]" value="<?if($_SESSION['venue_ebtimes_edit_on']) echo $ebTimes[$i]['leaddrinkstime'];?>" class="noEnterSubmit justMins"  placeholder="0" required/><span class="inline minSpan"><?echo _("mins");?></span>
						</div>
						<div class="large-3 columns">
							<label><?echo _("Food");?> &nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("How much time do you need to prepare advance food orders?");?>"></i></label>
							<input type="text" name="leadFoodMins[]" value="<?if($_SESSION['venue_ebtimes_edit_on']) echo $ebTimes[$i]['leadfoodtime'];?>" class="noEnterSubmit justMins" placeholder="0" required/><span class="inline minSpan"><?echo _("mins");?></span>
						</div>
						<div class="large-3 columns"></div>
					</div>
				</div>
				<input type="hidden" name="ebID[]" value="<?echo $ebTimes[$i]['eventID'];?>"/>
				<script>
				<?if($_SESSION['venue_ebtimes_edit_on']){?>
				$(document).ready(function(){
					getDuration('<?echo $ebTimes[$i]['id'];?>');
				});
				<?}?>
				</script>
				<?}
			}else{?>
				<div class="row openingHours e0">
					<div class="large-6 columns">
						<h4><?echo _("Event Info");?></h4>
						<div class="large-12 columns">
							<label><?echo _("Name");?></label>
							<input type="text" name="ebName[]" class="noEnterSubmit text-left" required/>
							<small class="error"><?echo _("Name?");?></small>
						</div>
					</div>
				</div>
				<div class="row openingHours e0">
					<div class="large-6 columns">
						<div class="large-12 columns">
							<label><?echo _("Description");?></label>
							<input type="text" name="ebDesc[]" class="noEnterSubmit text-left"/>
						</div>
					</div>
				</div>
				<div class="row openingHours e0">
					<div class="large-6 columns">
						<div class="large-4 columns">
							<label><?echo _("Event date");?></label>
							<input type="text" name="ebDate[]" class="noEnterSubmit" pattern="^\d\d\/\d\d\/\d\d\d\d$" placeholder="<?echo _("DD/MM/YYYY");?>" required />
							<small class="error"><?echo _("Date?");?></small>
						</div>
						<div class="large-4 columns">
							<label><?echo _("Start time");?></label>
							<input type="text" name="ebTime[]" class="noEnterSubmit" pattern="\d\d:\d\d" placeholder="<?echo _("HH:MM");?>" required />
							<small class="error"><?echo _("Time?");?></small>
						</div>
						<div class="large-4 columns">
							<label><?echo _("End time");?></label>
							<input type="text" name="ebETime[]" class="noEnterSubmit" pattern="\d\d:\d\d" placeholder="<?echo _("HH:MM");?>" required />
							<small class="error"><?echo _("Time?");?></small>
						</div>
					</div>
				</div>
				
				<div id="e0" class="row row--space1 collectionSlotDiv e0">
					<div class="large-6 columns openingHours">
						<h4><?echo _("Collection Slots");?></h4>
						<div class="large-3 columns">
							<label><?echo _("Starts at");?></label>
							<input type="text" name="csStartTime[]" class="noEnterSubmit" pattern="\d\d:\d\d" placeholder="<?echo _("HH:MM");?>" required/>
							<small class="error"><?echo _("Time?");?></small>
						</div>
						<div class="large-3 columns">
							<label><?echo _("Ends at");?></label>
							<input type="text" name="csEndTime[]" class="noEnterSubmit" pattern="\d\d:\d\d" placeholder="<?echo _("HH:MM");?>" required/>
							<small class="error"><?echo _("Time?");?></small>
						</div>
						<div class="large-6 columns">
							<label><?echo _("Duration");?></label>
							<span name="csDuration[]" class="slotDuration">0hrs 0mins</span>
						</div>
					</div>
				</div>

				<div class="row row--space1">
					<div class="large-6 columns openingHours e0">
						<h4><?echo _("Lead Times");?></h4>
						<div class="large-3 columns">
							<label><?echo _("Drinks");?> &nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("How much time do you need to prepare advance drink orders?");?>"></i></label>
							<input type="text" name="leadDrinksMins[]" class="noEnterSubmit justMins" pattern="^[\d]+$" placeholder="0" required/><span class="inline minSpan"><?echo _("mins");?></span>
						</div>
						<div class="large-3 columns">
							<label><?echo _("Food");?> &nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("How much time do you need to prepare advance food orders?");?>"></i></label>
							<input type="text" name="leadFoodMins[]" class="noEnterSubmit justMins" pattern="^[\d]+$" placeholder="0" required/><span class="inline minSpan"><?echo _("mins");?></span>
						</div>
						<div class="large-3 columns"></div>
					</div>
				</div>
				<input type="hidden" name="ebID[]" value="e0"/>
			<?}?>
			<div class="row row--space1">
				<button type="submit"><?echo _("SAVE");?></button>
			</div>
		</div>
	</form>
</div>