//global variables
map = null; // make google maps var global
mapDefaultCenterLat = 54.370559; // make google maps var global = set center as center of UK
mapDefaultCenterLong = -2.510376; // make google maps var global = set center as center of UK

//on page load fire these things!
$(document).ready(function() { 

	//STOP ENTER from FORM SUBMISSION for add event typeahead/////////////
	$('.noEnterSubmit').keypress(function(e){
		if ( e.which == 13 ) return false;
		//or...
		if ( e.which == 13 ) e.preventDefault();  //just need to give class="noEnterSubmit"
	}); 
	//////////////////////////////////////////////////////////////////////

	$("#signupForm").on('valid', function (event) {
		var url = "../code/signup/do_signup.php";

		$.ajax({
			   type: "POST",
			   url: url,
			   data: $(this).serialize(), // serializes the form's elements.
			   success: function(data)
			   {
					try
					{
						var dataArray = jQuery.parseJSON(data); //parsing JSON
					
					}
					catch(e)
					{
						noty({
						  type: 'error',
						  text: 'Connection Error! Check API endpoint.'
						});
						
						return false;
					}
					
					if(typeof dataArray['status'] !='undefined') //error
					{
						noty({
						  type: 'error',
						  text: dataArray['message']
						});
					}
					else
					{	
						$.post("/code/signup/save_session.php", 
						'bName='+dataArray['name']+'&bID='+dataArray['id']+'&email='+dataArray['owner']['email']+'&name='+dataArray['owner']['name']+'&id='+dataArray['owner']['id'],
						function(response){
							window.location.replace("/dashboard");
						})
						.fail(function(jqxhr) { 
							noty({
								type: 'error',
								text: 'Error: '+jqxhr.responseText	
							});
						});
					}
				}
			 });

		return false; // avoid to execute the actual submit of the form.
	});
	
	///////////////////////////////////////////////////////////////////////////////////////////////
	$("#signinForm").on('valid', function (event) {
		var url = "../code/signin/do_signin.php";

		$.ajax({
			   type: "POST",
			   url: url,
			   data: $(this).serialize(), // serializes the form's elements.
			   success: function(data)
			   {
					try
					{
						var dataArray = jQuery.parseJSON(data); //parsing JSON
					}
					catch(e)
					{
						noty({
						  type: 'error',
						  text: 'Connection Error! Check API endpoint.'
						});
						
						return false;
					}
					
					if(typeof dataArray['status'] !='undefined') //error
					{
						noty({
						  type: 'error',
						  text: dataArray['message']
						});
				   
					}
					else
					{	
						$.post("/code/signin/save_session.php", 
						'email='+dataArray['email']+'&name='+dataArray['name']+'&id='+dataArray['id'], 
						function(response){
							window.location.replace("/dashboard");
						})
						.fail(function(jqxhr) { 
							noty({
								type: 'error',
								text: 'Error: '+jqxhr.responseText	
							});
						});
					}
				}
			 });

		return false; // avoid to execute the actual submit of the form.
	});
	
	///////////////////////////////////////////////////////////////////////////////////////////////////
	$("#forgotPassForm").on('valid', function (event) {
		var url = "/code/shared/doForgot.php";

		$.ajax({
			   type: "POST",
			   url: url,
			   data: $(this).serialize(), // serializes the form's elements.
			   success: function(data)
			   {
					try
					{
						var dataArray = jQuery.parseJSON(data); //parsing JSON
					}
					catch(e)
					{
						noty({
						  type: 'error',
						  text: 'Connection Error! Check API endpoint.'
						});
						
						//alert(data);
						
						return false;
					}
					
					if(dataArray && typeof dataArray['status'] !='undefined') //error
					{
						noty({
						  type: 'error',
						  text: dataArray['message']
						});
				   
					}
					else
					{	
						noty({
						  type: 'success',
						  text: 'Success! Please check your email for further instructions.'
						});
						
						$('#forgotPassM').foundation('reveal', 'close');
					}
				}
			 });

		return false; // avoid to execute the actual submit of the form.
	});

	///////////////////////////////////////////////////////////////////////////////////////////////////

	//change language ajaxy button
	$("a.changeLang").on('click', function () {
		var newLang = $(this).attr('data-new-lang');
		$.post("/code/shared/changeLang.php", 'lang='+newLang, function() {window.location.reload();}); 
	});
	
	if($('#map').length > 0)
	{
		//options for the map
		var myOptions = {
			zoom: 5, //zoom level higher is further in
			center: new google.maps.LatLng(mapDefaultCenterLat,mapDefaultCenterLong), //set center as center of UK
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			minZoom: 3, //prevent zoom out that allows grey tiles
			streetViewControl: false, 
			scrollwheel: false, 
			panControl: true, 
			keyboardShortcuts: false,
			mapTypeControl: false
		}
		
		map = new google.maps.Map(document.getElementById("map"), myOptions);
		
		//create cool pins
		pinColor = "2288C1";
		pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
		new google.maps.Size(21, 34),
		new google.maps.Point(0,0),
		new google.maps.Point(10, 34));
		
		//Google Places autocomplete
		var input = document.getElementById('vSug');
		var options = {'types':[ 'establishment']}; //restricted only to business. We dont need country/street/area names now
		var autocomplete = new google.maps.places.Autocomplete(input, options);
		autocomplete.bindTo('bounds', map); //set the guesses to be bound around the map so closer to the location (i.e. UK)
		
		google.maps.event.addListener(autocomplete, 'place_changed', function() {
			place = autocomplete.getPlace();
			
			document.getElementById('vCode').value = place.geometry.location.toString();  
			
			if (place.geometry.viewport) {
				map.fitBounds(place.geometry.viewport);
			} 
			else {
				map.setCenter(place.geometry.location);
				map.setZoom(15);  
			}
			
			var address = '';
			if (place.address_components) {
			address = [(place.address_components[0] &&
						place.address_components[0].short_name || ''),
					   (place.address_components[1] &&
						place.address_components[1].short_name || ''),
					   (place.address_components[2] &&
						place.address_components[2].short_name || ''),
						(place.address_components[4] &&
						place.address_components[4].short_name || '')
					  ].join(', ');
			}
			
			//now to fix whats in venue address
			document.getElementById('vAdd').value = address;
			
			//now to fix whats in venue name
			document.getElementById('vName').value = place.name;

			marker = new google.maps.Marker({ 
				map: map, 
				animation: google.maps.Animation.DROP,
				icon: pinImage, 
				title: place.name+', '+address
			});
			  
			marker.setPosition(place.geometry.location);
			
			/* var contentString = '<div class="infobox-wrapper"><div class="infobox"><strong>'+place.name+'</strong><br/>'+address+'</div></div>';

			infobox = new InfoBox({
				content: contentString,
				disableAutoPan: false,
				maxWidth: 150,
				pixelOffset: new google.maps.Size(-140, 0),
				zIndex: null,
				boxStyle: {
					//background: "url('http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/examples/tipbox.gif') no-repeat",
					background: '#2E70B7',
					color: "#FFF",
					opacity: 0.75,
					width: "280px"
				},
				closeBoxMargin: "12px 4px 2px 2px",
				closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
				infoBoxClearance: new google.maps.Size(1, 1)
			}); 
			
			google.maps.event.addListener(marker, 'click', function () {
				infobox.open(map,marker);
			});	*/
		});
	}
	
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	$("#venueConfigForm").on('valid', function (event) {
		var url = "/code/dashboard/do_venueSave.php";

		$.ajax({
			   type: "POST",
			   url: url,
			   data: $(this).serialize(), // serializes the form's elements.
			   success: function(data)
			   {
					try
					{
						var dataArray = jQuery.parseJSON(data); //parsing JSON
					}
					catch(e)
					{
						noty({
						  type: 'error',
						  text: 'Connection Error! Check API endpoint.'
						});
						
						return false;
					}
					
					if(typeof dataArray['status'] !='undefined') //error
					{
						noty({
						  type: 'error',
						  text: dataArray['message']
						});
				   
					}
					else
					{	
						noty({ type: 'success', text: 'Venue changes have been saved!' });
						setTimeout(function(){window.location.replace("/dashboard");},1000);
					}
				}
			 });

		return false; // avoid to execute the actual submit of the form.
	});
	
	//ajax form upload
	var options = { 
		url: '/code/dashboard/doUploadLogo.php',
		success: function(responseText) { 
			noty({
			  type: 'success',
			  text: 'Uploaded!'
			});
			
			//alert(responseText);
			content="<img src='../img/logoUploads/"+responseText+"'/>";
			$('#appHeading').html(content);
			
			$('#picFileName').val(responseText);
		},
		error: function() { 
			noty({
			  type: 'error',
			  text: 'Error uploading file'
			});
		},
		beforeSubmit: function(arr, $form, options) { 
			var acceptedExts = new Array(".jpg",".jpeg",".png");
			var filename = $('#picFile').val();
			filename = filename.toLowerCase();
			if(searchArray(filename,acceptedExts))
				return true;
			else
			{
				noty({
				  type: 'error',
				  text: 'Incorrect Image File'
				});
				return false;
			}
		}
	};
	$('#logoUpForm').ajaxForm(options);
	
	$("[id^=thumb]").live('click', function() {
		$("[id^=thumb]").removeClass('selected');
		$(this).addClass('selected');
		var tID = $(this).attr('id');
		var wall = tID.replace("thumb","wall");
		var plainID = tID.replace("thumb","");
		var newImgSrc = "/img/wallpapers/" + wall + ".jpg";
		$("#phoneWallpaper").attr("src", newImgSrc);
		$("#wallPaperID").val(plainID);
	});
	
	$('#sugDrop li a').on('click', function() {
		var content = $(this).html();
		$('#aHeading').val(content);
		$("#appHeading").html(content);
	});
	
	$("#aHeading").bind('propertychange keyup input paste',function() {
		var content = $(this).val();
		$("#appHeading").html(content);
		$("#picFileName").val('');
	});
	
	$('#sugDrop2 li a').on('click', function() {
		var content = $(this).html();
		$('#aSubheading').val(content);
		$("#subHeading").html(content);
	});
	
	$("#aSubheading").bind('propertychange keyup input paste',function() {
		var content = $(this).val();
		$("#subHeading").html(content);
	});
	
	/* $('#textColour').minicolors({
		change: function(hex, opacity) {
			alert(hex);
		}
	}); */
	
	$('.visibleUpload, #logoReset').live('click', function() {
		$('.visibleUpload').toggle();
		$('.hiddenUpload').toggle();
	});
	
	$("#doLogoUp").live('click', function() {
		if($('#picFile').val()) $('#logoUpForm').submit();
		else noty({ type: 'error', text: 'Please choose a file' });
	});
	
	$("#logoReset").live('click', function() {
		var content = $("#aHeading").val()
		$("#appHeading").html(content);
		$("#picFileName").val('');
	});
	
	$('#appConfig1Sub').live('click', function() { $('#appConfigForm').submit(); });
	
	$("#appConfigForm").on('valid', function (event) {
		var url = "/code/dashboard/do_appConfig1.php";

		$.ajax({
			   type: "POST",
			   url: url,
			   data: $(this).serialize(), // serializes the form's elements.
			   success: function(data)
			   {
					try
					{
						var dataArray = jQuery.parseJSON(data); //parsing JSON
					}
					catch(e)
					{
						noty({
						  type: 'error',
						  text: 'Connection Error! Check API endpoint.'
						});
						
						return false;
					}
					
					if(typeof dataArray['status'] !='undefined') //error
					{
						noty({
						  type: 'error',
						  text: dataArray['message']
						});
				   
					}
					else
					{	
						noty({ type: 'success', text: 'App changes have been saved!' });
						setTimeout(function(){window.location.replace("/dashboard");},1000);
					}
				}
			 });

		return false; // avoid to execute the actual submit of the form.
	});
	
	$("#vTitle").bind('propertychange keyup input paste',function() {
		var content = $(this).val();
		$("#venTitle").html(content);
	});
	
	$("#appConfig2Form").on('valid', function (event) {
		var url = "/code/dashboard/do_appConfig2.php";

		$.ajax({
			   type: "POST",
			   url: url,
			   data: $(this).serialize(), // serializes the form's elements.
			   success: function(data)
			   {
					try
					{
						var dataArray = jQuery.parseJSON(data); //parsing JSON
					}
					catch(e)
					{
						noty({
						  type: 'error',
						  text: 'Connection Error! Check API endpoint.'
						});
						
						return false;
					}
					
					if(typeof dataArray['status'] !='undefined') //error
					{
						noty({
						  type: 'error',
						  text: dataArray['message']
						});
				   
					}
					else
					{	
						noty({ type: 'success', text: 'App changes have been saved!' });
						setTimeout(function(){window.location.replace("/dashboard");},1000);
					}
				}
			 });

		return false; // avoid to execute the actual submit of the form.
	});
	
	$('#menuConfigForm input').on('click', function(){
		$(this).val('');
	});
	
	//$('#menuConfigForm input').on('focusout', function(){
	//	if($(this).val()=='') $(this).val($(this).prop( 'defaultValue' ));
	//});
	
	$("#menuConfigForm").on('valid', function (e) {
		noty({ type: 'success', text: 'Saved!' });
	});
	
	$("[id^=delItem]").live('click', function() {
		var cID = $(this).attr('id');
		var cNum = cID.replace("delItem","");
		
		$("#optNameDiv"+cNum).remove();
		$("#optPriceDiv"+cNum).remove();
		$("#optDelDiv"+cNum).remove();
	});
	
	$("#changePassTrigger").live('click', function(e) {
		$('#passDiv').show();
		$('#changePassTrigger').hide();
		e.preventDefault();
		
	});
});

