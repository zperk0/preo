<div class="row">
	<div class="topSpacer"></div>
	<nav class="breadcrumbs row--space1d">
		<a href="<?echo $_SESSION['path']?>/venueSettings.php">Venue Information</a>
		<a href="<?echo $_SESSION['path']?>/appSettings1.php">App Styling 1/2</a>
		<a href="<?echo $_SESSION['path']?>/appSettings2.php">App Styling 2/2</a>
		<a class="current" href="#">Menu Creation</a>
	</nav>
	<div class="large-12 columns">
		<form id="menuConfigForm" method="POST" data-abide>
			<h1><?echo _("Build your menu");?></h1>
			<div class="row">
				<input type="text" name="mName" id="mName" class="menuField noEnterSubmit" value="<?echo _("Click here to add your menu name");?>" required tabindex=1/>
				<small class="error"><?echo _("Please type a menu name");?></small>
			</div>
			<div class="row">
				<div class="large-12 columns menuSectionDiv">
					<input type="text" name="mSectionName[]" class="menuField menuSectionField noEnterSubmit" value="<?echo _("Click here to add a section name");?>" required tabindex=2/>
					<small class="error"><?echo _("Please type a section name");?></small>
				</div>
			</div>
			
			<div class="row">
				<div class="large-12 columns">
					<table class="menuTable">
						<tbody>
							<tr class="menuEdit">
								<td class="menuTDName">
									<input type="text" name="iName[]" class="menuField noEnterSubmit" value="<?echo _("Click here to add an item name");?>" required/>
									<small class="error"><?echo _("Please type an item name");?></small>
								</td>
								<td class="menuTDDesc">
									<input type="text" name="iDesc[]" class="menuField noEnterSubmit" value="<?echo _("Click here to add a description");?>" required/>
									<small class="error"><?echo _("Please type a description");?></small>
								</td>
								<td class="menuTDPrice">
									<input type="text" name="iDesc[]" class="menuField inline noEnterSubmit" value="<?echo _("0.00");?>"required/>
									<small class="error"><?echo _("Amount?");?></small>
									</td>
								<td class="menuTDQuant">
									<input type="text" name="iQuan[]" class="menuField noEnterSubmit" placeholder="<?echo _("Unlimited");?>"/>
								</td>
								<td class="menuTDVisi">
									<div class="switch tiny"> 
										<input id="z" name="iVisi[]" value="0" type="radio">
										<label for="z"><?echo _("No");?></label>

										<input id="z1" name="iVisi[]" value="1" type="radio" checked>
										<label for="z1"><?echo _("Yes");?></label>

										<span></span>
									</div>
								</td>
								<td class="menuTDTools">
									<button class="menuTableButtons" 		title="<?echo _("Edit");?>"><i class="fi-pencil"></i></button>
									<button class="menuTableButtons" 		title="<?echo _("Duplicate");?>"><i class="icon-copy"></i></button>
									<button class="menuTableButtons alert" 	title="<?echo _("Delete");?>"><i class="fi-x"></i></button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			
			<!--
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
					<input type="text" name="iPrice" value="" required tabindex=3>
					<small class="error"><?echo _("An item price is required.");?></small>
				</div>

				<div class="large-5 small-4 columns">
					<label><?echo _("Quantity");?></label>
					<input type="number" name="iQuantity" value="Leave blank for unlimited" tabindex=5>
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
			-->
			<div class="row">
				<div class="small-12 large-4 columns">
					<button  id="itemSave" type="submit" tabindex=3><?echo _("SAVE");?></button>
				</div>
			</div>
		</form>
	</div>
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

<!-- Now we update progressBar tooltip, width and trigger mouseover -->
<script type="text/javascript">
$(document).ready(function() {
	$('.progressIndicator').css('width','240%');
	$('.progressIndicator').attr('title', "55% done, now for the fun bit!");
	setTimeout(function() { $('.progressIndicator').trigger("mouseover"); }, 1100);
	setTimeout(function() { $('.progressIndicator').trigger("mouseout"); }, 7500);
});
</script>