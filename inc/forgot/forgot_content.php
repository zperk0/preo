	<div class="sections forgot-password">
		<div class="bg"></div>
		<div class="container">
			<div class="row">
				<div class="col col-sm-offset-1 col-xs-12 col-sm-10">
					<div class="col col-sm-offset-2 col-md-offset-3 col-xs-12 col-sm-8 col-md-6">
						<div class="bs-callout">
							<form class="form text-center" role="form" id="forgotPassForm" method="POST" data-abide>
								<h3><?echo _("Enter your email and we’ll send you a link to reset your password");?></h3>
							  	<div class="row">
									<div class="col col-xs-12 text-left">
									  	<div class="form-group emailaddress">
									  		<label for="emailaddress"><?echo _("Email address");?></label>
									    	<input type="text" name="emailaddress" class="form-control" required pattern='^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$' id="4">
									    	<small class="error"><?echo _("An email address is required.");?></small>
										</div>
									</div>
								</div>
							  	<div class="row">
							  		<div class="col col-xs-12">
									  	<div class="form-group text-center">
									  		<button type="submit" value="Submit" class="btn btn-block btn-fourth"><?echo _("Sign in");?></button>
									  	</div>
								  	</div>
								</div>
							  	<div class="messages"></div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<script type='text/javascript' src='<?echo $_SESSION['path']?>/js/beforeLogin/forgot.js'></script>