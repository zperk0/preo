	<div class="sections grey sign-up">
		<div class="container">
			<div class="col col-lg-12">
				<h1 class="text-center"><?php echo _("Sign up with ") . $_SESSION['OVERRIDES']['title'] ?></h1>
				<div class="bs-callout">
					<form class="form text-left" role="form" id="signUpForm" data-abide enctype="multipart/form-data" data-inviteid="<?php echo $User->id?>">
						<h3><span class="no-icon no-1"></span><?php echo _("Basic information"); ?></h3>
						<div class="row">
							<div class="col col-xs-12 col-sm-6 col-md-6 col-lg-6">
								<div class="form-group firstname">
									<label for="firstname"><?php echo _("First name"); ?></label>
									<input type="text" name="firstname" required class="form-control" id="firstname" value="<?php echo $User->name?>" >
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
						<hr>
						<h3><span class="no-icon no-2"></span><?php echo _("Create your ") . $_SESSION['OVERRIDES']['title'] . _(" account"); ?></h3>
						<div class="row">
							<div class="col col-xs-12 col-sm-6 col-md-6 col-lg-6">
								<div class="form-group emailaddress">
									<label for="emailaddress"><?php echo _("Email address"); ?></label>
									<input type="text" name="emailaddress" value="<?php echo $User->email ?>"  required class="form-control" pattern='^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$' id="email">
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
						<div class="form-group accept">
							<label class="checkbox-inline accept">
								<input type="checkbox" required name="accept" id="termsConditions" ><?php echo _("I have read accept the"); ?>  <a href="<?php echo $_SESSION['OVERRIDES']["terms"] ?>" target="_blank"><?php echo _("terms of service"); ?></a> <?php echo _("and"); ?> <a href="<?php echo $_SESSION['OVERRIDES']["privacy"] ?>" target="_blank"><?php echo _("privacy policy"); ?></a><?php echo _(", including the terms regarding cookies"); ?>
								<small class="error"><?echo _("Your have accept tems & conditions for start using ") . $_SESSION['OVERRIDES']['title'] . _(" app.");?></small>
							</label>
						</div>
						<div class="readMessage" id="errorStripe"></div>
						<div class="separator"></div>
						<div class="form-group text-center">
							<button type="submit" value="Submit" id="btnStartPreodayApp" class="btn btn-lg btn-primary"><?php echo _("Start using my ") . $_SESSION['OVERRIDES']['title'] . _(" app"); ?></button>
						</div>
						<div class="messages"></div>
					</form>
				</div>
			</div>
		</div>
	</div>

<script>
	$("#signUpForm").on('valid', function () {

		if (!$('#termsConditions').is(':checked')) {
			noty({
			  type: 'error',  layout: 'topCenter',
			  text: _tr("You must accept the terms and conditions")
			});
			return false;
		}
		$('#loading').show();
		var url = "/doInvite";
		console.log("posting")
		$.ajax({
		   type: "POST",
		   url: url,
		   dataType : "json",
		   data:{
		   		user: {
		   			"accountId": $('#signUpForm').data('accountid'),
				    "firstName": $('#firstname').val(),
				    "lastName": $('#surname').val(),
				    "email": $('#email').val(),
				    "password": $('#password').val()
		   		},
		   		inviteId: $('#signUpForm').data('inviteid')
			  },
		   success: function(data)
		   {
		   		if (data instanceof Object && data.status == undefined) {
						window.location.href = "/dashboard";
		   		} else {
		   			$('#loading').hide();
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: _tr("Sorry, but there's been an error processing your request.")
						});
						return false;
		   		}
			},  error: function (data) {
				if (data instanceof Object) {
					$('#loading').hide();
					if (data.status == 401 && data.responseJSON.message.indexOf('APIUserToken') !== -1) {
						notifyAndRedirect('success',_tr("This email address already exists, please sign in to access your dashboard."),2000,'/login');
					}
				}
			}
		 });

	});


</script>