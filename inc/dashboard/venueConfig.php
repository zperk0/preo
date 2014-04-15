<div class="row">
	<div class="topSpacer"></div>
	<?if(isset($_SESSION['signupWizFlag']) && $_SESSION['signupWizFlag']){ ?>
	<nav class="breadcrumbs row--space1d">
		<a class="current"	   href="#"><? echo _("Venue Information");?></a>
		<?if(!$_SESSION['noAppFlag-1']){?>
			<a href="<?echo $_SESSION['path']?>/homescreen"><? echo _("App Styling 1/2");?></a>
		<?}else{?>
			<a class="unavailable" href="#"><? echo _("App Styling 1/2");?></a>
		<?}?>
		<?if(!$_SESSION['noAppFlag-2']){?>
			<a href="<?echo $_SESSION['path']?>/menuscreen"><? echo _("App Styling 2/2");?></a>
		<?}else{?>
			<a class="unavailable" href="#"><? echo _("App Styling 2/2");?></a>
		<?}?>
		<?if(!$_SESSION['noMenuFlag']){?>
			<a href="<?echo $_SESSION['path']?>/menus/<?echo $_SESSION['menus'][0]['id'];?>?r=1"><? echo _("Menu Creation");?></a>
		<?}else{?>
			<a class="unavailable" href="#"><? echo _("Menu Creation");?></a>
		<?}?>
		<?if(!$_SESSION['noEHFlag']){?>
			<?if(isset($_SESSION['venue_eventFlag']) && $_SESSION['venue_eventFlag']){?><a href="<?echo $_SESSION['path']?>/events?r=1"><? echo _("Events");?></a>
			<?}else{?><a href="<?echo $_SESSION['path']?>/openinghours?r=1"><? echo _("Opening Hours");?></a><?}?>
		<?}else{?>
			<?if(isset($_SESSION['venue_eventFlag']) && $_SESSION['venue_eventFlag']){?><a class="unavailable" href="#"><? echo _("Events");?></a>
			<?}else{?><a class="unavailable" href="#"><? echo _("Opening Hours");?></a><?}?>
		<?}?>
		
		<?if(!$_SESSION['noPaymentFlag']){?>
			<a href="<?echo $_SESSION['path']?>/payment"><? echo _("Payment Method");?></a>
		<?}else{?>
			<a class="unavailable" href="#"><? echo _("Add a Payment");?></a>
		<?}?>
		
		<a class="unavailable" href="#"><? echo _("Done");?></a>
	</nav>
	<?}?>
