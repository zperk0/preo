<div class="row">
	<div class="large-6 columns small-centered large-centered">
		<h1><? echo _("Dashboard");?></h1>
		<label><? echo _("ID");?>: <?php echo $_SESSION['id']?></label>
		<label><? echo _("Name");?>: <?php echo $_SESSION['name']?></label>
		<label><? echo _("Email");?>: <?php echo $_SESSION['email']?></label>
		<label><? echo _("Business Name");?>: <?php echo $_SESSION['bName'];?></label>
		<label><? echo _("Business ID");?>: <?php echo $_SESSION['bID'];?></label>
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
					<? require($_SERVER['DOCUMENT_ROOT']."/inc/dashboard/venueConfig.php"); ?>
				</div>
			</section>
			<section>
				<p class="title" data-section-title><a href="#" id="menuConfigTop"><i class="fi-page-copy large"> </i>&nbsp;<? echo _("Menu Configuration");?></a></p>
				<div class="content" data-section-content>
					<? require($_SERVER['DOCUMENT_ROOT']."/inc/dashboard/menuConfig.php"); ?>
				</div>
			</section>
			<section>
				<p class="title" data-section-title><a href="#" id="appConfigTop"><i class="fi-layout large"> </i>&nbsp;<? echo _("App Configuration");?></a></p>
				<div class="content" data-section-content>
					<? require($_SERVER['DOCUMENT_ROOT']."/inc/dashboard/appConfig.php"); ?>
				</div>
			</section>
		</div>
	</div>
</div>