//functions to update phone/app preview
function updateTextColour(color)
{
	$("#appHeading").css('color', '#'+color);
	$("#venSubHeading").css('color', '#'+color);
	$("#subHeading").css('color', '#'+color);
}
function updateButtonColour(color)
{
	$("#buttonIMG").css('background', '#'+color);
}
function updateButtonTextColour(color)
{
	$("#buttonIMG").css('color', '#'+color);
}
function updateButton2Colour(color)
{
	$("#buttonIMG2").css('background', '#'+color);
}
function updateButton2TextColour(color)
{
	$("#buttonIMG2").css('color', '#'+color);
}
function updateButton3Colour(color)
{
	$(".menuMultiButton").css('background', '#'+color);
}
function updateButton3TextColour(color)
{
	$(".menuMultiButton").css('color', '#'+color);
}

//reset button in venueconfig form
function clearMapInput() {
	$('#vSug').val('');
	$('#vName').val('');
	$('#vAdd').val('');
	$('#vCode').val('');
	if (typeof marker != 'undefined') marker.setMap(null);
}

//search for key in array
function searchArray(string,array){
    var match = false;
    arrLength = array.length;
	while(arrLength--) 
	{
	   if (string.indexOf(array[arrLength])!=-1)
	   match = true;
	}
	return match;
}

//On window resize
//map resizing with window
$(window).resize(function(){
	google.maps.event.trigger(map, 'resize');
	if (typeof place != 'undefined') map.setCenter(place.geometry.location);
		else map.setCenter( new google.maps.LatLng(mapDefaultCenterLat,mapDefaultCenterLong) );
});