</div>
	<form id="venueConfigForm" method="POST" class="custom" data-abide>
	<div class="row">
		<h1 class="alignHeader"><?echo _("Tell us about your venue");?></h1>
		<input type="hidden" id="redirectFlag" value="<?echo $redirectFlag;?>"/>
	</div>
	<div class='large-collumns-wrapper'>
		<div class="large-6 columns">
			
			
			<div class="row">
				<div class="large-12 columns">
					<label><?echo _("Venue name");?></label>
					<input type="text" name="vName" id="vName" required tabindex=1 value="<?if(isset($_SESSION['venue_name'])) echo $_SESSION['venue_name'];?>" pattern="^.{0,99}$">
					<small class="error"><?echo _("Please type a venue name (max 100chars)");?></small>
				</div>
			</div>
			
						<div class="row">
				<div class="large-12 columns">
					<label><?echo _("Venue description");?>&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("Please enter a short description about your venue.<br/><br/>This will not appear on your branded app.");?>"></i></label>
					<textarea name="vDesc" required tabindex=2 pattern="^.{0,250}$"><?if(isset($_SESSION['venue_desc'])) echo $_SESSION['venue_desc'];?></textarea>
					<small class="error"><?echo _("Please type a venue description (max 250chars)");?></small>
				</div>
			</div>

			<div class="row">
				<div class="large-12 columns">
					<label><?echo _("What type of venue are you?");?></label>
					<select name="vCat" class="dropdown pdDropdown" tabindex=3>
						<option value="1"	<?if(isset($_SESSION['venue_cat']) && $_SESSION['venue_cat']=='1')	{?>selected="selected"<?}?>><? echo _("Sports Arena");?></option>
						<option value="2"	<?if(isset($_SESSION['venue_cat']) && $_SESSION['venue_cat']=='2')	{?>selected="selected"<?}?>><? echo _("Bars, Pubs and Clubs");?></option>
						<option value="3"	<?if(isset($_SESSION['venue_cat']) && $_SESSION['venue_cat']=='3')	{?>selected="selected"<?}?>><? echo _("Workplace/Education Catering");?></option>
						<option value="4"	<?if(isset($_SESSION['venue_cat']) && $_SESSION['venue_cat']=='4')	{?>selected="selected"<?}?>><? echo _("Retail Catering (Cafe, Sandwich Bar, Restaurant, etc)");?></option>
						<option value="5" 	<?if(isset($_SESSION['venue_cat']) && $_SESSION['venue_cat']=='5')	{?>selected="selected"<?}?>><? echo _("Music and Cultural");?></option>
					</select>
				</div>
			</div>
			
			<div class="row">
				<div class="large-12 columns">
					<label><?echo _("Are you primarily an events based business?");?> &nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<? echo _("Does your business revolve around regular events, e.g. football matches, performances, etc?");?>"></i></label>
					<div class="switch small large-2 columns eventFlagNoti"> 
						<input name="vEvent" value="0" type="radio" <?if((isset($_SESSION['venue_eventFlag']) && !$_SESSION['venue_eventFlag']) || !isset($_SESSION['venue_eventFlag'])){?>checked<?}?>>
						<label class="no"><?echo _("No");?></label>

						<input name="vEvent" value="1" type="radio" <?if((isset($_SESSION['venue_eventFlag']) && $_SESSION['venue_eventFlag'])){?>checked<?}?>>
						<label class="yes"><?echo _("Yes");?></label>

						<span></span>
					</div>
				</div>
			</div>
			
			<div class="row cSlotDiv hide"><!--<?if((isset($_SESSION['venue_eventFlag']) && $_SESSION['venue_eventFlag'])){?>hide<?}?>">-->
				<div class="large-12 columns">
					<label><?echo _("Collection Slot Duration (mins)");?>&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("This is the number of minutes after opening time and before closing time when customers are allowed to collect orders.");?>"></i></label>
					<input type="text" name="cDuration" id="cDuration" tabindex=4 value="5" placeholder="<?echo _("eg: 30");?>" value="<?if(isset($_SESSION['venue_collectinterval'])) echo $_SESSION['venue_collectinterval'];?>" >
					<small class="error"><?echo _("Please provide a duration in mins");?></small>
				</div>
			</div>
			
			<div class="row leadTimeDiv <?if((isset($_SESSION['venue_eventFlag']) && $_SESSION['venue_eventFlag'])){?>hide<?}?>">
				<div class="large-12 columns">
					<label><?echo _("Default preparation time for collection orders (mins)");?>&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("The time it takes to prepare your order before the customer can pick it up.");?>"></i></label>
					<input type="text" name="leadtime" id="leadtime" tabindex=5 placeholder="<?echo _("e.g. 25");?>" value="<?if(isset($_SESSION['venue_leadtime'])) echo $_SESSION['venue_leadtime'];?>" <?if(!isset($_SESSION['venue_eventFlag']) || (isset($_SESSION['venue_eventFlag']) && !$_SESSION['venue_eventFlag'])){?>required<?}?> pattern="^\d+$">
					<small class="error"><?echo _("Please provide a lead time");?></small>
				</div>
			</div>

			<div class="row">
				<div class="large-12 columns">
					<label><?echo _("Minimum value for orders");?>&nbsp;</label>
					<input type="text" name="vOrderMin" id="vOrderMin" tabindex=6 required placeholder="<?echo _("e.g. 5");?>" value="<?if(isset($_SESSION['venue_order_min'])) echo $_SESSION['venue_order_min'];?>" pattern="^\d+$">
					<small class="error"><?echo _("Please provide a minimum value for ordering");?></small>
				</div>
			</div>
			
			<div class="row discountCollection">
				<div class="large-12 columns">
					<label><?echo _("Discount offered for collection orders (%)");?>&nbsp;</label>
					<input type="text" name="vDiscount" id="vDiscount" tabindex=6 required placeholder="<?echo _("e.g. 10");?>" value="<?if(isset($_SESSION['venue_discount'])) echo $_SESSION['venue_discount'];?>" pattern="^(0?[0-9]?[0-9]|100)$">
					<small class="error"><?echo _("Please provide a discount percentage (between 0 and 100)");?></small>
				</div>
			</div>
			
			<div class="row">
				<div class="large-12 columns">
					<label><?echo _("Does your venue do home or office delivery?");?> &nbsp;</label>
					<div class="switch small large-2 columns venueHasDelivery"> 
						<input name="vDelivery" value="0" type="radio" <?if((isset($_SESSION['venue_deliveryFlag']) && !$_SESSION['venue_deliveryFlag']) || !isset($_SESSION['venue_deliveryFlag'])){?>checked<?}?>>
						<label class="no"><?echo _("No");?></label>

						<input name="vDelivery" value="1" type="radio" <?if((isset($_SESSION['venue_deliveryFlag']) && $_SESSION['venue_deliveryFlag'])){?>checked<?}?>>
						<label class="yes"><?echo _("Yes");?></label>

						<span></span>
					</div>
				</div>
			</div>
			

		</div>
		<div class="large-6 columns hide-for-small">
	<div class="row">
	<div class="large-12 columns">
		<label><?echo _("Address");?></label>
		<input type="text" name="vAdd" id="vAdd" required tabindex=7 value="<?if(isset($_SESSION['venue_address'])) echo $_SESSION['venue_address'];?>" pattern="^.{0,250}$">
		<input type="hidden" name="vCode" id="vCode" value="<?if(isset($_SESSION['venue_latitude']) && isset($_SESSION['venue_longitude']))  echo "(".$_SESSION['venue_latitude'].", ".$_SESSION['venue_longitude'].")"; else echo "(0, 0)";?>">
		<input type="text" name="vAdd2" id="vAdd2"  tabindex=8 value="<?if(isset($_SESSION['venue_address2'])) echo $_SESSION['venue_address2'];?>" pattern="^.{0,250}$">
		<input type="text" name="vAdd3" id="vAdd3"  tabindex=9 value="<?if(isset($_SESSION['venue_address3'])) echo $_SESSION['venue_address3'];?>" pattern="^.{0,250}$">
		
		<small class="error"><?echo _("Please type a venue address (max 250chars)");?></small>
	</div>
