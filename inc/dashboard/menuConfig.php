<div class="large-12 columns small-centered large-centered">
	<form id="menuConfigForm" method="POST" data-abide>
		<fieldset>
			<legend><?echo _("Let's fill in your Menu");?></legend>
			<div class="row">
				<div class="small-8 large-10	columns">
					<label><?echo _("Item Name");?></label>
					<input type="text" name="iName" placeholder="" required tabindex=1>
					<small class="error"><?echo _("An item name is required.");?></small>
				</div>

				<div class="small-4 large-2 columns">
					<label><?echo _("Visible?");?></label>
					<div class="switch small round"> 
						<input id="z" name="notification-switch" value="0" type="radio">
						<label for="z"><?echo _("No");?></label>

						<input id="z1" name="notification-switch" value="1" type="radio" checked>
						<label for="z1"><?echo _("Yes");?></label>

						<span></span>
					</div>
				</div>
			</div>
			
			<div class="row">
				<div class="large-3 small-4 columns">
					<label><?echo _("Category");?></label>
					<a href="#" data-dropdown="catDrop" class="button dropdown small" tabindex=2><? echo _("Select");?></a>
					<ul id="catDrop" class="f-dropdown">
						<li><a href="#" class="changeLang" data-new-lang="en"><? echo _("Hot Food");?></a></li>
						<li><a href="#" class="changeLang" data-new-lang="de"><? echo _("Cold Food");?></a></li>
						<li><a href="#" class="changeLang" data-new-lang="de"><? echo _("Soft Drinks");?></a></li>
						<li><a href="#" class="changeLang" data-new-lang="de"><? echo _("Alcoholic Beverages");?></a></li>
						<li><a href="#" class="changeLang" data-new-lang="de"><? echo _("add new category");?></a></li>
					</ul>
				</div>

				<div class="large-4 small-4 columns">
					<label><?echo _("Price");?></label>
					<input type="text" name="iPrice" placeholder="" required tabindex=3>
					<small class="error"><?echo _("An item price is required.");?></small>
				</div>

				<div class="large-5 small-4 columns">
					<label><?echo _("Quantity");?></label>
					<input type="number" name="iQuantity" placeholder="Leave blank for unlimited" tabindex=5>
				</div>
			</div>
			
			<div class="row">
				<div class="large-12 columns">
					<label><?echo _("Description");?></label>
					<textarea name="iDesc" required tabindex=4></textarea>
					<small class="error"><?echo _("An item description address is required.");?></small>
				</div>
			</div>
			
			<div class="row">
				<div class="large-6 columns">
					<label><?echo _("Add a size/option");?></label>
						<button type="button" class="round" id="addOpt"><i class='fi-plus'></i></button>
				</div>
			</div>
			
			<div class="row">
				<div id="optDiv" class="large-12 small-12 columns">
				</div>
			</div>
											
			<br/>
			
			<div class="row">
				<div class="small-12 large-4 columns small-centered large-centered">
					<button  id="itemSave" type="submit" class="large success radius" tabindex=3><?echo _("Add Item");?></button>
				</div>
			</div>
		</fieldset>
	</form>
</div>

<script type="text/javascript"> 
//This needs to be here so we can use PHP to provide translated copy until we move these out to a separate file
$(document).ready(function() {
	i = 1;
	$('#addOpt').click(function() { 
		
		$("<div />", { "class":"large-5 small-5 columns", "id":"optNameDiv"+i })
		.append($("<label />", { "html":"<?echo _('Name');?>" }))
		.append($("<input />", { "type": "text", "id":"optName"+i, "required": "required" }))
		.append($("<small />", { "class":"error", "html":"<?echo _('A name is required');?>" }))
		.appendTo("#optDiv");
		
		$("<div />", { "class":"large-5 small-5 columns", "id":"optPriceDiv"+i })
		.append($("<label />", { "html":"<?echo _('Price');?>" }))
		.append($("<input />", { "type": "text", "id":"optPrice"+i,"required": "required" }))
		.append($("<small />", { "class":"error", "html":"<?echo _('A price is required');?>" }))
		.appendTo("#optDiv");
		
		$("<div />", { "class":"large-2 small-2 columns", "id":"optDelDiv"+i })
		.append($("<label />", { "html":"<?echo _('Delete');?>" }))
		.append($("<button />", { "class":"button tiny alert round", "type":"button","html":"<i class='fi-x'></i>", "id":"delItem"+i, "title":"<?echo _('Click to remove option');?>" }))
		.appendTo("#optDiv");
		
		i++; 

	});
});
</script>