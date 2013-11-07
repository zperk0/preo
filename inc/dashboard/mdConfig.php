<?if(!isset($_SESSION['_edit_on'])) $_SESSION['_edit_on']=0;?>
<div class="row">
	<div class="topSpacer"></div>
	<form id="mealDealConfigForm" method="POST" class="custom" data-abide>
		<input type="hidden" name="eventCount" id="eventCount" value="1"/>
		<input type="hidden" name="eventCountAct" id="eventCountAct" value="1"/>
		<h1><?echo _("Meal Deals");?></h1>
		<div class="large-12 columns">
			<?php 
			if($_SESSION['_edit_on']){
				
			}else{?>
				
			<?}?>
			<div class="row row--space1">
				<button type="submit"><?echo _("SAVE");?></button>
			</div>
		</div>
	</form>
</div>