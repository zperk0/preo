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
	<div class="large-12 columns small-centered large-centered">
		<div class="section-container accordion"  data-options="one_up: false;" data-section="accordion">
			<section>
				<p class="title" data-section-title><a href="#"><i class="fi-crown large"> </i>&nbsp;<? echo _("Venue Configuration");?></a></p>
				<div class="content" data-section-content>
					<p><? echo _("Blah blah");?></p>
				</div>
			</section>
			<section>
				<p class="title" data-section-title><a href="#"><i class="fi-page-copy large"> </i>&nbsp;<? echo _("Menu Configuration");?></a></p>
				<div class="content" data-section-content>
					<p>There is a form that goes here</p>
				</div>
			</section><section>
				<p class="title" data-section-title><a href="#"><i class="fi-layout large"> </i>&nbsp;<? echo _("App Configuration");?></a></p>
				<div class="content" data-section-content>
					<p>There is a form that goes here</p>
				</div>
			</section>
		</div>
	</div>
</div>