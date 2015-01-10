<div class="sections sign-in">
	<div class="bg"></div>
	<div class="container">
		<div class="row">
			<div class="col col-sm-offset-1 col-xs-12 col-sm-10">
				<div class="col col-sm-offset-2 col-md-offset-3 col-xs-12 col-sm-8 col-md-6">
					<div class="bs-callout text-center">
						<h3><?echo $_SESSION['OVERRIDES']['sign_in_message'];?></h3>
						<form class="form" method="POST" role="form" id="signinForm" data-abide>
						  	<div class="row">
								<div class="col col-xs-12 text-left">
								  	<div class="form-group emailaddress">
								  		<label for="emailaddress"><?echo _("Email address");?></label>
								    	<input type="text" name="email" required class="form-control" id="email" pattern='^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$' />
								    	<small class="error"><?echo _("Please type a valid email address");?></small>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col col-xs-12 text-left">
									<div class="form-group password">
									  	<label for="password"><?echo _("Password");?></label>
									    <input type="password" name="password" required class="form-control" >
									    <small class="error"><?echo _("Please type your password");?></small>
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
					<div class="text-center">
					<a href="<?echo $_SESSION['path'];?>/forgot"><?echo _("I forgot my password");?></a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>