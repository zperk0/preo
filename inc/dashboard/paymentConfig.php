<div class="row">
	<div class="topSpacer"></div>
	<div class="large-12 columns">
		<h1><?echo _("Don't forget to get paid");?></h1>
		<div class="row">
			<div class="large-6 columns">
				<img src="<?echo $_SESSION['path']?>/img/stripe.png"/>					
			</div>
		</div>
		<div class="row row--space3">
			<div class="large-6 columns">
				<a href="<?echo $stripeLink;?>"><button class="preodayButton" type="submit" tabindex=2><?echo _("CONNECT TO STRIPE");?></button></a>
			</div>
		</div>
	</div>
</div>	