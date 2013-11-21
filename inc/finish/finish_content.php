<div class="row">
	<div class="topSpacer"></div>
	<div class="large-12 columns">
		<form id="finishForm" method="POST" action="<?echo $_SESSION['path']?>/code/finish/do_finish.php">
			<div class="row">
				<h2><? echo _("The finish line!");?></h2>
				<h3><?echo _("Your app is built, you did it, all that's left now is to send it into the world!");?></h3>
				<div class="large-12 columns">
					<button class="preodayButton large" type="submit" id="finishButton" tabindex=1><?echo _("LAUNCH MY APP");?></button>
				</div>
				<div class="large-12 columns">
					<a href="<?echo $_SESSION['path']?>/dashboard.php"><button class="preodayButton goBackToDash" type="button" tabindex=2><?echo _("I'LL COME BACK LATER TO PUBLISH MY APP");?></button></a>
				</div>
			</div>
		</form>
	</div>
</div>

<script type="text/javascript">
	$(document).ready(function() {
		<?if(isset($_SESSION['paymentMethodApproved']) && $_SESSION['paymentMethodApproved']=='08C56E86512EAA9F108042253982AB4B7DD4F87BE8D66095D3655BB71F82123B'){
			$_SESSION['paymentMethodApproved']=0;?>
			noty({
			  type: 'success',  layout: 'topCenter',
			  text: '<?echo $_SESSION['pmaReply'];?>'
			});
		<?
			$_SESSION['pmaReply']='';
		}?>
	});
</script>