<?if($fb_field_flag){?>
<script type="text/javascript">
$(document).ready(function(){
	noty({
	  type: 'success',
	  text: 'Now, we just need your business name.'
	});
});
</script>
<?}?>
<div class="row">
	<div class="topSpacer"></div>
	<h1 class="alignHeader"><?echo _("Get started");?></h1>
	<div class="large-12 columns socialMediaDiv <?if($fb_field_flag) echo 'hide';?>">
		<div class="row">
			<div class="large-6 columns fbSignup">
				<a href="<?php echo $authCodeUrl;?>"><span><?echo _("Signup using Facebook");?></span></a>
			</div>
		</div>
		<div class="row">
			<div class="large-6 columns googleSignup">
				<input type="hidden" id="userConsent" value="0"/>
				<span class="g-signin" data-callback="signinCallback" data-clientid="26773142567-ui0mkhms9iu18n82k3tegok0b0phnim6.apps.googleusercontent.com" 
						data-cookiepolicy="single_host_origin" data-scope="email profile"><?echo _("Signup using Google+");?></span>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="large-6 small-11 columns left row--space1u alignDiv">
			<form id="signupForm" method="POST" data-abide>
				<div class="row nameRow <?if($fb_field_flag) echo 'hide';?>">
					<div class="large-12 columns">
						<label><?echo _("First Name");?></label>
						<input type="text" id="fName" name="fName" placeholder="" <?if($fb_field_flag) echo "value='$fName'";?> required pattern="^.{0,99}$" tabindex=1>
						<small class="error"><?echo _("Please type your first name.(max 100chars)");?></small>
					</div>
					<div class="large-12 columns">
						<label><?echo _("Last Name");?></label>
						<input type="text" id="lName" name="lName" placeholder="" required <?if($fb_field_flag) echo "value='$lName'";?>  pattern="^.{0,99}$" tabindex=2>
						<small class="error"><?echo _("Please type your last name.(max 100chars)");?></small>
					</div>
				</div>
				<div class="row emailRow <?if($fb_field_flag) echo 'hide';?>">
					<div class="large-12 columns">
						<label><?echo _("Your email");?></label>
						<input type="email" id="email" name="email" placeholder=""  <?if($fb_field_flag) echo "value='$email' readonly='readonly'";?> required tabindex=3>
						<small class="error"><?echo _("Please type your email");?></small>
					</div>
				</div>
				
				<div class="row passRow <?if($fb_field_flag) echo 'hide';?>">
					<div class="large-12 columns">
						<label><?echo _("Create a password");?></label>
						<input type="password" name="password" id="passwordField" <?if($fb_field_flag) echo "value='".randomPassword()."'";?> required tabindex=4>
						<small class="error"><?echo _("Please type a password.");?></small>
					</div>
				</div>
				<?if(!$fb_field_flag){?>
				<div class="row passRow">
					<div class="large-12 columns">
						<label><?echo _("Confirm password");?></label>
						<input type="password" id="confPassword" required data-equalTo="passwordField" tabindex=5>
						<small class="error"><?echo _("Passwords don't match.");?></small>
					</div>
				</div>
				<?}?>
				<div class="row">
					<div class="large-12 columns">
						<label><?echo _("Your business name");?></label>
						<input type="text" name="businessName" placeholder="" required pattern="^.{0,99}$" tabindex=6>
						<small class="error"><?echo _("Please type your business name (max 100chars)");?></small>
					</div>
				</div>
				
				<div class="row">
					<div class="large-12 columns">
						<label><?echo _("Telephone Number");?></label>
						<input type="text" name="phone" placeholder="" required pattern="^.{0,99}$" tabindex=6>
						<small class="error"><?echo _("Please type your telephone number");?></small>
					</div>
				</div>
				
				<div class="row">
					<div class="large-12 columns">
						<label><?echo _("Country");?></label>
						<select id="country" name="country" class="pdDropdown" required tabindex=5>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "GB"){?>selected="selected"<?}?> value="GB">United Kingdom</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "AF"){?>selected="selected"<?}?> value="AF">Afghanistan</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "AX"){?>selected="selected"<?}?> value="AX">Aland Islands</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "AL"){?>selected="selected"<?}?> value="AL">Albania</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "DZ"){?>selected="selected"<?}?> value="DZ">Algeria</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "AS"){?>selected="selected"<?}?> value="AS">American Samoa</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "AD"){?>selected="selected"<?}?> value="AD">Andorra</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "AO"){?>selected="selected"<?}?> value="AO">Angola</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "AI"){?>selected="selected"<?}?> value="AI">Anguilla</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "AQ"){?>selected="selected"<?}?> value="AQ">Antarctica</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "AG"){?>selected="selected"<?}?> value="AG">Antigua and Barbuda</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "AR"){?>selected="selected"<?}?> value="AR">Argentina</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "AM"){?>selected="selected"<?}?> value="AM">Armenia</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "AW"){?>selected="selected"<?}?> value="AW">Aruba</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "AU"){?>selected="selected"<?}?> value="AU">Australia</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "AT"){?>selected="selected"<?}?> value="AT">Austria</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "AZ"){?>selected="selected"<?}?> value="AZ">Azerbaijan</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "BS"){?>selected="selected"<?}?> value="BS">Bahamas</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "BH"){?>selected="selected"<?}?> value="BH">Bahrain</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "BD"){?>selected="selected"<?}?> value="BD">Bangladesh</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "BB"){?>selected="selected"<?}?> value="BB">Barbados</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "BY"){?>selected="selected"<?}?> value="BY">Belarus</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "BE"){?>selected="selected"<?}?> value="BE">Belgium</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "BZ"){?>selected="selected"<?}?> value="BZ">Belize</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "BJ"){?>selected="selected"<?}?> value="BJ">Benin</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "BM"){?>selected="selected"<?}?> value="BM">Bermuda</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "BT"){?>selected="selected"<?}?> value="BT">Bhutan</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "BO"){?>selected="selected"<?}?> value="BO">Bolivia</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "BA"){?>selected="selected"<?}?> value="BA">Bosnia and Herzegovina</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "BW"){?>selected="selected"<?}?> value="BW">Botswana</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "BV"){?>selected="selected"<?}?> value="BV">Bouvet Island</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "BR"){?>selected="selected"<?}?> value="BR">Brazil</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "IO"){?>selected="selected"<?}?> value="IO">British Indian Ocean Territory</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "BN"){?>selected="selected"<?}?> value="BN">Brunei Darussalam</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "BG"){?>selected="selected"<?}?> value="BG">Bulgaria</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "BF"){?>selected="selected"<?}?> value="BF">Burkina Faso</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "BI"){?>selected="selected"<?}?> value="BI">Burundi</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "KH"){?>selected="selected"<?}?> value="KH">Cambodia</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "CM"){?>selected="selected"<?}?> value="CM">Cameroon</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "CA"){?>selected="selected"<?}?> value="CA">Canada</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "CV"){?>selected="selected"<?}?> value="CV">Cape Verde</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "KY"){?>selected="selected"<?}?> value="KY">Cayman Islands</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "CF"){?>selected="selected"<?}?> value="CF">Central African Republic</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "TD"){?>selected="selected"<?}?> value="TD">Chad</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "CL"){?>selected="selected"<?}?> value="CL">Chile</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "CN"){?>selected="selected"<?}?> value="CN">China</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "CX"){?>selected="selected"<?}?> value="CX">Christmas Island</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "CC"){?>selected="selected"<?}?> value="CC">Cocos (Keeling) Islands</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "CO"){?>selected="selected"<?}?> value="CO">Colombia</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "KM"){?>selected="selected"<?}?> value="KM">Comoros</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "CG"){?>selected="selected"<?}?> value="CG">Congo</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "CD"){?>selected="selected"<?}?> value="CD">Congo, The Democratic Republic of The</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "CK"){?>selected="selected"<?}?> value="CK">Cook Islands</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "CR"){?>selected="selected"<?}?> value="CR">Costa Rica</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "CI"){?>selected="selected"<?}?> value="CI">Cote D'ivoire</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "HR"){?>selected="selected"<?}?> value="HR">Croatia</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "CU"){?>selected="selected"<?}?> value="CU">Cuba</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "CY"){?>selected="selected"<?}?> value="CY">Cyprus</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "CZ"){?>selected="selected"<?}?> value="CZ">Czech Republic</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "DK"){?>selected="selected"<?}?> value="DK">Denmark</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "DJ"){?>selected="selected"<?}?> value="DJ">Djibouti</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "DM"){?>selected="selected"<?}?> value="DM">Dominica</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "DO"){?>selected="selected"<?}?> value="DO">Dominican Republic</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "EC"){?>selected="selected"<?}?> value="EC">Ecuador</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "EG"){?>selected="selected"<?}?> value="EG">Egypt</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "SV"){?>selected="selected"<?}?> value="SV">El Salvador</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "GQ"){?>selected="selected"<?}?> value="GQ">Equatorial Guinea</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "ER"){?>selected="selected"<?}?> value="ER">Eritrea</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "EE"){?>selected="selected"<?}?> value="EE">Estonia</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "ET"){?>selected="selected"<?}?> value="ET">Ethiopia</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "FK"){?>selected="selected"<?}?> value="FK">Falkland Islands (Malvinas)</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "FO"){?>selected="selected"<?}?> value="FO">Faroe Islands</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "FJ"){?>selected="selected"<?}?> value="FJ">Fiji</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "FI"){?>selected="selected"<?}?> value="FI">Finland</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "FR"){?>selected="selected"<?}?> value="FR">France</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "GF"){?>selected="selected"<?}?> value="GF">French Guiana</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "PF"){?>selected="selected"<?}?> value="PF">French Polynesia</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "TF"){?>selected="selected"<?}?> value="TF">French Southern Territories</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "GA"){?>selected="selected"<?}?> value="GA">Gabon</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "GM"){?>selected="selected"<?}?> value="GM">Gambia</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "GE"){?>selected="selected"<?}?> value="GE">Georgia</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "DE"){?>selected="selected"<?}?> value="DE">Germany</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "GH"){?>selected="selected"<?}?> value="GH">Ghana</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "GI"){?>selected="selected"<?}?> value="GI">Gibraltar</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "GR"){?>selected="selected"<?}?> value="GR">Greece</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "GL"){?>selected="selected"<?}?> value="GL">Greenland</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "GD"){?>selected="selected"<?}?> value="GD">Grenada</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "GP"){?>selected="selected"<?}?> value="GP">Guadeloupe</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "GU"){?>selected="selected"<?}?> value="GU">Guam</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "GT"){?>selected="selected"<?}?> value="GT">Guatemala</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "GG"){?>selected="selected"<?}?> value="GG">Guernsey</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "GN"){?>selected="selected"<?}?> value="GN">Guinea</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "GW"){?>selected="selected"<?}?> value="GW">Guinea-bissau</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "GY"){?>selected="selected"<?}?> value="GY">Guyana</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "HT"){?>selected="selected"<?}?> value="HT">Haiti</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "HM"){?>selected="selected"<?}?> value="HM">Heard Island and Mcdonald Islands</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "VA"){?>selected="selected"<?}?> value="VA">Holy See (Vatican City State)</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "HN"){?>selected="selected"<?}?> value="HN">Honduras</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "HK"){?>selected="selected"<?}?> value="HK">Hong Kong</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "HU"){?>selected="selected"<?}?> value="HU">Hungary</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "IS"){?>selected="selected"<?}?> value="IS">Iceland</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "IN"){?>selected="selected"<?}?> value="IN">India</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "ID"){?>selected="selected"<?}?> value="ID">Indonesia</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "IR"){?>selected="selected"<?}?> value="IR">Iran, Islamic Republic of</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "IQ"){?>selected="selected"<?}?> value="IQ">Iraq</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "IE"){?>selected="selected"<?}?> value="IE">Ireland</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "IM"){?>selected="selected"<?}?> value="IM">Isle of Man</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "IL"){?>selected="selected"<?}?> value="IL">Israel</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "IT"){?>selected="selected"<?}?> value="IT">Italy</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "JM"){?>selected="selected"<?}?> value="JM">Jamaica</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "JP"){?>selected="selected"<?}?> value="JP">Japan</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "JE"){?>selected="selected"<?}?> value="JE">Jersey</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "JO"){?>selected="selected"<?}?> value="JO">Jordan</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "KZ"){?>selected="selected"<?}?> value="KZ">Kazakhstan</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "KE"){?>selected="selected"<?}?> value="KE">Kenya</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "KI"){?>selected="selected"<?}?> value="KI">Kiribati</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "KP"){?>selected="selected"<?}?> value="KP">Korea, Democratic People's Republic of</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "KR"){?>selected="selected"<?}?> value="KR">Korea, Republic of</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "KW"){?>selected="selected"<?}?> value="KW">Kuwait</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "KG"){?>selected="selected"<?}?> value="KG">Kyrgyzstan</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "LA"){?>selected="selected"<?}?> value="LA">Lao People's Democratic Republic</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "LV"){?>selected="selected"<?}?> value="LV">Latvia</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "LB"){?>selected="selected"<?}?> value="LB">Lebanon</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "LS"){?>selected="selected"<?}?> value="LS">Lesotho</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "LR"){?>selected="selected"<?}?> value="LR">Liberia</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "LY"){?>selected="selected"<?}?> value="LY">Libyan Arab Jamahiriya</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "LI"){?>selected="selected"<?}?> value="LI">Liechtenstein</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "LT"){?>selected="selected"<?}?> value="LT">Lithuania</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "LU"){?>selected="selected"<?}?> value="LU">Luxembourg</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "MO"){?>selected="selected"<?}?> value="MO">Macao</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "MK"){?>selected="selected"<?}?> value="MK">Macedonia, The Former Yugoslav Republic of</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "MG"){?>selected="selected"<?}?> value="MG">Madagascar</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "MW"){?>selected="selected"<?}?> value="MW">Malawi</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "MY"){?>selected="selected"<?}?> value="MY">Malaysia</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "MV"){?>selected="selected"<?}?> value="MV">Maldives</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "ML"){?>selected="selected"<?}?> value="ML">Mali</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "MT"){?>selected="selected"<?}?> value="MT">Malta</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "MH"){?>selected="selected"<?}?> value="MH">Marshall Islands</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "MQ"){?>selected="selected"<?}?> value="MQ">Martinique</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "MR"){?>selected="selected"<?}?> value="MR">Mauritania</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "MU"){?>selected="selected"<?}?> value="MU">Mauritius</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "YT"){?>selected="selected"<?}?> value="YT">Mayotte</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "MX"){?>selected="selected"<?}?> value="MX">Mexico</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "FM"){?>selected="selected"<?}?> value="FM">Micronesia, Federated States of</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "MD"){?>selected="selected"<?}?> value="MD">Moldova, Republic of</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "MC"){?>selected="selected"<?}?> value="MC">Monaco</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "MN"){?>selected="selected"<?}?> value="MN">Mongolia</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "ME"){?>selected="selected"<?}?> value="ME">Montenegro</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "MS"){?>selected="selected"<?}?> value="MS">Montserrat</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "MA"){?>selected="selected"<?}?> value="MA">Morocco</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "MZ"){?>selected="selected"<?}?> value="MZ">Mozambique</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "MM"){?>selected="selected"<?}?> value="MM">Myanmar</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "NA"){?>selected="selected"<?}?> value="NA">Namibia</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "NR"){?>selected="selected"<?}?> value="NR">Nauru</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "NP"){?>selected="selected"<?}?> value="NP">Nepal</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "NL"){?>selected="selected"<?}?> value="NL">Netherlands</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "AN"){?>selected="selected"<?}?> value="AN">Netherlands Antilles</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "NC"){?>selected="selected"<?}?> value="NC">New Caledonia</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "NZ"){?>selected="selected"<?}?> value="NZ">New Zealand</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "NI"){?>selected="selected"<?}?> value="NI">Nicaragua</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "NE"){?>selected="selected"<?}?> value="NE">Niger</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "NG"){?>selected="selected"<?}?> value="NG">Nigeria</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "NU"){?>selected="selected"<?}?> value="NU">Niue</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "NF"){?>selected="selected"<?}?> value="NF">Norfolk Island</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "MP"){?>selected="selected"<?}?> value="MP">Northern Mariana Islands</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "NO"){?>selected="selected"<?}?> value="NO">Norway</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "OM"){?>selected="selected"<?}?> value="OM">Oman</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "PK"){?>selected="selected"<?}?> value="PK">Pakistan</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "PW"){?>selected="selected"<?}?> value="PW">Palau</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "PS"){?>selected="selected"<?}?> value="PS">Palestinian Territory, Occupied</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "PA"){?>selected="selected"<?}?> value="PA">Panama</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "PG"){?>selected="selected"<?}?> value="PG">Papua New Guinea</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "PY"){?>selected="selected"<?}?> value="PY">Paraguay</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "PE"){?>selected="selected"<?}?> value="PE">Peru</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "PH"){?>selected="selected"<?}?> value="PH">Philippines</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "PN"){?>selected="selected"<?}?> value="PN">Pitcairn</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "PL"){?>selected="selected"<?}?> value="PL">Poland</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "PT"){?>selected="selected"<?}?> value="PT">Portugal</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "PR"){?>selected="selected"<?}?> value="PR">Puerto Rico</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "QA"){?>selected="selected"<?}?> value="QA">Qatar</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "RE"){?>selected="selected"<?}?> value="RE">Reunion</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "RO"){?>selected="selected"<?}?> value="RO">Romania</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "RU"){?>selected="selected"<?}?> value="RU">Russian Federation</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "RW"){?>selected="selected"<?}?> value="RW">Rwanda</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "SH"){?>selected="selected"<?}?> value="SH">Saint Helena</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "KN"){?>selected="selected"<?}?> value="KN">Saint Kitts and Nevis</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "LC"){?>selected="selected"<?}?> value="LC">Saint Lucia</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "PM"){?>selected="selected"<?}?> value="PM">Saint Pierre and Miquelon</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "VC"){?>selected="selected"<?}?> value="VC">Saint Vincent and The Grenadines</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "WS"){?>selected="selected"<?}?> value="WS">Samoa</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "SM"){?>selected="selected"<?}?> value="SM">San Marino</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "ST"){?>selected="selected"<?}?> value="ST">Sao Tome and Principe</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "SA"){?>selected="selected"<?}?> value="SA">Saudi Arabia</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "SN"){?>selected="selected"<?}?> value="SN">Senegal</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "RS"){?>selected="selected"<?}?> value="RS">Serbia</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "SC"){?>selected="selected"<?}?> value="SC">Seychelles</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "SL"){?>selected="selected"<?}?> value="SL">Sierra Leone</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "SG"){?>selected="selected"<?}?> value="SG">Singapore</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "SK"){?>selected="selected"<?}?> value="SK">Slovakia</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "SI"){?>selected="selected"<?}?> value="SI">Slovenia</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "SB"){?>selected="selected"<?}?> value="SB">Solomon Islands</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "SO"){?>selected="selected"<?}?> value="SO">Somalia</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "ZA"){?>selected="selected"<?}?> value="ZA">South Africa</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "GS"){?>selected="selected"<?}?> value="GS">South Georgia and The South Sandwich Islands</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "ES"){?>selected="selected"<?}?> value="ES">Spain</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "LK"){?>selected="selected"<?}?> value="LK">Sri Lanka</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "SD"){?>selected="selected"<?}?> value="SD">Sudan</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "SR"){?>selected="selected"<?}?> value="SR">Suriname</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "SJ"){?>selected="selected"<?}?> value="SJ">Svalbard and Jan Mayen</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "SZ"){?>selected="selected"<?}?> value="SZ">Swaziland</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "SE"){?>selected="selected"<?}?> value="SE">Sweden</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "CH"){?>selected="selected"<?}?> value="CH">Switzerland</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "SY"){?>selected="selected"<?}?> value="SY">Syrian Arab Republic</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "TW"){?>selected="selected"<?}?> value="TW">Taiwan, Province of China</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "TJ"){?>selected="selected"<?}?> value="TJ">Tajikistan</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "TZ"){?>selected="selected"<?}?> value="TZ">Tanzania, United Republic of</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "TH"){?>selected="selected"<?}?> value="TH">Thailand</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "TL"){?>selected="selected"<?}?> value="TL">Timor-leste</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "TG"){?>selected="selected"<?}?> value="TG">Togo</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "TK"){?>selected="selected"<?}?> value="TK">Tokelau</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "TO"){?>selected="selected"<?}?> value="TO">Tonga</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "TT"){?>selected="selected"<?}?> value="TT">Trinidad and Tobago</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "TN"){?>selected="selected"<?}?> value="TN">Tunisia</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "TR"){?>selected="selected"<?}?> value="TR">Turkey</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "TM"){?>selected="selected"<?}?> value="TM">Turkmenistan</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "TC"){?>selected="selected"<?}?> value="TC">Turks and Caicos Islands</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "TV"){?>selected="selected"<?}?> value="TV">Tuvalu</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "UG"){?>selected="selected"<?}?> value="UG">Uganda</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "UA"){?>selected="selected"<?}?> value="UA">Ukraine</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "AE"){?>selected="selected"<?}?> value="AE">United Arab Emirates</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "US"){?>selected="selected"<?}?> value="US">United States</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "UM"){?>selected="selected"<?}?> value="UM">United States Minor Outlying Islands</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "UY"){?>selected="selected"<?}?> value="UY">Uruguay</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "UZ"){?>selected="selected"<?}?> value="UZ">Uzbekistan</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "VU"){?>selected="selected"<?}?> value="VU">Vanuatu</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "VE"){?>selected="selected"<?}?> value="VE">Venezuela</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "VN"){?>selected="selected"<?}?> value="VN">Viet Nam</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "VG"){?>selected="selected"<?}?> value="VG">Virgin Islands, British</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "VI"){?>selected="selected"<?}?> value="VI">Virgin Islands, U.S.</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "WF"){?>selected="selected"<?}?> value="WF">Wallis and Futuna</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "EH"){?>selected="selected"<?}?> value="EH">Western Sahara</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "YE"){?>selected="selected"<?}?> value="YE">Yemen</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "ZM"){?>selected="selected"<?}?> value="ZM">Zambia</option>
							<option <?if(isset($_SESSION['venue_country']) && $_SESSION['venue_country'] == "ZW"){?>selected="selected"<?}?> value="ZW">Zimbabwe</option>
						</select>
						<small class="error"><?echo _("Please choose a country");?></small>
						
						</div>
						
						
				</div>
				<div class="row">
					<div class="large-12 columns">
						<label><?echo _("Language");?></label>
						<select id="language" name="language" class="pdDropdown" required tabindex=5>
							<option <?if(isset($_SESSION['language']) && $_SESSION['language'] == "EN_GB"){?>selected="selected"<?}?> value="EN_GB">English (United Kingdom)</option>					
							<option <?if(isset($_SESSION['language']) && $_SESSION['language'] == "EN_US"){?>selected="selected"<?}?> value="EN_US">English (United States)</option>					
							<option <?if(isset($_SESSION['language']) && $_SESSION['language'] == "DE"){?>selected="selected"<?}?> value="DE">German</option>									
						</select>
						<small class="error"><?echo _("Please select your language");?></small>
					</div>
				</div>
				
				<div class="row">
					<div class="large-12 columns">
						<label><?echo _("Timezone");?></label>
						<select id="timezone" name="timezone" class="pdDropdown" required tabindex=5>
						    <?php foreach(tz_list() as $t) { ?>
						      <option value="<?php print $t['zone'] ?>">
						        <?php print $t['diff_from_GMT'] . ' - ' . $t['zone'] ?>
						      </option>
						    <?php } ?>
						  </select>
						<small class="error"><?echo _("Please select your timezone");?></small>
					</div>
				</div>
								
				
				<div class="row row--space1">
					<div class="large-12 columns small-centered large-centered">
						<small class="smallNot"><?echo _("By clicking 'Sign Up' you agree to our");?> <a href="#" data-reveal-id="termsM"><?echo _("Terms");?></a> <?echo _("and");?> <a href="#" data-reveal-id="privM"><?echo _("Privacy Policy");?></a>.</label></small>
					</div>
				</div>
			
				<div class="row">
					<div class="small-8 large-5 columns">
						<input type="hidden" name="fbid" <?if($fb_field_flag) echo "value='$fbId'"; else echo "value='0'";?>>
						<input type="hidden" id="gpid" name="gpid" value='0'>
						<button type="submit" tabindex=7><?echo _("SIGN UP");?></button>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>

<?if(isset($_GET['autoG']) && $_GET['autoG']=='1'){?>
<script type="text/javascript">
$(document).ready(function(){
	$('#userConsent').val('1');
	$('.g-signin').trigger('click');
});
</script>
<?}?>