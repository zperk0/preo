<div class="row">
	<div class="large-12 columns" >
		<div class="section-container accordion" data-options="one_up: false;" data-section="accordion">
			<section>
				<p class="title" data-section-title><a id="venueTop" href="#"><i class="fi-crown large"> </i>&nbsp;<? echo _("Venue Configuration");?></a></p>
				<div class="content" data-section-content>	
					<? require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path']."/inc/dashboard/venueConfig.php"); ?>
				</div>
			</section>
			<section>
				<p class="title" data-section-title><a href="#" id="menuConfigTop"><i class="fi-page-copy large"> </i>&nbsp;<? echo _("Menu Configuration");?></a></p>
				<div class="content" data-section-content>
					<? require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path']."/inc/dashboard/menuConfig.php"); ?>
				</div>
			</section>
			<section>
				<p class="title" data-section-title><a href="#" id="appConfigTop"><i class="fi-layout large"> </i>&nbsp;<? echo _("App Configuration");?></a></p>
				<div class="content" data-section-content>
					<? require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path']."/inc/dashboard/appConfig.php"); ?>
				</div>
			</section>
		</div>
	</div>
</div>

