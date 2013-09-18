<div class="row">
	<div class="large-6 columns small-centered large-centered">
		<h1><? echo _("Dashboard");?></h1>
		<label><? echo _("ID");?>: <?php echo $_SESSION['id']?></label>
		<label><? echo _("Name");?>: <?php echo $_SESSION['name']?></label>
		<label><? echo _("Email");?>: <?php echo $_SESSION['email']?></label>
		<label><? echo _("Business");?>: <?php if(isset($_SESSION['bName'])) echo $_SESSION['bName']; else echo "Scott hasn't sent me the Business name :(";?></label>
		<label><? echo _("Token");?>: <?php echo $_SESSION['token']?></label>
	</div>
</div>

<br/>
<br/>

<div class="row">
	<div class="large-12 columns small-centered large-centered" >
		<div class="section-container accordion" data-options="one_up: false;" data-section="accordion">
			<section>
				<p class="title" data-section-title><a id="venueTop" href="#"><i class="fi-crown large"> </i>&nbsp;<? echo _("Venue Configuration");?></a></p>
				<div class="content" data-section-content>
					<div class="large-12 columns small-centered large-centered">
						<form id="venueConfigForm" method="POST" data-abide>
							<fieldset>
								<legend><?echo _("Tell us about your Venue");?></legend>
								<div class="row">
									<div class="large-12 columns">
										<label><?echo _("Venue Name");?></label>
										<input type="text" name="vName" placeholder="" required tabindex=1>
										<small class="error"><?echo _("A venue name is required.");?></small>
									</div>
								</div>
								
								<div class="row">
									<div class="large-12 columns">
										<label><?echo _("Description");?></label>
										<textarea name="vDesc" required tabindex=2></textarea>
										<small class="error"><?echo _("A venue description address is required.");?></small>
									</div>
								</div>
								
								<div class="row">
									<div class="large-12 columns">
										<label><?echo _("Venue Address");?></label>
										<input type="text" class="noEnterSubmit" name="vAdd" id="vAdd" placeholder="" onFocus="clearMapInput();" required tabindex=3>
										<input type="hidden" required name="gCode" id="gCode">
										<small class="error"><?echo _("A venue address is required.");?></small>
									</div>
								</div>
								
								<div class="row">
									<div class="large-10 columns small-centered large-centered">
										<div id="map"></div>
									</div>
								</div>
								
								<br/>
								
								<div class="row">
									<div class="small-6 large-2 columns small-centered large-centered">
										<button type="submit" class="large button success radius" tabindex=3><?echo _("Save");?></button>
									</div>
								</div>
							</fieldset>
						</form>
					</div>
				</div>
			</section>
			<section>
				<p class="title" data-section-title><a href="#"><i class="fi-page-copy large"> </i>&nbsp;<? echo _("Menu Configuration");?></a></p>
				<div class="content" data-section-content>
					<div class="large-12 columns small-centered large-centered">
						<form id="venueConfigForm" method="POST" data-abide>
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
										<button type="submit" class="large success radius" tabindex=3><?echo _("Add Item");?></button>
									</div>
								</div>
							</fieldset>
						</form>
					</div>
				</div>
			</section><section>
				<p class="title" data-section-title><a href="#"><i class="fi-layout large"> </i>&nbsp;<? echo _("App Configuration");?></a></p>
				<div class="content" data-section-content>
					<div id="phonePreview" class="text-center">
						<form id="appConfigForm" method="POST" data-abide>
							<fieldset>
								<legend><?echo _("Customize your App");?></legend>
								
								<div class="row">
									<div class="large-6 columns left">
										<div class="row">
											<div class="large-12 columns left">
												<label><?echo _("Headline");?></label>
												<input type="text" name="aHeading" id="aHeading" placeholder="<?echo _("Your heading goes here");?>" required tabindex=1>
												<small class="error"><?echo _("A header is required.");?></small>
											</div>
										</div>
										<br/>
										<div class="row">
											<div class="large-4 columns left">
												<label><?echo _("Thumbnail 1");?></label>
												<a class="th radius" id="thumb1">
													<img src="/img/wallpapers/thumb1.jpg">
												</a>
											</div>
											<div class="large-4 columns left">
												<label><?echo _("Thumbnail 2");?></label>
												<a class="th radius" id="thumb2">
													<img src="/img/wallpapers/thumb2.jpg">
												</a>
											</div>
											<div class="large-4 columns left">
												<label><?echo _("Thumbnail 3");?></label>
												<a class="th radius" id="thumb3">
													<img src="/img/wallpapers/thumb3.jpg">
												</a>
											</div>
										</div>
										<br/>
										<div class="row">
											<div class="large-4 columns left">
												<label><?echo _("Thumbnail 4");?></label>
												<a class="th radius" id="thumb4">
													<img src="/img/wallpapers/thumb4.jpg">
												</a>
											</div>
											<div class="large-4 columns left">
												<label><?echo _("Thumbnail 5");?></label>
												<a class="th radius" id="thumb5">
													<img src="/img/wallpapers/thumb5.jpg">
												</a>
											</div>
											<div class="large-4 columns left">
												<label><?echo _("Thumbnail 6");?></label>
												<a class="th radius" id="thumb6">
													<img src="/img/wallpapers/thumb6.jpg">
												</a>
											</div>
										</div>
									</div>
									<div id="iphone5" class="large-6 columns right">
										<div id="frame_iphone5">
											<img id="phoneWallpaper" src="/img/wallpapers/wall1.jpg" />
											<img id="carrierIMG" src="/img/wallpapers/carrier.png" />
											<img id="poweredIMG" src="/img/wallpapers/powered.png" />
											<p id="appHeading"><?echo _("Your heading goes here");?></p>
										</div>
									</div>
								</div>
								<br/>
								<div class="row">
									<div class="small-12 large-4 columns small-centered large-centered">
										<button type="submit" class="large success radius" tabindex=2><?echo _("Save");?></button>
									</div>
								</div>
							</fieldset>
						</form>
					</div>
				</div>
			</section>
		</div>
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