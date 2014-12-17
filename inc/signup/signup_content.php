	<div class="sections grey sign-up">
		<div class="container">
			<div class="col col-lg-12">
				<h1 class="text-center"><?php echo _("Sign up with Preoday"); ?></h1>
				<p class="lead text-center"><?php echo _("Start receiving mobile orders today"); ?></p>
				<div class="bs-callout">

					<form class="form text-left" role="form" id="signUpForm" data-abide enctype="multipart/form-data">
						<h3><span class="no-icon no-1"></span><?php echo _("Basic information"); ?></h3>
						<div class="row">
							<div class="col col-xs-12 col-sm-6 col-md-6 col-lg-6">
								<div class="form-group firstname">
									<label for="firstname"><?php echo _("First name"); ?></label>
									<input type="text" name="firstname" required class="form-control" id="firstname">
									<small class="error"><?echo _("Please type your first name");?></small>
								</div>
							</div>
							<div class="col col-xs-12 col-sm-6 col-md-6 col-lg-6">
								<div class="form-group surname">
									<label for="surname"><?php echo _("Surname"); ?></label>
									<input type="text" name="surname" required class="form-control" id="surname">
									<small class="error"><?echo _("Please type your surname");?></small>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col col-xs-12 col-sm-12 col-md-12 col-lg-12">
								<div class="form-group businessname">
									<label for="businessname"><?php echo _("Business name"); ?></label>
									<input type="text" disabled="disabled" name="businessname" class="form-control" id="businessName">
								</div>
							</div>
						</div>
						<hr>
						<h3><span class="no-icon no-2"></span><?php echo _("Create your Preoday account"); ?></h3>
						<div class="row">
							<div class="col col-xs-12 col-sm-6 col-md-6 col-lg-6">
								<div class="form-group emailaddress">
									<label for="emailaddress"><?php echo _("Email address"); ?></label>
									<input type="text" name="emailaddress" required class="form-control" pattern='^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$' id="email">
									<small class="error"><?echo _("Please type your email");?></small>
								</div>
							</div>
							<div class="col col-xs-12 col-sm-6 col-md-6 col-lg-6">
								<div class="form-group password">
									<label for="password"><?php echo _("Password"); ?></label>
									<input type="password" name="password" required class="form-control" id="password">
									<small class="error"><?echo _("Please type your password");?></small>
								</div>
							</div>
						</div>
						<hr>
						<h3><span class="no-icon no-3"></span><?php echo _("Billing information"); ?><span class="security-info"></span></h3>
						<h4 class="text-green"><?php echo _("Your 14 day free trial will last until midnight on December 10th, 2014"); ?></h4>
						<h5><?php echo _("If you choose not to continue using Preoday just cancel before the trail ends and you won’t be charged (we’ll email you 2 days before the trial ends to remind you). You can upgrade, downgrade or cancel at any time."); ?></h5>
						<div class="row">
							<div class="col col-xs-12 col-sm-12 col-md-12 col-lg-12">
								<div class="form-group cardnumber">
									<label for="cardnumber"><?php echo _("Card number"); ?></label>
									<input type="text" name="cardnumber" required class="form-control" id="cardnumber">
									<small class="error"><?echo _("Please type your card number");?></small>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col col-xs-12 col-sm-4 col-md-4 col-lg-4">
								<div class="form-group expirymonth">
									<label for="expirydate" style="width: 100%;"><?php echo _("Expiry (month/year)"); ?></label>
									<select name="expirymonth" id="expirymonth" required class="form-control" style="width: 45%; display: inline-block;">
										<option value=""></option>
										<option value="01">01</option>
										<option value="02">02</option>
										<option value="03">03</option>
										<option value="04">04</option>
										<option value="05">05</option>
										<option value="06">06</option>
										<option value="07">07</option>
										<option value="08">08</option>
										<option value="09">09</option>
										<option value="10">10</option>
										<option value="11">11</option>
										<option value="12">12</option>
									</select>
									<select name="expiryyear" id="expiryyear" required class="form-control" style="width: 52%; display: inline-block;">
										<option value=""></option>
										<option value="2015">2015</option>
										<option value="2016">2016</option>
										<option value="2017">2017</option>
										<option value="2018">2018</option>
										<option value="2019">2019</option>
										<option value="2020">2020</option>
										<option value="2021">2021</option>
										<option value="2022">2022</option>
										<option value="2023">2023</option>
										<option value="2024">2024</option>
										<option value="2025">2025</option>
										<option value="2026">2026</option>
										<option value="2027">2027</option>
										<option value="2028">2028</option>
										<option value="2029">2029</option>
										<option value="2030">2030</option>
										<option value="2031">2031</option>
										<option value="2032">2032</option>
										<option value="2033">2033</option>
										<option value="2034">2034</option>
									</select>
									<small class="error"><?echo _("Please type your month/year");?></small>
								</div>
							</div>
							<div class="col col-xs-12 col-sm-3 col-md-2 col-lg-2">
								<div class="form-group securitycode">
									<label for="securitycode"><?php echo _("Security code"); ?></label>
									<input type="text" required name="securitycode" class="form-control" id="securitycode">
									<small class="error"><?echo _("Please type your security code");?></small>
								</div>
							</div>
							<div class="col col-xs-12 col-sm-5 col-md-6 col-lg-6">
								<div class="form-group postcode">
									<label for="postcode"><?php echo _("Postcode"); ?></label>
									<input type="text" required name="postcode" class="form-control" id="postcode">
									<small class="error"><?echo _("Please type your postcode");?></small>
								</div>
							</div>
						</div>
						<div class="form-group accept">
							<label class="checkbox-inline accept">
								<input type="checkbox" required name="accept" id="termsConditions" value="Y"><?php echo _("I have read accept the"); ?>  <a href="http://preoday.com/terms-service/"><?php echo _("terms of service"); ?></a> <?php echo _("and"); ?> <a href="http://preoday.com/privacy-policy-2/"><?php echo _("privacy policy"); ?></a><?php echo _(", including the terms regarding cookies"); ?>
								<small class="error"><?echo _("Your have accept tems & conditions for start using Preoday app.");?></small>
							</label>
						</div>
						<div class="form-group text-center">
							<button type="submit" value="Submit" class="btn btn-lg btn-primary"><?php echo _("Start using my Preoday app"); ?></button>
						</div>
						<div class="messages"></div>
					</form>
				</div>
			</div>
		</div>
	</div>

	<script type='text/javascript' src='<?echo $_SESSION['path']?>/js/beforeLogin/signup.js'></script>
