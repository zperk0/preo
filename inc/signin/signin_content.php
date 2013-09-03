<div class="row">
	<div class="large-6 columns small-centered large-centered">
		<form method="POST" action="/code/signin/do_signin.php" data-abide>
			<fieldset>
				<legend>Sign In to PreoDay</legend>
				<div class="row">
					<div class="large-12 columns">
						<label>Email</label>
						<input type="email" name="email" placeholder="" required tabindex=1>
						<small class="error">An email address is required.</small>
					</div>
				</div>
				
				<div class="row">
					<div class="large-12 columns">
						<label>Password</label>
						<input type="password" name="password" placeholder="" required tabindex=2>
						<small class="error">A password address is required.</small>
					</div>
				</div>
					
				<div class="row">
					<div class="large-12 columns small-centered large-centered text-center">
						<small><a href="#">Forgot your password</a>?</label></small>
					</div>
				</div>
				
				<br/>
				
				<div class="row">
					<div class="small-8 large-5 columns small-centered large-centered">
						<button type="submit" class="large button success radius" tabindex=3>Sign In</button>
					</div>
				</div>
			</fieldset>
		</form>
	</div>
</div>