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
			<?if(!$connectedFlag){?>
			<div class="large-6 columns">
				<a href="<?echo $stripeLink;?>"><button class="preodayButton" type="submit" tabindex=2><?echo _("CONNECT TO STRIPE");?></button></a>
			</div>
			<?}else{?>
			<div class="large-6 columns">
				<button class="preodayButton secondary" type="submit" tabindex=2><?echo _("YOU'RE ALREADY CONNECTED");?></button>
			</div>
			<?}?>
		</div>
	</div>
</div>	