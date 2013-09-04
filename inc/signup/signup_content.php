<div class="row">
	<div class="large-6 columns small-centered large-centered">
		<form method="POST" action="/code/signup/do_signup.php" data-abide>
			<fieldset>
				<legend>Sign Up to PreoDay</legend>
				<div class="row">
					<div class="large-6 columns">
						<label>First Name</label>
						<input type="text" name="fName" placeholder="" required pattern="[a-zA-Z]+" tabindex=1>
						<small class="error">First Name is required and must be only letters.</small>
					</div>
					<div class="large-6 columns">
						<label>Last Name</label>
						<input type="text" name="lName" placeholder="" required pattern="[a-zA-Z]+" tabindex=2>
						<small class="error">Last Name is required and must be only letters.</small>
					</div>
				</div>
				<div class="row">
					<div class="large-12 columns">
						<label>Email</label>
						<input type="email" name="email" placeholder="" required tabindex=3>
						<small class="error">An email address is required.</small>
					</div>
				</div>
				
				<div class="row">
					<div class="large-12 columns">
						<label>Password</label>
						<input type="password" name="password" placeholder="" required tabindex=4>
						<small class="error">A password address is required. Atleast 8chars and must contain atleast 1 number and 1 uppercase letter.</small>
					</div>
				</div>
				
				<div class="row">
					<div class="large-12 columns">
						<label>Business Name</label>
						<input type="text" name="businessName" placeholder="" required pattern="[a-zA-Z]+" tabindex=5>
						<small class="error">A business name is required.</small>
					</div>
				</div>
				
				<div class="row">
					<div class="small-4 large-3 columns">
						<label>Notifications</label>
						<div class="switch small round"> 
							<input id="z" name="notification-switch" value="0" type="radio">
							<label for="z" onclick="">Off</label>

							<input id="z1" name="notification-switch" value="1" type="radio" checked>
							<label for="z1" onclick="">On</label>

							<span></span>
						</div>
					</div>
				</div>
				
				<div class="row">
					<div class="large-12 columns small-centered large-centered text-center">
						<small>By clicking 'Sign Up' you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.</label></small>
					</div>
				</div>
				
				<br/>
				
				<div class="row">
					<div class="small-8 large-5 columns small-centered large-centered">
						<button type="submit" class="large button success radius" tabindex=6>Sign Up</button>
					</div>
				</div>
			</fieldset>
		</form>
	</div>
</div>