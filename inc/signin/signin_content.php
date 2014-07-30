<div class="row">
	<div class="topSpacer"></div>
	<h1 class="alignHeader"><?echo _("Your account");?></h1>
	<div class="large-12 columns socialMediaDiv">
		<div class="row">
			<div class="large-6 columns fbSignup">
				<a href="<?php echo $authCodeUrl;?>"><span><?echo _("Login using Facebook");?></span></a>
			</div>
		</div>
		<div class="row">
			<div class="large-6 columns googleSignup">
				<input type="hidden" id="userConsent" value="0"/>
				<span class="g-signin" data-callback="signinCallback" data-clientid="26773142567-ui0mkhms9iu18n82k3tegok0b0phnim6.apps.googleusercontent.com" 
					data-cookiepolicy="single_host_origin" data-scope="email profile" 
					data-prompt="select_account"><?echo _("Login using Google+");?></span>
			</div>
		</div>
	</div>
	<div class="large-12 columns row--space1u">
		<form id="signinForm" method="POST" data-abide>
			<div class="row">
				<div class="large-6 small-11 columns">
					<label><?echo _("Email");?></label>
					<input type="text" id="email" name="email" placeholder="" required pattern='^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$' tabindex=1>
					<small class="error"><?echo _("Please type a valid email address");?></small>
				</div>
			</div>
			
			<div class="row">
				<div class="large-6 small-11 columns">
					<label><?echo _("Password");?></label>
					<input type="password" name="password" placeholder="" required tabindex=2>
					<small class="error"><?echo _("Please type your password");?></small>
				</div>
			</div>
				
			<div class="row row--space1">
				<div class="large-12 columns">
					<small class="smallNot"><a href="<?echo $_SESSION['path'];?>/forgot"><?echo _("Forgot your password?");?></a></small>
				</div>
			</div>
			
			<div class="row">
				<div class="small-8 large-5 columns">
					<button type="submit" tabindex=3 id="btnLogin"><?echo _("LOG IN");?></button>
					<button id="logingButton" class="hide secondary" type="button"><?echo _("LOGING...");?></button>					
				</div>
			</div>
			<div class="row">
				<div class="large-12 columns">
					<small class="smallNot">
							<? if(preg_match('/^local/', $_SERVER['SERVER_NAME'])){ ?>
								<? echo _("Looking for the Fulfilment App?");?><a href="//orders-dev.preoday.com" target="_blank"><? echo _("  Click here");?></a>
							<? }
							else if(preg_match('/^app\-dev/', $_SERVER['SERVER_NAME'])){ ?>
								<? echo _("Looking for the Fulfilment App?");?><a href="//orders-dev.preoday.com" target="_blank"><? echo _("  Click here");?></a>
							<? }
							else if(preg_match('/^app\-demo/', $_SERVER['SERVER_NAME'])){ ?>
								<? echo _("Looking for the Fulfilment App?");?><a href="//orders-demo.preoday.com" target="_blank"><? echo _("  Click here");?></a>
							<? }
							else if(preg_match('/^app\./', $_SERVER['SERVER_NAME'])){ ?>
								<? echo _("Looking for the Fulfilment App?");?><a href="//orders.preoday.com" target="_blank"><? echo _("  Click here");?></a>
							<? } ?>

					</small>
				</div>
			</div>
		</form>
	</div>
</div>
<?if( isset($_SESSION['privLogout']) && $_SESSION['privLogout'] )
{
	$_SESSION['privLogout'] = 0;
	?>
		<script type="text/javascript">
		$(document).ready(function() {
			noty({
			type: 'error',  layout: 'topCenter',
			text: <?echo json_encode(_("Sorry, you don't have sufficient privileges.<br/><br/>Looking for the Fulfilment App? Click the link at the bottom of this page."));?>
			});
		});
		</script>
	<?
}
?>