</div>

<div class="row">
	<div class="large-12 columns">
		<label><?echo _("Town/City");?></label>
		<input type="text" name="vTown" id="vTown" required tabindex=10 value="<?if(isset($_SESSION['venue_town'])) echo $_SESSION['venue_town'];?>" pattern="^.{0,45}$">
		<small class="error"><?echo _("Please type a Town/City (max 45chars)");?></small>
	</div>
</div>


<div class="row">
	<div class="large-12 columns">
		<label><?echo _("Country");?></label>
		<select id="vCountry" name="vCountry" class="pdDropdown" required>
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
			<div class="large-6 columns">
				<label><?echo _("Post code");?></label>
				<input type="text" name="vPostal" id="vPostal" required tabindex=11 value="<?if(isset($_SESSION['venue_postcode'])) echo $_SESSION['venue_postcode'];?>" pattern="^.{0,45}$">
				<small class="error"><?echo _("Please type a post code (max 45chars)");?></small>
			</div>
		</div>

		<div class="row">
					<div class="large-12 columns">
						<label><?echo _("Language");?></label>
						<select id="language" name="language" class="pdDropdown" required tabindex=12>
							<option <?if(isset($_SESSION['venue_language']) && $_SESSION['venue_language'] == "EN"){?>selected="selected"<?}?> value="EN">English</option>												
							<option <?if(isset($_SESSION['venue_language']) && $_SESSION['venue_language'] == "DE"){?>selected="selected"<?}?> value="DE">German</option>									
						</select>
						<small class="error"><?echo _("Please select your language");?></small>
					</div>
				</div>
				
				<div class="row">
					<div class="large-12 columns">
						<label><?echo _("Timezone");?></label>
						<select id="timezone" name="timezone" class="pdDropdown" required tabindex=13>
						    <?php foreach(tz_list() as $t) {?>

						     <option value="<?php print $t['zone'] ?>"  <?if(isset($_SESSION['venue_timezone'])) { if ($_SESSION['venue_timezone'] == $t['zone']) {?>selected="selected"<?} } else {if ($t['zone'] == 'Europe/London') {?>selected="selected"<?}}     ?> >						      	
						        <?php print $t['diff_from_GMT'] . ' - ' . $t['zone'] ?>
						      </option>
						    <?php } ?>
						  </select>
						<small class="error"><?echo _("Please select your timezone");?></small>
					</div>
				</div>	

				<div class="row">
					<div class="large-12 columns">
						<label><?echo _("Currency");?></label>
						<select id="currency" name="currency" class="pdDropdown" required tabindex=7>				    
							<option <?if(isset($_SESSION['venue_currency']) && $_SESSION['venue_currency'] == "GBP"){?>selected="selected"<?}?> value="GBP">Pound Sterling</option> 
							<option <?if(isset($_SESSION['venue_currency']) && $_SESSION['venue_currency'] == "USD"){?>selected="selected"<?}?> value="USD">US Dollars</option> 
							<option <?if(isset($_SESSION['venue_currency']) && $_SESSION['venue_currency'] == "EUR"){?>selected="selected"<?}?> value="EUR">Euro</option> 
							
						</select>
						<small class="error"><?echo _("Please select your currency");?></small>
					</div>
				</div>		

		</div>
		<div class='clearFix'></div>
</div>
		<div class="large-12 small-12 columns advanced-setting <?if( ((isset($_SESSION['venue_deliveryFlag']) && !$_SESSION['venue_deliveryFlag'])) || !isset($_SESSION['venue_deliveryFlag']) ){?>hide<?}?>" id="advanced-setting">
			<div class="row">
				<div class="large-4  columns">
					<label>Delivery Zone</label><br>
					<input type="text" class="delivery_zone" name="dZone" id="dZone" placeholder='eg. "5 miles" or "NW1, NW2..."' tabindex="14" value="<?if(isset($_SESSION['delivery_zone'])) echo $_SESSION['delivery_zone'];?>">
				</div>
				<div class="large-1  columns">
					<label>Min.value order($)</label>
					<input type="text"  name="dMinVal" id="dMinVal" placeholder='0.00' tabindex="15" value="<?if(isset($_SESSION['delivery_order_min'])) echo $_SESSION['delivery_order_min'];?>">
				</div>
				<div class="large-1  columns">
					<label>Delivery charge($)</label>
					<input type="text"  name="dCharge" id="dCharge" placeholder='0.00' tabindex="16" value="<?if(isset($_SESSION['delivery_charge'])) echo $_SESSION['delivery_charge'];?>">
				</div>
				<div class="large-2  columns">
					<label>Free delivery for orders above($)</label>
					<input type="text" class="" name="dChargeBelow" id="dChargeBelow" placeholder='0.00' tabindex="17" value="<?if(isset($_SESSION['delivery_charge_below'])) echo $_SESSION['delivery_charge_below'];?>">
				</div>
				<div class="large-2  columns">
					<label>Default lead time for delivery(mins)</label>
					<input type="text" class="" name="dLeadTime" id="dLeadTime" placeholder='0.00' tabindex="18" value="<?if(isset($_SESSION['delivery_lead_time'])) echo $_SESSION['delivery_lead_time'];?>">
				</div>
				<div class="large-2 columns">
					<label>Discounted offered for delivery(%)</label>
					<input type="text" class="" name="vDeliveryDiscount" id="vDeliveryDiscount" placeholder='0.00' tabindex="19" value="<?if(isset($_SESSION['delivery_discount'])) echo $_SESSION['delivery_discount'];?>" pattern="^(0?[0-9]?[0-9]|100)$">
					<small class="error"><?echo _("Please provide a discount percentage (between 0 and 100)");?></small>
				</div>
			</div>
			<div class="row">
				<div class="large-7 columns">
					<label>Preset customer notifications, sent by email and push alert</label>
				</div>
				<div class="large-3 columns">
					<label>Short name</label>
				</div>
				<div class="large-1 columns"> 
					<label>Active</label>
				</div>
			</div>			
			<div class="row">
				<div class="large-7 columns">
					<input type="text" class="" name="cusNotif1" id="cusNotif1" placeholder='eg."Your order is running 15 mins late"' tabindex=20  value="<?if(isset($_SESSION['content1'])) echo $_SESSION['content1'];?>"/>
				</div>
				<div class="large-3 columns">
					<input type="text" class="" name="shortName1" id="shortName1" placeholder='eg.Late order' tabindex=21  value="<?if(isset($_SESSION['name1'])) echo $_SESSION['name1'];?>"/>
				</div>
				<div class="large-2 columns">
					<div class="switch small large-6 columns eventFlagNoti1 float-right"> 
					<input name="active1" id="active1"  value="0" type="radio" <?if((isset($_SESSION['active1']) && !$_SESSION['active1']) || !isset($_SESSION['active1'])){?>checked<?}?>>
					<label class="no"><?echo _("No");?></label>

					<input name="active1" id="active1" value="1" type="radio" <?if((isset($_SESSION['active1']) && $_SESSION['active1'])){?>checked<?}?>>
					<label class="yes"><?echo _("Yes");?></label>

					<span></span>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="large-7 columns">
					<input type="text" class="" tabindex=23 name="cusNotif2" id="cusNotif2" placeholder='eg."Your order is on its way"'  value="<?if(isset($_SESSION['content2'])) echo $_SESSION['content2'];?>"/>
				</div>
				<div class="large-3 columns">
					<input type="text" class="" tabindex=24 name="shortName2" id="shortName2" placeholder='eg.En-router'  value="<?if(isset($_SESSION['name2'])) echo $_SESSION['name2'];?>"/>
				</div>
				<div class="large-2 columns">
					<div class="switch small large-6 columns eventFlagNoti2 float-right"> 
					<input name="active2" id="active2" value="0" type="radio" <?if((isset($_SESSION['active2']) && !$_SESSION['active2']) || !isset($_SESSION['active2'])){?>checked<?}?>>
					<label class="no"><?echo _("No");?></label>

					<input name="active2" id="active2" value="1" type="radio" <?if((isset($_SESSION['active2']) && $_SESSION['active2'])){?>checked<?}?>>
					<label class="yes"><?echo _("Yes");?></label>

					<span></span>
					</div>
				</div>		
			</div>

			<div class="row">
				<div class="large-7 columns">
					<input type="text" class="" tabindex=25 name="cusNotif3" id="cusNotif3" placeholder='eg."There is a problem with your order. Please call us"'  value="<?if(isset($_SESSION['content3'])) echo $_SESSION['content3'];?>"/>
				</div>
				<div class="large-3 columns">
					<input type="text" class="" tabindex=26 name="shortName3" id="shortName3" placeholder='eg.Call us'  value="<?if(isset($_SESSION['name3'])) echo $_SESSION['name3'];?>"/>
				</div>
				<div class="large-2 columns">
					<div class="switch small large-6 columns eventFlagNoti3 float-right"> 
					<input name="active3" id="active3" value="0" type="radio" <?if((isset($_SESSION['active3']) && !$_SESSION['active3']) || !isset($_SESSION['active3'])){?>checked<?}?>>
					<label class="no"><?echo _("No");?></label>

					<input name="active3" id="active3" value="1" type="radio" <?if((isset($_SESSION['active3']) && $_SESSION['active3'])){?>checked<?}?>>
					<label class="yes"><?echo _("Yes");?></label>

					<span></span>
					</div>
				</div>			
			</div>
			<div class="row">
				<div class="large-7 columns">
					<label>Preset order rejection notifications, sent by email  and push alert</label>
				</div>
				<div class="large-3 columns">
					<label>Short name</label>
				</div>
				<div class="large-1 columns"> 
					<label>Active</label>
				</div>
			</div>			
			<div class="row">
				<div class="large-7 columns">
					<input type="text" class="" tabindex=27 name="cusNotif4" id="cusNotif4" placeholder='eg."Your address is out of our delivery  zone"'  value="<?if(isset($_SESSION['content4'])) echo $_SESSION['content4'];?>"/>
				</div>
				<div class="large-3 columns">
					<input type="text" class="" tabindex=28 name="shortName4" id="shortName4" placeholder='eg.Out of zone'  value="<?if(isset($_SESSION['name4'])) echo $_SESSION['name4'];?>"/>
				</div>
				<div class="large-2 columns">
					<div class="switch small large-6 columns eventFlagNoti4 float-right"> 
					<input name="active4" id="active4"  value="0" type="radio" <?if((isset($_SESSION['active4']) && !$_SESSION['active4']) || !isset($_SESSION['active4'])){?>checked<?}?>>
					<label class="no"><?echo _("No");?></label>

					<input name="active4" id="active4" value="1" type="radio" <?if((isset($_SESSION['active4']) && $_SESSION['active4'])){?>checked<?}?>>
					<label class="yes"><?echo _("Yes");?></label>

					<span></span>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="large-7 columns">
					<input type="text" class="" tabindex=29 name="cusNotif5" id="cusNotif5" placeholder='eg."Sorry, that item  is out of stock"'  value="<?if(isset($_SESSION['content5'])) echo $_SESSION['content5'];?>"/>
				</div>
				<div class="large-3 columns">
					<input type="text" class="" tabindex=30 name="shortName5" id="shortName5" placeholder='eg.Out of stock'  value="<?if(isset($_SESSION['name5'])) echo $_SESSION['name5'];?>"/>
				</div>
				<div class="large-2 columns">
					<div class="switch small large-6 columns eventFlagNoti5 float-right"> 
					<input name="active5" id="active5" value="0" tabindex=31 type="radio" <?if((isset($_SESSION['active5']) && !$_SESSION['active5']) || !isset($_SESSION['active5'])){?>checked<?}?>>
					<label class="no"><?echo _("No");?></label>

					<input name="active5" id="active5" value="1" type="radio" tabindex=32 <?if((isset($_SESSION['active5']) && $_SESSION['active5'])){?>checked<?}?>>
					<label class="yes"><?echo _("Yes");?></label>

					<span></span>
					</div>
				</div>		
			</div>

			<div class="row">
				<div class="large-7 columns">
					<input type="text" class="" name="cusNotif6" tabindex=33 id="cusNotif6" placeholder='eg."Sorry, Your order has been rejected. Please call us"'  value="<?if(isset($_SESSION['content6'])) echo $_SESSION['content6'];?>"/>
				</div>
				<div class="large-3 columns">
					<input type="text" class="" name="shortName6"  tabindex=34 id="shortName6" placeholder='eg.Call us'  value="<?if(isset($_SESSION['name6'])) echo $_SESSION['name6'];?>"/>
				</div>
				<div class="large-2 columns">
					<div class="switch small large-6 columns eventFlagNoti6 float-right"> 
					<input name="active6" id="active6" value="0" type="radio" <?if((isset($_SESSION['active6']) && !$_SESSION['active6']) || !isset($_SESSION['active6'])){?>checked<?}?>>
					<label class="no"><?echo _("No");?></label>

					<input name="active6" id="active6" value="1" type="radio" <?if((isset($_SESSION['active6']) && $_SESSION['active6'])){?>checked<?}?>>
					<label class="yes"><?echo _("Yes");?></label>

					<span></span>
					</div>
				</div>			
			</div>
			<div class="row">
				<div class="large-4 columns">
					<label>In case of customer queries, contact</label>
					<input type="text" name="contactInfo" id="contactInfo" tabindex=35 placeholder="01234 567890" value="<?if(isset($_SESSION['delivery_phone'])) echo $_SESSION['delivery_phone'];?>"/>
				</div>
			</div>
		</div><!-- advanced setting -->

		<div class="row row--space1">
			<div class="small-12 large-12 columns">
				<button id="venueSave" type="submit" tabindex=36><?echo _("SAVE CHANGES");?></button>
				<button id="savingButton" class="hide secondary" type="button"><?echo _("SAVING...");?></button>
			</div>
		</div>
	</form>
<?if((isset($_SESSION['signupWizFlag']) && $_SESSION['signupWizFlag'])){?>
<!-- Now we update progressBar tooltip, width and trigger mouseover -->
<script type="text/javascript">
$(document).ready(function() {
	$('.progressIndicator').css('width','100%');
	$('.progressIndicator').attr('title', "15% done, keep going!");
	setTimeout(function() { $('.progressIndicator').trigger("mouseover"); }, 1100);
	setTimeout(function() { $('.progressIndicator').trigger("mouseout"); }, 7500);
});
</script>
<?}?>