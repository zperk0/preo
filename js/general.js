/* BESPOKE JS BELOW GENERAL.JS */

//global variables
map = null; // make google maps var global
mapDefaultCenterLat = 54.370559; // make google maps var global = set center as center of UK
mapDefaultCenterLong = -2.510376; // make google maps var global = set center as center of UK
nowTemp = new Date();
now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
submitTime = 0;

Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};

/**
 * jQuery alterClass plugin
 *
 * Remove element classes with wildcard matching. Optionally add classes:
 *   $( '#foo' ).alterClass( 'foo-* bar-*', 'foobar' )
 *
 * Copyright (c) 2011 Pete Boere (the-echoplex.net)
 * Free under terms of the MIT license: http://www.opensource.org/licenses/mit-license.php
 *
 */
(function ( $ ) {
	
$.fn.alterClass = function ( removals, additions ) {
	
	var self = this;
	
	if ( removals.indexOf( '*' ) === -1 ) {
		// Use native jQuery methods if there is no wildcard matching
		self.removeClass( removals );
		return !additions ? self : self.addClass( additions );
	}
 
	var patt = new RegExp( '\\s' + 
			removals.
				replace( /\*/g, '[A-Za-z0-9-_]+' ).
				split( ' ' ).
				join( '\\s|\\s' ) + 
			'\\s', 'g' );
 
	self.each( function ( i, it ) {
		var cn = ' ' + it.className + ' ';
		while ( patt.test( cn ) ) {
			cn = cn.replace( patt, ' ' );
		}
		it.className = $.trim( cn );
	});
 
	return !additions ? self : self.addClass( additions );
};
 
})( jQuery );

//on page load fire these things!
$(document).ready(function() { 
	//This really should be part of jQuery
	$.fn.exists = function(){return this.length>0;}
	
	//left-right slies
	$.fn.slideLeftHide = function(speed, callback) { 
		this.animate({ 
			width: "hide", 
			paddingLeft: "hide", 
			paddingRight: "hide", 
			marginLeft: "hide", 
			marginRight: "hide" 
		}, speed, callback);
	}

	$.fn.slideLeftShow = function(speed, callback) { 
		this.animate({ 
			width: "show", 
			paddingLeft: "show", 
			paddingRight: "show", 
			marginLeft: "show", 
			marginRight: "show" 
		}, speed, callback);
	}

	//STOP ENTER from FORM SUBMISSION for add event typeahead/////////////
	$(".noEnterSubmit").keypress(function(e){
		if ( e.which == 13 ) return false;
		//or...
		if ( e.which == 13 ) e.preventDefault();  //just need to give class="noEnterSubmit"
	}); 
	//////////////////////////////////////////////////////////////////////

	$("#signupForm").on('valid', function (event) {
		var url = "/doSignUp";

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
						  type: 'error',  layout: 'topCenter',
						  text: _tr("Sorry, but there's been an error processing your request.") /*text: 'Connection Error! Check API endpoint.'*/
						});
						//alert(data);
						
						return false;
					}
					
					if(typeof dataArray['status'] !='undefined') //error
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: dataArray['message'] 
						});
					}
					else
					{	
						$.post("/saveSignUp", 
						'bName='+dataArray['name']+'&bID='+dataArray['id']+'&email='+encodeURIComponent(dataArray['owner']['email'])+'&fName='+dataArray['owner']['firstName']+'&lName='+dataArray['owner']['lastName']+'&id='+dataArray['owner']['id'],
						function(response){
							window.location.replace("/dashboard");
						})
						.fail(function(jqxhr) { 
							noty({
								type: 'error',  layout: 'topCenter',
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
		var url = "/doSignIn";

		$('#btnLogin').hide();
		$('#logingButton').removeClass("hide").show();

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
						  type: 'error',  layout: 'topCenter',
						  text: _tr("Sorry, but there's been an error processing your request.") /*text: 'Connection Error! Check API endpoint.'*/
						});

						$('#btnLogin').show();
						$('#logingButton').addClass("hide").hide();						
						//alert(data);
						return false;
					}
					
					if(typeof dataArray['status'] !='undefined') //error
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: _tr("Incorrect credentials or account does not exist.") //dataArray['message'] //text: _tr("Sorry, but there's been an error processing your request.")
						});

						$('#btnLogin').show();
						$('#logingButton').addClass("hide").hide();
				   
					}
					else
					{	
						$.post("/saveSignIn", 
						'email='+encodeURIComponent(dataArray['email'])+'&fName='+dataArray['firstName']+'&lName='+dataArray['lastName']+'&id='+dataArray['id'], 
						function(response){
							window.location.replace("/dashboard");
						})
						.fail(function(jqxhr) { 
							noty({
								type: 'error',  layout: 'topCenter',
								text: 'Error: '+jqxhr.responseText	
							});

							$('#btnLogin').show();
							$('#logingButton').addClass("hide").hide();							
						});
					}
				}
			 });
		return false; // avoid to execute the actual submit of the form.
	});
	
	///////////////////////////////////////////////////////////////////////////////////////////////////
	$("#forgotPassForm").on('valid', function (event) {
		var url = "/doForgot";

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
						  type: 'error',  layout: 'topCenter',
						  text: _tr("Sorry, but there's been an error processing your request.") /*text: 'Connection Error! Check API endpoint.'*/
						});
						
						//alert(data);
						
						return false;
					}
					
					if(dataArray && typeof dataArray['status'] !='undefined') //error
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: _tr("Sorry, but there's been an error processing your request.") /*text: dataArray['message']*/
						});
				   
					}
					else
					{	
						noty({
						  type: 'success',
						  text: _tr('Success! Please check your email for further instructions.')
						});
						
						$("#forgotPassM").foundation('reveal', 'close');
					}
				}
			 });

		return false; // avoid to execute the actual submit of the form.
	});

	///////////////////////////////////////////////////////////////////////////////////////////////////
	$("#resetPassForm").on('valid', function (event) {
		var url = "/doReset";

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
						  type: 'error',  layout: 'topCenter',
						  text: _tr("Sorry, but there's been an error processing your request.") //text: 'Connection Error! Check API endpoint.'
						});
						//alert(data);
						return false;
					}
					
					if(typeof dataArray['status'] !='undefined') //error
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: _tr("Sorry, incorrect code.") //text: dataArray['message']
						});
					}
					else
					{	
						noty({ type: 'success', text: _tr('Your password has been reset.<br/>You will now be redirected to the login page.') });
						setTimeout(function(){window.location.replace("/login");}, 2500);
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
	
	if($("#map").length > 0)
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
		pinImage = new google.maps.MarkerImage("//chart.googleapis.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
		new google.maps.Size(21, 34),
		new google.maps.Point(0,0),
		new google.maps.Point(10, 34));
		
		//Google Places autocomplete
		var input = document.getElementById("vSug");
		var options = {'types':[ 'establishment']}; //restricted only to business. We dont need country/street/area names now
		var autocomplete = new google.maps.places.Autocomplete(input, options);
		autocomplete.bindTo('bounds', map); //set the guesses to be bound around the map so closer to the location (i.e. UK)
		
		google.maps.event.addListener(autocomplete, 'place_changed', function() {
			place = autocomplete.getPlace();
			
			document.getElementById("vCode").value = place.geometry.location.toString();  
			
			if (place.geometry.viewport) {
				map.fitBounds(place.geometry.viewport);
			} 
			else {
				map.setCenter(place.geometry.location);
				map.setZoom(15);  
			}
			
			var address = '';
			var street_number = '';
			var route = '';
			var locality = '';
			var postal_town = '';
			var postal_code = '';
			var country = '';
			
			if (place.address_components) {
			
			//console.log(place.address_components);
			
			arrLength = place.address_components.length;

			for(var i = 0;i<arrLength;i++)
			{
				//console.log(place.address_components[i].types);
				
				if(place.address_components[i].types == "street_number")
					street_number = place.address_components[i].long_name;
					
				if(place.address_components[i].types == "route")
					route = place.address_components[i].long_name;
					
				if(place.address_components[i].types == "postal_town")
					postal_town = place.address_components[i].long_name;
					
				if(place.address_components[i].types == "postal_code")
					postal_code = place.address_components[i].long_name;
					
				if(place.address_components[i].types[0] == "locality") //comes as array
					locality = place.address_components[i].long_name;
					
				if(place.address_components[i].types[0] == "country")  //comes as an array
					country = place.address_components[i].short_name;
			}
			
			//console.log(street_number+", "+route+", "+locality+", "+postal_town+", "+postal_code+", "+country);
			
			/*address = [(place.address_components[0] &&
						place.address_components[0].short_name || ''),
					   (place.address_components[1] &&
						place.address_components[1].short_name || ''),
					   (place.address_components[2] &&
						place.address_components[2].short_name || ''),
						(place.address_components[4] &&
						place.address_components[4].short_name || '')
					  ].join(', '); */
		}	
			address = '';		  
			
			if(street_number!='')
				address = address + street_number+", ";
			
			if(route!='')
				address = address + route+", ";
			
			if(locality!='')
				address = address + locality;
			
			if(postal_town!='' && postal_town!=locality)
				address = address + ", " + postal_town;
						
			//now to fix whats in venue address
			document.getElementById("vAdd").value = address;
			
			//now to fix whats in venue address
			document.getElementById("vPostal").value = postal_code;
			
			//now to fix whats in venue address
			$('#vCountry').val(country);
			var countryLabel = $('#vCountry option:selected').text();
			$("#vCountry").next('.custom.dropdown').find('li.selected').removeClass('selected');
			$("#vCountry").next('.custom.dropdown').find('li[value="'+countryLabel+'"]').addClass('selected');
			$("#vCountry").next('.custom.dropdown').find('a.current').html(countryLabel);
			
			//now to fix whats in venue name
			document.getElementById("vName").value = place.name;

			marker = new google.maps.Marker({ 
				map: map, 
				animation: google.maps.Animation.DROP,
				icon: pinImage, 
				title: place.name+', '+address
			});
			  
			marker.setPosition(place.geometry.location);
		});
	}
	
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	$('.eventFlagNoti').on('click', function(){
	
		if( $(this).find("input[type=radio][name=vEvent]:checked").val() == '0')
		{
			$('.nonEventOnly').slideDown();
			$('.nonEventOnly').find('input').attr('required','required');
		}
		else
		{
			$('.nonEventOnly').slideUp();
			$('.nonEventOnly').find('input').removeAttr('required');
		}
	});

	$('.eventFlagNoti2 input').on('click', function(){
		$(".eventFlagNoti2 input").removeAttr("checked");
		$(this).attr("checked", "true");
	});

	$('.eventFlagNoti3 input').on('click', function(){
		$(".eventFlagNoti3 input").removeAttr("checked");
		$(this).attr("checked", "true");
	});

	$('.venueHasDelivery').on('click', function(){
		var isChecked = $("#advanced-setting").css("display") == "none";		
		console.log('isChecked:' + isChecked)
		if(isChecked)
		{
			$('#advanced-setting').slideDown();
		} else {
			
			$('#advanced-setting').slideUp();
		}
	});

	$(".oh-is-open").on('change',onIsOpenChange);
	
	$('.switch').each(function(){
		var val = $(this).find("input[type=radio]:checked").val() == '0'
		if (val){
			$(this).addClass("off")
		}
	}).on('click',function(){
		var val = $(this).find("input[type=radio]:checked").val() == '0'
		if (val){
			$(this).addClass("off")
		} else {
			$(this).removeClass("off")
		}
	});
	
	$("#venueConfigForm").on('valid', function (event) {
		var url = "/saveVenue";
		
		$('#venueSave').hide();
		$('#savingButton').removeClass("hide").show();
		
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
						  type: 'error',  layout: 'topCenter',
						  text: _tr("Sorry, but there's been an error processing your request.") /*text: 'Connection Error! Check API endpoint.'*/
						});
						//alert(data);
						return false;
					}
					
					if(dataArray && typeof dataArray['status'] !='undefined') //error
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: _tr("Sorry, but there's been an error processing your request.") /*text: dataArray['message']*/
						});
					}
					else
					{	
						noty({ type: 'success', text: _tr('Venue changes have been saved!') });
						if($('#redirectFlag').val()=='1') { setTimeout(function(){window.location.replace("/homescreen");}, 1000); }
					}
				}
			 }).done(function(){
			 	var postMessages = function (messages) {
			 		$.ajax({
			 			url: "/saveMessages",
			 			type: "POST",
			 			data: { 
			 				messages: JSON.stringify(messages)
			 			},
			 			success: function () {
			 				redirectPage();
			 			}
			 		})
			 	},
			 	redirectPage = function () {
					if($('#redirectFlag').val()!='1') $('#venueSave').show();
					$('#savingButton').hide();
					//FIXME maybe this can be replaced with a refresh on the ids for the delivery details
					setTimeout(window.location.reload(),200);
			 	};

			 	var valueDelivery = $( "input:radio[name=vDelivery]:checked" ).val();

			 	if (valueDelivery == '1') {
			 		postMessages(messagesAlert.notify.concat(messagesAlert.reject));
			 	} else {
			 		redirectPage();
			 	}
			 });

		return false; // avoid to execute the actual submit of the form.
	});
	
	//ajax form upload
	var options = { 
		url: '/uploadLogo',
		success: function(responseText) { 
			noty({
			  type: 'success',
			  text: 'Uploaded!'
			});
			//console.log('resp:',responseText)
			//alert(responseText);
			
			responseText=responseText.replace('_thumb.png','');
			
			content="<img src='"+globalLPath+responseText+"_thumb.png'/>";
			$("#appHeading").html(content);
			$("#aHeading").val(' ');
			$("#picFileName").val(responseText);
			
			//clear for new file
			$("#picFile").val('');
			
			//show button again
			$('#lo-loading').hide();
			$('#doLogoUp').show();
		},
		error: function() { 
			noty({
			  type: 'error',  layout: 'topCenter',
			  text: 'Error uploading file'
			});
			
			//clear for new file
			$("#picFile").val('');
			
			//show button again
			$('#lo-loading').hide();
			$('#doLogoUp').show();
		},
		beforeSubmit: function(arr, $form, options) { 
			var acceptedExts = new Array(".png");
			var filename = $("#picFile").val();
			filename = filename.toLowerCase();
			if(searchArray(filename,acceptedExts))
			{
				//hide button again
				$('#doLogoUp').hide();
				$('#lo-loading').show();
				
				return true;
			}
			else
			{
				noty({
				  type: 'error',  layout: 'topCenter',
				  text: 'Incorrect Image File'
				});
				
				//manual reset
				var content = $("#aHeading").val()
				$("#appHeading").html(content);
				$("#picFileName").val('');
				$("#picFile").val('');
				
				return false;
			}
		}
	};

	$("#logoUpForm").ajaxForm(options);

	// images of item for uploader
	var imagesMenu = {};

	var $modalImagesCrop = $('#modalImagesCrop');
	var $barImageCrop = $('.barImageCrop');
	var $percentImageCrop = $('.percentImageCrop');
	var $progressImageCrop = $('.progressImageCrop');
	var $imageCrop = $('#imageCrop');
	var $titleModalCrop = $('#title-modalCrop');
	var $saveChangesModalCrop = $('#saveChangesModalCrop');
	var $cancelModalImageCrop = $('#cancelModalImageCrop');
	var $addPicture = $('#addPicture');
	var $errorMessageImageCrop = $('#errorMessageImageCrop');

	var lastImageUpload = {};
	var cropperInstance = null;

	$(document).on('click', '#cancelModalImageCrop', function(){

		if ( cropperInstance.removedImage ) {
			cropperInstance.removedImage = false;
			cropperInstance.croppedImg.show();
			cropperInstance.cropControlRemoveCroppedImage.show();
			$saveChangesModalCrop.addClass('secondary').attr('disabled', 'disabled');
		}

		$modalImagesCrop.foundation('reveal', 'close');
	})

	$modalImagesCrop.on('closed', function(){
		cropperInstance.destroy();
	});

	var removeImage = function(){
		cropperInstance.removedImage = false;
		var idItem = cropperInstance.idItem;
		var image = imagesMenu[idItem];

		if ( image && image[0].saved ) {
			$.post('/deleteImageItem', {idItem: idItem.replace('item', '')})
				.done(function(){
					imagesMenu[idItem] = null;
				})
				.fail(function(){
					noty({
					  type: 'error',  layout: 'topCenter',
					  text: 'Error for delete image'
					});
				});
		} else {
			imagesMenu[idItem] = null;
		}

		$saveChangesModalCrop.addClass('secondary').attr('disabled', 'disabled');
		$cancelModalImageCrop.removeClass('secondary').removeAttr('disabled');		
	};

	$(document).on('click', '#saveChangesModalCrop', function(){

		if ( cropperInstance.removedImage ) {
			removeImage();	
		} else {
			if ( lastImageUpload ) {
				imagesMenu[lastImageUpload.idItem] = [{
					cropped: true,
					url: lastImageUpload.url
				}]
			}
		}

		$modalImagesCrop.foundation('reveal', 'close');		
	})

	$(document).on('click', '.itemUpload', function(){

		var $table = $(this).closest('table');
		var $input = $table.find('input[name^=iName]');		

		var imageUrl = $(this).data('image-url');
		var idItem = $input.data('id');

		if ( imageUrl ) {
			if ( !imagesMenu.hasOwnProperty(idItem) ) {
				imagesMenu[idItem] = [{
					saved: true,
					cropped: false,
					url: imageUrl
				}]
			}
		}

		$modalImagesCrop.css('top', $(window).scrollTop());

		$saveChangesModalCrop.addClass('secondary').attr('disabled', 'disabled');

		$titleModalCrop.text($input.val());

		lastImageUpload = null;

		cropperInstance = new Croppic('croppic', {
			zoomFactor:10,
			doubleZoomControls:true,			
			customUploadButtonId: 'addPicture',
			uploadUrl: '/uploadMenuItemImage',
			cropUrl: '/uploadMenuItemImage',
			onBeforeImgUpload: function(){
/*				$saveChangesModalCrop.addClass('secondary').attr('disabled', 'disabled');
				$cancelModalImageCrop.addClass('secondary').attr('disabled', 'disabled');*/
				//$addPicture.addClass('secondary').attr('disabled', 'disabled');
				if ( cropperInstance.cropControlRemoveCroppedImage instanceof jQuery ) {
					cropperInstance.cropControlRemoveCroppedImage.trigger('click');
				}
				removeImage();
	            var percentVal = '0%';
	            $barImageCrop.width(percentVal);
	            $percentImageCrop.html(percentVal);
	            $progressImageCrop.show();
			},
			onAfterImgUpload: function(){
				if ( this.hasOwnProperty('status') && this.status === 'error' ) {
					$saveChangesModalCrop.removeClass('secondary').removeAttr('disabled');
					//$addPicture.removeClass('secondary').removeAttr('disabled');
					$errorMessageImageCrop.text(this.message).show();
				} else {
					$errorMessageImageCrop.hide();
				}

				if ( !this.imgInitH ) {
					cropperInstance.cropControlCrop.trigger('click');
				} else {
					$cancelModalImageCrop.removeClass('secondary').removeAttr('disabled');
					$progressImageCrop.hide();
				}
			},
			onBeforeImgCrop: function(){
	            var percentVal = '0%';
	            $barImageCrop.width(percentVal);
	            $percentImageCrop.html(percentVal);
	            $progressImageCrop.show();
				// $cancelModalImageCrop.addClass('secondary').attr('disabled', 'disabled');
			},
			onAfterImgCrop:		function(){ 
				lastImageUpload = {
					saved: false,
					idItem: this.idItem,
					url: this.croppedImg.attr('src')
				};

				$saveChangesModalCrop.removeClass('secondary').removeAttr('disabled');
				$cancelModalImageCrop.removeClass('secondary').removeAttr('disabled');
				$progressImageCrop.hide();
			}
		});
		
		cropperInstance.idItem = idItem;
		cropperInstance.onUploadProgress = function(event, position, total, percentComplete) {
            var percentVal = percentComplete + '%';
            $barImageCrop.width(percentVal);
            $percentImageCrop.html(percentVal);
        };
        cropperInstance.onRemoveCroppedImage = function(  ) {
			$saveChangesModalCrop.removeClass('secondary').removeAttr('disabled');
			$cancelModalImageCrop.removeClass('secondary').removeAttr('disabled');
			//$addPicture.addClass('secondary').attr('disabled', 'disabled');
		};

		if ( imagesMenu.hasOwnProperty(idItem) && imagesMenu[idItem] ) {
			cropperInstance.destroy();			
			cropperInstance.obj.append('<img class="croppedImg" src="'+imagesMenu[idItem][0].url+'">');			
			cropperInstance.croppedImg = cropperInstance.obj.find('.croppedImg');
			cropperInstance.init();

			//$addPicture.addClass('secondary').attr('disabled', 'disabled');
		}

		$modalImagesCrop.foundation('reveal', 'open');
	});
	
	var tags = [];
	var $listTags = $('.listTags');

	$.get('/menuitem_tags.php').done(function( data ){
		data = JSON.parse(data);
		for (var i = 0, len = data.length; i < len; i++) {
			var tag = data[i];
			console.log('code',tag.code);
			tags.push('<li>' +
						'<div class="checkbox checkboxStyle">' +
						  	'<input type="checkbox" value="' + tag.code + '" id="checktag_' + tag.code + '">' +
						    '<label for="checktag_' + tag.code + '">' +
						    	'<span>' + tag.name + '</span>' + 
						    	'<img src="/img/menu-icons/' + tag.icon + '" width="30" alt="' + tag.name + '" />' +
						    '</label>' +
					  	'</div>' +
					'</li>');
		};

		$listTags.html(tags.join(''));
	});

	// images of item for uploader
	var tagsMenu = {};

	var $modalTags = $('#modalTags');
	var $titleTags = $('#title-tags');
	var $saveChangesTags = $('#saveChangesTags');
	var $cancelModalTags = $('#cancelModalTags');
	var $lastInputName = null;
	var idItemForTags = null;

	var $itemTags = $('.itemTags');
	for (var i = $itemTags.length - 1; i >= 0; i--) {
		var $tag = $($itemTags[i]);
		var tagsItem = $tag.data('tags');

		var $table = $tag.closest('table');
		var $input = $table.find('input[name^=iName]');		
		var id = $input.data('id');

		if (tagsItem) {
			tagsMenu[id] = tagsItem;
		}
	};

	$(document).on('click', '#cancelModalTags', function(){
		$modalTags.foundation('reveal', 'close');
	});

	$(document).on('click', '#saveChangesTags', function(){
		var $inputs = $listTags.find('input:checked');

		tagsMenu[idItemForTags] = [];

		for (var i = 0, len = $inputs.length; i < len; i++) {
			var $input = $($inputs[i]);
			tagsMenu[idItemForTags].push($input.val());
		};

		$lastInputName.attr('data-edit', true);
		$lastInputName.data('edit', true);

		$modalTags.foundation('reveal', 'close');		
	})

	$(document).on('click', '.itemTags', function(){

		var $table = $(this).closest('table');
		var $input = $table.find('input[name^=iName]');		
		$lastInputName = $input;
		idItemForTags = $input.data('id');

		$listTags.find('input:checkbox').removeAttr('checked');

		var tagsModal = tagsMenu[idItemForTags];

		if (tagsModal && tagsModal.length) {
			for (var i = tagsModal.length - 1; i >= 0; i--) {
				var t = tagsModal[i];

				$('#checktag_' + t).attr('checked', 'checked');
			};
		}

		$modalTags.css('top', $(window).scrollTop() + 100);

		$titleTags.text('Tags for ' + $input.val());

		$modalTags.foundation('reveal', 'open');
	}); 
	
	//ajax form upload
	var optionsBG = { 
		url: '/uploadBG',
		success: function(responseText) { 
			noty({
			  type: 'success',
			  text: _tr('Uploaded!')
			});
		

			//alert(responseText);
			
			$("[id^=thumb]").removeClass('selected');
			var newImgSrc = globalWPath + "wall_wa_" + responseText + ".jpg";
			$("#phoneWallpaper").attr("src", newImgSrc);
			$("#wallPaperID").val(responseText);
			
			$('.customBGArea .customIMG').remove();
			$('<a class="thumb selected customIMG" id="thumb'+responseText+'">	<img src="'+globalWPath+'thumb'+responseText+'.jpg"> </a>').appendTo('.customBGArea');
			
			//clear for new file
			$("#bgFile").val('');
			
			//show button again
			$('#bg-loading').hide();
			$('#doBGUp').show();
			
			//click to get tick icon
			$('#thumb1').addClass('hideAfter');
			$('#thumb1').trigger('click');
			setTimeout(function() { 
				$('#thumb'+responseText).trigger('click'); 
				$('#thumb1').removeClass('hideAfter');
			}, 333);
			
			
		},
		error: function() { 
			noty({
			  type: 'error',  layout: 'topCenter',
			  text: _tr('Error uploading file')
			});
			
			//clear for new file
			$("#bgFile").val('');
			
			//show button again
			$('#bg-loading').hide();
			$('#doBGUp').show();
		},
		beforeSubmit: function(arr, $form, options) { 
			var acceptedExts = new Array(".jpg",".jpeg");
			var filename = $("#bgFile").val();
			filename = filename.toLowerCase();
			if(searchArray(filename,acceptedExts))
			{	
				//hide button
				$('#doBGUp').hide();
				$('#bg-loading').show();
			
				return true;
			}
			else
			{
				noty({
				  type: 'error',  layout: 'topCenter',
				  text: _tr('Incorrect Image File')
				});
				
				//manual reset
				$("#bgFile").val('');
				
				return false;
			}
		}
	};
	$("#bgUpForm").ajaxForm(optionsBG);
	
	$(document).on("click", "[id^=thumb]", function() {
		$("[id^=thumb]").removeClass('selected');
		$(this).addClass('selected');
		var tID = $(this).attr('id');
		var wall = tID.replace("thumb","wall");
		var plainID = tID.replace("thumb","");
		
		if(plainID.match(/^\d+$/gi))
			var newImgSrc = "./img/wallpapers/" + wall + ".jpg";
		else
			var newImgSrc = globalWPath + wall + ".jpg";
		
		$("#phoneWallpaper").attr("src", newImgSrc);
		$("#wallPaperID").val(plainID);
	});
	
	$("#sugDrop li a").on('click', function() {
		var content = $(this).html();
		$("#aHeading").val(content);
		$("#appHeading").html(content);
		$("#picFileName").val('');
	});
	
	$("#aHeading").bind('propertychange keyup input paste',function() {
		var content = $(this).val();
		$("#appHeading").html(content);
		$("#picFileName").val('');
	});
	
	$("#sugDrop2 li a").on('click', function() {
		var content = $(this).html();
		$("#aSubheading").val(content);
		$("#subHeading").html(content);
	});
	
	$("#aSubheading").bind('propertychange keyup input paste',function() {
		var content = $(this).val();
		$("#subHeading").html(content);
	});

	$(".visibleUpload, #logoReset").on('click', function() {
		$(".visibleUpload").slideToggle();
		$(".hiddenUpload").slideToggle();
	});
	
	$(".visibleUploadBG, #bgReset").on('click', function() {
		$(".visibleUploadBG").slideToggle();
		$(".hiddenUploadBG").slideToggle();
	});
	
	$("#doBGUp").on('click', function() {
		if($("#bgFile").val()) 
		{
			$("#bgUpForm").submit();
			$("#bgFile").val('');
		}
		else
			$("#bgFile").click();
	});
	
	var activeUploadImageItem = function( $doImageMenuItem, $picImageMenuItem ) {
		$doImageMenuItem.on('click', function() {
			var $this = $(this);

			if($this.siblings(".picImageMenuItem").val())
			{ 
				$this.parent(".formImageMenuItem").submit();
				$this.siblings(".picImageMenuItem").val('');
			}
			else
				$this.siblings(".picImageMenuItem").click();
		});
		
		$picImageMenuItem.on('change', function(){
			$(this).siblings(".doImageMenuItem").click();
		});	
	}

	activeUploadImageItem($(".doImageMenuItem"), $(".picImageMenuItem"));

	$("#doLogoUp").on('click', function() {
		if($("#picFile").val())
		{ 
			$("#logoUpForm").submit();
			$("#picFile").val('');
		}
		else
			$("#picFile").click();
	});
	
	$("#picFile").on('change', function(){
		$("#doLogoUp").click();
	});
	
	$("#bgFile").on('change', function(){
		$("#doBGUp").click();
	});
	
	$("#logoReset").on('click', function() {
		var content = $("#aHeading").val()
		$("#appHeading").html(content);
		$("#picFileName").val('');
		$("#picFile").val('');
	});
	
	$("#bgReset").on('click', function() {
		$("#bgFile").val('');
	});
	
	$("#appConfig1Sub").on('click', function() { $("#appConfigForm").submit(); });
	
	$("#appConfigForm").on('valid', function (event) {
		var url = "/saveHomescreen";
		
		$('#appConfig1Sub').hide();
		$('#savingButton').show();

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
						  type: 'error',  layout: 'topCenter',
						  text: _tr("Sorry, but there's been an error processing your request.") /*text: 'Connection Error! Check API endpoint.'*/
						});
						//alert(data);
						return false;
					}
					
					if(typeof dataArray['status'] !='undefined') //error
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: _tr("Sorry, but there's been an error processing your request.") /*text: _tr("Sorry, but there's been an error processing your request.") /*text: dataArray['message']*/
						});
						//alert(data);
					}
					else
					{	
						noty({ type: 'success', text: _tr('App changes have been saved!') });
						if($('#redirectFlag').val()=='1') setTimeout(function(){window.location.replace("/menuscreen");}, 1000);
					}
				}
			 }).done(function(){
				if($('#redirectFlag').val()!='1') $('#appConfig1Sub').show();
				$('#savingButton').hide();
			 });

		return false; // avoid to execute the actual submit of the form.
	});
	
	$("#vTitle").bind('propertychange keyup input paste',function() {
		var content = $(this).val();
		$("#venTitle").html(content);
	});
	
	$("#appConfig2Form").on('valid', function (event) {
		var url = "/saveMenuscreen";
		
		$('#appConfig2Sub').hide();
		$('#savingButton').show();

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
						  type: 'error',  layout: 'topCenter',
						  text: _tr("Sorry, but there's been an error processing your request.") /*text: 'Connection Error! Check API endpoint.'*/
						});
						
						return false;
					}
					
					if(typeof dataArray['status'] !='undefined') //error
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: _tr("Sorry, but there's been an error processing your request.") /*text: dataArray['message']*/
						});
				   
					}
					else
					{	
						noty({ type: 'success', text: _tr('App changes have been saved!') });
						if($('#redirectFlag').val()=='1') setTimeout(function(){window.location.replace("/dashboard");}, 1000);
					}
				}
			 }).done(function(){
				$('#appConfig2Sub').show();
				$('#savingButton').hide();
			 });

		return false; // avoid to execute the actual submit of the form.
	});

	$(document).on('click', '.optionHeaderDelete', function(){
		var $tr = $(this).closest('tr');

		//add data-attribute
		$tr.find('input[name^=iMod]').attr('data-delete', true);
		$tr.find('input[name^=iMod]').data('delete', true);
		//remove required
		$tr.find("input[name^=iMod], select[name^=iModType]").each(function() {
			$(this).removeAttr('required');
		});
		
		var removeRecursion = function( $trRemoved ) {
			var $nextTr = $trRemoved.next('.optionTR.menuEdit');

			$trRemoved.find('.optionRowDelete').trigger('click');

			if ( $nextTr.length ) {
				removeRecursion($nextTr);
			}
		};

		var $trForRemoved = $tr.next().next('.optionTR.menuEdit');

		if ( $trForRemoved.length ) {
			removeRecursion( $trForRemoved );
		}

		$tr.hide();
		$tr.next().hide();

		var itemID = $tr.closest('table').attr('id');
		
		
		$("#"+itemID+"_modCountAct").val(parseInt($("#"+itemID+"_modCountAct").val())-1);
	});
	
	$(document).on("click", ".optionRowDelete", function(event) {
		//get item number
		$curTable = $(this).closest('table');
		var itemID = $curTable.attr('id');
		
		//get and update current count
		var itemCount = $("#"+itemID+"_optionCountAct").val();
		var newCount = parseInt(parseInt(itemCount) - 1);
		$("#"+itemID+"_optionCountAct").val(newCount);
		
		$ele = $(this).closest('tr');
		
		//add data-attribute
		$ele.find('input[name^=oName]').attr('data-delete', true);
		$ele.find('input[name^=oName]').data('delete', true);
		//remove required
		$ele.find('input[name^=oName], input[name^=oPrice], input[name^=oVisi]').each(function() {
			$(this).removeAttr('required');
		});
		
		//bye-bye
		$(this).parents("tr:first").hide();
	});
	
	$(document).on("click", ".xtraOpt", function(event) {
	
		//get item number
		$curTable = $(this).closest('table');
		var itemID = $curTable.attr('id');
		
		//get and update current count
		var itemCount = $("#"+itemID+"_modCount").val();
		var newCount = parseInt(parseInt(itemCount) + 1);
		$("#"+itemID+"_modCount").val(newCount);
		$("#"+itemID+"_modCountAct").val(parseInt($("#"+itemID+"_modCountAct").val())+1);
	
	
		$subHeader = $('#item0 .subHeaderTR:first').clone(false);
		$dummyData = $('#item0 .subHeaderTR:first').next().clone(false); //dummy row
		
		$subHeader.find("select").each(function() {
			$(this).hide();
			var tempName = $(this).attr('name');
			var newName = tempName.replace(/m\d+/gi, "m"+newCount);
			$(this).attr('name', newName);

			$(this).attr('required','required'); 
		});
		
		//add autocomplete
		$subHeader.find("input[name^=iMod]").each(function(){
			$(this).autocomplete({ source: [ _tr("Choose a size"),_tr("Choose a flavour"),_tr("Choose a topping"),_tr("Choose some extras"),_tr("Choose a side dish") ], delay: 10, minLength: 0, position: { my: "left top", at: "left bottom", collision: "none", of: $subHeader.find("input[name^=iMod]") } });
			var tempName = $(this).attr('name');
			var newName = tempName.replace(/m\d+/gi, "m"+newCount);
			$(this).attr('name', newName);
			
			//add data-attribute
			$(this).attr('data-insert', true);
			$(this).data('insert', true);
			$(this).attr('data-id', 'mod'+newCount+'m-'+itemID+'i');
			$(this).data('id', 'mod'+newCount+'m-'+itemID+'i');
		});
		
		$(this).closest('tr.xtraModTR').before($subHeader).before($dummyData);
		
		$subHeader.find('.newOpt').trigger('click');
	});
	
	$(document).on("click", ".newOpt, .optionRowDuplicate", function(event) {
		//new item or duplicate?
		var dup = 0;
		if($(this).hasClass("optionRowDuplicate")) dup = 1;
		
		//get item number
		$curTable = $(this).closest('table');
		var itemID = $curTable.attr('id');
		
		//get and update current count
		var itemCount = $("#"+itemID+"_optionCount").val();
		var newCount = parseInt(parseInt(itemCount) + 1);
		$("#"+itemID+"_optionCount").val(newCount);
		$("#"+itemID+"_optionCountAct").val(parseInt($("#"+itemID+"_optionCountAct").val())+1);
		
		//get mod number
		if(dup)
			var modNumber = $(event.target).parents('.optionTR').first().prevAll('.subHeaderTR').first().find('input[name^=iMod]').attr('name');
		else
			var modNumber = $(event.target).parents('.subHeaderTR').first().find('input[name^=iMod]').attr('name');
			
		modNumber = modNumber.replace(/^iMod.*\[m/gi,'');
		modNumber = modNumber.replace(']','');
		
		if(dup)
		{
			//clone the row in question
			$curRow = $(this).closest('tr');
		}
		else
		{
			//clone the nearest row
			$curRow = $(this).closest("tr").next();
		}
		
        $newRow = $curRow.clone(false);
		$newRow.addClass('optionTR');
		
		if(!dup)
		{
			$(this).parents('.menuEdit').find('.modifierRow').each(function(){
				$(this).slideRow('down');
				//replace ids with incremented value and make value = default value (for !dups)
				$(this).find("input").each(function() {
					//$(this).val( $(this).prop("defaultValue") );
					var tempName = $(this).attr('name');
					var newName = tempName.replace(/item\d+/gi, itemID);
					$(this).attr('name', newName);
					
					//var temp = $(this).val();
					//$(this).val("");
					//$(this).attr('placeholder', temp);
					
					$(this).attr('required','required');
				});
				
				$(this).find("select").each(function() {
					//$(this).val( $(this).prop("defaultValue") );
					var tempName = $(this).attr('name');
					var newName = tempName.replace(/item\d+/gi, itemID);
					$(this).attr('name', newName);
					
					$(this).multiselect({
					   multiple: false,
					   header: false,
					   noneSelectedText: _tr("Pick an option type"),
					   selectedList: 1
					});

					$(this).attr('required','required');
				});
			});
		}
		
		//replace ids with incremented value and make value = default value (for !dups)
		$newRow.find("input").each(function() {
			if(!dup) $(this).val( $(this).prop("defaultValue") );
			var tempName = $(this).attr('name');
			var newName = tempName.replace(/item\d+/gi, itemID);
			newName = newName.replace(/\[\d+\]/gi, "["+newCount+"]");
			newName = newName.replace(/\[m\d+/gi, '[m'+modNumber);
			$(this).attr('name', newName);
		});
		
		if(!dup){
			//now we fix placeholder
			$newRow.find("input[name^=oName]").each(function() {
				var temp = $(this).val();
				$(this).val("");
				$(this).attr('placeholder', temp);
			});
			
			//now we fix placeholder
			$newRow.find("input[name^=oPrice]").each(function() {
				var temp = $(this).val();
				$(this).val("");
				$(this).attr('placeholder', temp);
			});
		}
		
		//fix the yes/no slider so the label appears correctly
		$newRow.find(".menuTDVisi input").each(function() {
			$(this).trigger('click'); 
		});
		
		//add data-attribute
		$newRow.find("input[name^=oName]").each(function() {
			$(this).attr('data-insert', true);
			$(this).data('insert', true);
			$(this).attr('data-id', 'opt'+newCount+'o-'+itemID+'i');
			$(this).data('id', 'opt'+newCount+'o-'+itemID+'i');
		});
				
		//hide it so we can animate it!
		$newRow.css('display','none');
		
		//now we locate where to place this option row
		if( ($(event.target).closest('.subHeaderTR').nextAll('.subHeaderTR').first().length) && !dup ) //new option button pressed
		{
			//insert just before next heading
			$(event.target).closest('.subHeaderTR').nextAll('.subHeaderTR').first().before($newRow);
			$(event.target).closest('.subHeaderTR').nextAll('.subHeaderTR').first().prev($newRow).slideRow('down');
		}
		else if( ($(event.target).closest('.optionTR').prevAll('.subHeaderTR').first().nextAll('.subHeaderTR').first().length) && dup ) //duplicate button pressed
		{
			//insert just before next heading
			$(event.target).closest('.optionTR').prevAll('.subHeaderTR').first().nextAll('.subHeaderTR').first().before($newRow);
			$newRow.slideRow('down');
		}
		else
		{
			//insert at before "add new option button"
			$("#"+itemID).find('.xtraModTR').before($newRow);
			$newRow.slideRow('down');
		}
		
		// $(document).foundation('abide', 'events');
		
		$("html, body").animate({scrollTop: $($newRow).offset().top - ( $(window).height() - $($newRow).outerHeight(true) ) / 2}, 200); //.animate({ scrollTop: $($newRow).offset().top }, 250);
	});
	
	$(document).on("click", ".newItem, .itemDuplicate", function() {
		//new item or duplicate?
		var dup = 0;
		if($(this).hasClass("itemDuplicate")) dup = 1;
			
		//get section
		section = $(this).attr('id');
		
		if(!dup) section = section.replace(/add_/gi,"");
		else section = section.replace(/dup\d+_/gi,"");
		
		//get table item number
		$curTable = $(this).closest('table');
		var itemID = $curTable.attr('id');
		
		//get and update current count
		var itemCount = $("#itemCount").val();
		var newCount = parseInt(parseInt(itemCount) + 1);
		$("#itemCount").val(newCount);
		$("#itemCountAct").val(parseInt($("#itemCountAct").val())+1);
		
		if(dup) //clone an existing row
		{
			//create variables and insert
			$newOCount = $("#"+itemID+"_optionCount").clone(true);
			$newOCount.attr('id','item'+newCount+'_optionCount');
			$newOCount.attr('name','item'+newCount+'_optionCount');
			$newOCountAct = $("#"+itemID+"_optionCountAct").clone(true);
			$newOCountAct.attr('id','item'+newCount+'_optionCountAct');
			$newOCountAct.attr('name','item'+newCount+'_optionCountAct');
			$("#"+itemID+"_optionCountAct").after($newOCountAct);
			$("#"+itemID+"_optionCountAct").after($newOCount);
			
			$newMCount = $("#"+itemID+"_modCount").clone(true);
			$newMCount.attr('id','item'+newCount+'_modCount');
			$newMCount.attr('name','item'+newCount+'_modCount');
			$newMCountAct = $("#"+itemID+"_modCountAct").clone(true);
			$newMCountAct.attr('id','item'+newCount+'_modCountAct');
			$newMCountAct.attr('name','item'+newCount+'_modCountAct');
			$("#"+itemID+"_modCountAct").after($newMCountAct);
			$("#"+itemID+"_modCountAct").after($newMCount);
			
			//clone specific table
			$newTab = $("#"+itemID).clone(false);
			$newTab.attr('id','item'+newCount);
		}
		else //clone a dummy row
		{
			//create variables and insert
			$newOCount = $("#item0_optionCount").clone(true);
			$newOCount.attr('id','item'+newCount+'_optionCount');
			$newOCount.attr('name','item'+newCount+'_optionCount');
			$newOCount.val(0);
			$newOCountAct = $("#item0_optionCountAct").clone(true);
			$newOCountAct.attr('id','item'+newCount+'_optionCountAct');
			$newOCountAct.attr('name','item'+newCount+'_optionCountAct');
			$newOCountAct.val(0);
			$("#item0_optionCountAct").after($newOCountAct);
			$("#item0_optionCountAct").after($newOCount);
			
			$newMCount = $("#item0_modCount").clone(true);
			$newMCount.attr('id','item'+newCount+'_modCount');
			$newMCount.attr('name','item'+newCount+'_modCount');
			$newMCount.val(0);
			$newMCountAct = $("#item0_modCountAct").clone(true);
			$newMCountAct.attr('id','item'+newCount+'_modCountAct');
			$newMCountAct.attr('name','item'+newCount+'_modCountAct');
			$newMCountAct.val(0);
			$("#item0_modCountAct").after($newMCountAct);
			$("#item0_modCountAct").after($newMCount);
			
			//clone dummy table
			$newTab = $("#item0").clone(false);
			$newTab.attr('id','item'+newCount);
			
			//remove dummy modifier as we add it later manually :)
			$newTab.find('.subHeaderTR').remove();
			$newTab.find('.optionTR').remove();
		}
			$newTab.addClass('table'+section);
		
		//replace ids with incremented value and make value = default value
		$newTab.find(".itemTR input").each(function() {
			if(!dup) $(this).val( $(this).prop("defaultValue") );
			var tempName = $(this).attr('name');
			var newName = tempName.replace(/section\d+/gi, section);
			newName = newName.replace(/\[\d+\]/gi, "["+newCount+"]");
			$(this).attr('name', newName);
		});
		
		//replace ids with incremented value
		$newTab.find(".optionTR input").each(function() {
			if(!dup) $(this).val( $(this).prop("defaultValue") );
			var tempName = $(this).attr('name');
			var newName = tempName.replace(/item\d+/gi, 'item'+newCount);
			$(this).attr('name', newName);
		});
		
		if(!dup){
			//now we fix placeholder
			$newTab.find("input[name^=iName]").each(function() {
				var temp = $(this).val();
				$(this).val("");
				$(this).attr('placeholder', temp);
			});
			
			//now we fix placeholder
			$newTab.find("input[name^=iPrice]").each(function() {
				var temp = $(this).val();
				$(this).val("");
				$(this).attr('placeholder', temp);
			});
		}
		
		if(dup) 
		{
			//remove multiselect
			$newTab.find(".ui-multiselect").remove();
		
			$newTab.find('.modifierRow').each(function(){
				if(parseInt($newOCountAct.val())) $(this).slideRow('down');
				//replace ids with incremented value and make value = default value (for !dups)
				$(this).find("input").each(function() {
					var tempName = $(this).attr('name');
					var newName = tempName.replace(/item\d+/gi, 'item'+newCount);
					$(this).attr('name', newName);
				});
				
				$newTab.find('.modifierRow select').each(function(index,element) {					
					//Set value to match original row
					$(this).val(($curTable.find(".modifierRow select")[index]).value)				
					var tempName = $(this).attr('name');
					var newName = tempName.replace(/item\d+/gi, 'item'+newCount);
					$(this).attr('name', newName);
					
					$(this).multiselect({
					   multiple: false,
					   header: false,
					   noneSelectedText: _tr("Pick an option type"),
					   selectedList: 1
					}); 
				});
			});
		}
		
		//add data-attribute
		$newTab.find("input[name^=iName]").each(function() {
			$(this).attr('data-insert', true);
			$(this).data('insert', true);
			$(this).attr('data-id', 'item'+newCount+'i');
			$(this).data('id', 'item'+newCount+'i');
		});
		
		if(dup)
		{
			var modCount = 1;
			$newTab.find("input[name^=iMod]").each(function() {
				$(this).attr('data-insert', true);
				$(this).data('insert', true);
				$(this).attr('data-id', 'mod'+modCount+'m-item'+newCount+'i');
				$(this).data('id', 'mod'+modCount+'m-item'+newCount+'i');
				modCount++;
			});
			var optCount = 1;
			$newTab.find("input[name^=oName]").each(function() {
				if($(this).attr('data-id') != 'opt0o-item0i') //skip dummies
				{
					$(this).attr('data-insert', true);
					$(this).data('insert', true);
					$(this).attr('data-id', 'opt'+optCount+'o-item'+newCount+'i');
					$(this).data('id', 'opt'+optCount+'o-item'+newCount+'i');
					optCount++;
				}
			});
		}
		
		//now we give the section id to the duplicate button
		$newTab.find(".itemDuplicate").attr('id',"dup"+newCount+"_"+section);
		
		//add autocomplete
		$newTab.find("input[name^=iMod]").autocomplete({ source: [ _tr("Choose a size"),_tr("Choose a flavour"),_tr("Choose a topping"),_tr("Choose some extras"),_tr("Choose a side dish") ], delay: 10, minLength: 0, position: { my: "left top", at: "left bottom", collision: "none", of: $newTab.find("input[name^=iMod]") } });
		
		$newTab.css('backgroundColor','#fafafa');
		$newTab.css('box-shadow', 'rgba(70, 83, 93, 0.54902) 0px 0px 6px inset');
		$newTab.css('max-width', '100%'); 
		
		//hide it so we can animate it!
		$newTab.css('display','none');
		
		//insert after section header/before hidden div
		$(".firstItemDiv"+section).prev('.sortWithinDiv').append($newTab); 
		
		$($newTab).slideRow('down');
		if($newTab.find('.itemEdit').is(':visible')) $newTab.find('.itemEdit').trigger('click');
		
		activeUploadImageItem($newTab.find('.doImageMenuItem'), $newTab.find('.picImageMenuItem'));

		// $(document).foundation('abide', 'events');
		
		$("html, body").animate({scrollTop: $($newTab).offset().top - ( $(window).height() - $($newTab).outerHeight(true) ) / 2}, 200);
	});
	
	$(document).on("click", ".itemDelete", function() {
		//get item number
		$curTable = $(this).closest('table');
		var itemID = $curTable.attr('id');
		
		var text = "Are you sure you want to delete this item?";
		
		if($curTable.find("input[name^=iName]").data('mdi')) text = "<strong>This item is part of at least 1 Meal Deal.</strong><br/>This item will be disassociated with any Meal Deals if deleted. Are you sure you want to delete this item?";
		
		noty({
			layout: 'center',
			type: 'confirm',
			text: text,
			buttons: [
			{addClass: 'alert tiny', text: 'Yes, delete this item!', onClick: function($noty) {
				
				//get and update current count
				var itemCount = $("#itemCountAct").val();
				var newCount = parseInt(parseInt(itemCount) - 1);
				$("#itemCountAct").val(newCount);
				
				//add data-attribute
				$curTable.find("input[name^=iName], input[name^=iMod], input[name^=oName]").each(function() {
					$(this).attr('data-delete',true);
					$(this).data('delete',true);
				});
				
				//remove required
				$curTable.find("input[name^=iName], input[name^=iPrice], input[name^=iDesc], input[name^=iQuan], input[name^=iVisi], input[name^=iMod], select[name^=iModType], input[name^=oName], input[name^=oPrice], input[name^=oVisi]").each(function() {
					$(this).removeAttr('required');
				});
				
				//bye-bye
				$("#"+itemID).hide();

				$noty.close();
			  }
			},
			{addClass: 'secondary tiny', text: 'No, go back.', onClick: function($noty) {
				$noty.close();
			  }
			}
		  ]
		});
	});
	
	$(document).on("click", ".itemSave", function() {
		$(this).hide();
		$curItem = $(this).closest('table');
		var itemID = $curItem.attr('id');
		var count = parseInt($("#"+itemID+"_optionCountAct").val());
		
		$curItem.find("tr").removeClass('menuEdit');
		$curItem.find("tr").addClass('savedInput');
		$curItem.find("input").attr("readonly", "readonly");
		$curItem.find(".itemEdit").slideRow('down');
		if(count) $curItem.find(".optionTR").slideRow('up');
		$curItem.find(".itemSubheader").slideRow('up');
		$curItem.find(".subHeaderTR").slideRow('up');
		$curItem.find(".xtraModTD").hide();
		if(count) $curItem.find('.menuEdit').find('.modifierRow').slideRow('up');
		$curItem.css('background', 'transparent');
		$curItem.css('box-shadow', '0px 0px 0px');
		$curItem.css('max-width', '100%'); 
	});
	
	$(document).on("click", ".itemEdit, .itemTR input[readonly='readonly']", function() {
		
		if($(this).hasClass('itemEdit')) $(this).hide();
		else $(this).closest('table').find('.itemEdit').hide();
		
		$curItem = $(this).closest('table');
		var itemID = $curItem.attr('id');
		var count = parseInt($("#"+itemID+"_optionCountAct").val());
		
		$curItem.find("tr").addClass('menuEdit');
		$curItem.find("tr").removeClass('savedInput');
		$curItem.find("input").removeAttr("readonly");
		$curItem.find(".itemSave").slideRow('down');
		if(count) $curItem.find(".optionTR").slideRow('down');
		$curItem.find(".itemSubheader").slideRow('down');
		$curItem.find(".subHeaderTR").slideRow('down');
		$curItem.find(".xtraModTD").slideDown('fast');
		if(count) $curItem.find('.menuEdit').find('.modifierRow').slideRow('down');
		$curItem.css('background', '#fafafa');
		$curItem.css('box-shadow', 'rgba(70, 83, 93, 0.54902) 0px 0px 6px inset');
		$curItem.css('max-width', '100%'); 
		$curItem.find('select[name^=iModType]').each(function(){ //reinitialize to get the right width
			$(this).multiselect({
				   multiple: false,
				   header: false,
				   noneSelectedText: _tr("Pick an option type"),
				   selectedList: 1
				}); 
		});
	});

	var sortableParams = { 
			opacity: 0.5, 
			axis: "y", 
			cursor: "move", 
			containment: "parent", 
			handle: ".sortHandle", 
			cancel: "input,textarea,select,option",
			placeholder: "sortable-placeholder",
			tolerance: "pointer",
			revert: 100,
			delay: 100,
			start: function(event,ui){
				$("<tbody><tr><td></td></tr></tbody>").appendTo(ui.placeholder);
				oldItemOrder = $(this).sortable('toArray');
				oldItemOrder.clean("");
				if($(ui.item).find('.itemSave').is(":visible")) $(ui.item).find('.itemSave').trigger('click');
				//$('.sortable-placeholder').height($(ui.item).height());
			},
			update: function(event, ui) {
				currentItemOrder = $(this).sortable('toArray');
				$parentDiv = $(ui.item).parent('.sortWithinDiv');

				itemCounter=1;
				$parentDiv.find('table').each(function(){
				
					var newIndex = oldItemOrder[itemCounter-1]; //we need the old order here so the new elements retain DOM order
					newIndex = newIndex.replace("item","");
					
					//add data-attribute
					$(this).find('input[name^=iName]').each(function(){
						$(this).attr('data-edit',true);
						$(this).data('edit',true);
					});
					
					//update table id
					tempName = $(this).attr('id');
					newName = tempName.replace(/\item\d+/gi, "item"+newIndex+"");
					$(this).attr('id', newName);
					
					//update item_dup button id
					$(this).find('button[id^=dup]').each(function(){
						tempName = $(this).attr('id');
						newName = tempName.replace(/dup\d+_/gi, "dup"+newIndex+"_");
						$(this).attr('id', newName);
					});
					
					//update item inputs
					$(this).find('.itemTR input').each(function(){
						tempName = "__TMP"+($(this).attr('name'));						
						newName = tempName.replace(/\[\d+\]/gi, "["+newIndex+"]");
						$(this).attr('name', newName);
					});
					
					//update modifier and options
					$(this).find('.subHeaderTR input, .subHeaderTR select, .optionTR input').each(function(){
						tempName = $(this).attr('name');
						newName = tempName.replace(/\[item\d+\]/gi, "[item"+newIndex+"]");
						$(this).attr('name', newName);
					});
					
					
					
					itemCounter++;
				});
				
				//console.log("old:"+oldItemOrder+" new:"+currentItemOrder);
				
				//update item-option counts
				var itemCountArray = new Array();
				var itemCountActArray = new Array();
				
				var modCountArray = new Array();
				var modCountActArray = new Array();
				
				for(var i=0;i<currentItemOrder.length;i++)
				{
					itemCountArray[i] = $("#"+currentItemOrder[i]+"_optionCount").val();
					itemCountActArray[i] = $("#"+currentItemOrder[i]+"_optionCountAct").val();
					
					modCountArray[i] = $("#"+currentItemOrder[i]+"_modCount").val();
					modCountActArray[i] = $("#"+currentItemOrder[i]+"_modCountAct").val();
				}
				
				for(var i=0;i<oldItemOrder.length;i++) //the new values go to the old order. that's how the association is preserved.
				{
					$("#"+oldItemOrder[i]+"_optionCount").val(itemCountArray[i]);
					$("#"+oldItemOrder[i]+"_optionCountAct").val(itemCountActArray[i]);
					
					$("#"+oldItemOrder[i]+"_modCount").val(modCountArray[i]);
					$("#"+oldItemOrder[i]+"_modCountAct").val(modCountActArray[i]);
				}
				$("input[name^=__TMP]").each(function(){
					var newName = this.name.replace("__TMP","");
					$(this).attr('name', newName);					
				});
			}
		}
	
	$(document).on("click", ".newSection", function() {
		//get and update current count
		var secCount = $("#sectionCount").val();
		var newCount = parseInt(secCount) + 1;
		$("#sectionCount").val(newCount);
		$("#sectionCountAct").val(parseInt($("#sectionCountAct").val())+1);
	
		//clone dummy section and dummy hook
		$newSec = $("#menuSectionRow").clone(true);
		$newHook = $(".firstItemDiv").clone(true);
		
		//prepare hook
		$newHook.addClass('firstItemDivsection'+newCount);
		$newHook.removeClass('firstItemDiv');
		$newHook.removeClass('hide');
		
		//add section id to add-item button
		var tempID = $newSec.find(".newItem").attr('id');
		var newID = tempID.replace(/\d+/,newCount);
		$newSec.find(".newItem").attr('id', newID);
		
		//add section id to delete-section button
		var tempID = $newSec.find(".deleteSection").attr('id');
		var newID = tempID.replace(/\d+/,newCount);
		$newSec.find(".deleteSection").attr('id', newID);
		
		//now we fix placeholder
		$newSec.find("input[name^=mSectionName]").each(function() {
			var temp = $(this).val();
			$(this).val("");
			$(this).attr('placeholder', temp);
			$(this).attr('name', 'mSectionName['+newCount+']');
			
			//data-attribute
			$(this).attr('data-insert', true);
			$(this).data('insert', true);
			$(this).attr('data-id', 'section'+newCount+'s');
			$(this).data('id', 'section'+newCount+'s');
		});
		
		$newSec.find(".menuSectionField").addClass('section'+newCount);
		
		//sorting
		$newSec.find(".hasTableHeader").after("<div class='sortWithinDiv'> </div>" );
		$newSec.find(".sortWithinDiv").sortable(sortableParams);
		
		$newSec.find('.sortWithinDiv').after($newHook);
		
		//insert at the end of the table
		if($('.moveSec:last').length)
		{
			$("body").find('.moveSec:last').after($newSec);
		}
		else
		{
			$(this).parent().parent().before($newSec);
		}
		
		$newSec.slideDown('slow');
		
		$('body').find('.firstItemDivsection'+newCount).parents('#menuSectionRow').wrap('<div class="moveSec"></div>').wrap('<div class="moveSecInner"></div>');
	});
	
	$(document).on("click", ".deleteSection", function(){
		//get id
		sectionID = ($(this).attr('id')).replace("delete_section","");
		$parentSectionHeader = $(this).parents('#menuSectionRow');
		
		mdFlag = false;
		mdiFlag = false;
		
		if($parentSectionHeader.find("input[name^=mSectionName]").data('md')) mdFlag = true;
		
		$parentSectionHeader.find("input[name^=iName]").each(function() { 
			if($(this).data('mdi')) mdiFlag = true; 
		});
		
		var text = "Are you sure you want to delete this section? Note: all items and options will be lost!";
		
		if(mdFlag && !mdiFlag)
			text = "<strong>This section contains at least 1 Meal Deal.</strong><br/>All Meal Deals will be deleted if you continue!";
		else if(!mdFlag && mdiFlag) 
		    text = "<strong>This section contains item(s) that are part of at least 1 Meal Deal.</strong><br/>These items will be disassociated with all Meal Deals if you continue!";
		else if(mdFlag && mdiFlag)
			text = "<strong>This section contains Meal Deal(s) and item(s) that are part of Meal Deals.</strong><br/>All Meal Deals will be deleted and all Meal Deal items will be disassociated from Meal Deals.";
		
		noty({
			layout: 'center',
			type: 'confirm',
			text: text,
			buttons: [
			{addClass: 'alert tiny', text: _tr('Yes, delete this section and all its contents!'), onClick: function($noty) {
				//get and update current count
				var secCount = $("#sectionCountAct").val();
				var newCount = parseInt(parseInt(secCount) - 1);
				$("#sectionCountAct").val(newCount);
				
				//count all items in question and get their ids
				itemCount = 0;
				itemIDArray = new Array();
				$(".tablesection"+sectionID).each(function() {
					itemIDArray[itemCount] = ($(this).attr('id')).replace("item","");
					itemCount++;
				});
				
				for(i=0;i<itemIDArray.length;i++) //remove all option count data for each item and mark for deletion
				{
					$("#item"+itemIDArray[i]+"_optionCount").remove();
					$("#item"+itemIDArray[i]+"_optionCountAct").remove();
					
					//add data-attribute
					$("#item"+itemIDArray[i]).find("input[name^=iName], input[name^=iMod], input[name^=oName]").each(function() {
						$(this).attr('data-delete',true);
						$(this).data('delete',true);
					});
				}
				
				//add data-attribute
				$parentSectionHeader.find("input[name^=mSectionName]").each(function() {
					$(this).attr('data-delete',true);
					$(this).data('delete',true);
				});
				
				//remove required
				$parentSectionHeader.find("input[name^=mSectionName], input[name^=iName], input[name^=iPrice], input[name^=iDesc], input[name^=iQuan], input[name^=iVisi], input[name^=iMod], select[name^=iModType], input[name^=oName], input[name^=oPrice], input[name^=oVisi]").each(function() {
					$(this).removeAttr('required');
				});
				
				
				
				//now we adjust item count
				var itemCounter = $("#itemCountAct").val();
				var newCount = parseInt(parseInt(itemCounter) - itemCount);
				$("#itemCountAct").val(newCount);

				//we hide the section here
				$parentSectionHeader.hide(); //remove section header and buttons!

				$(".tablesection"+sectionID).hide(); //tables of all items gone!
				$(".firstItemDivsection"+sectionID).hide(); //hidden section hook gone!

				$noty.close();
			  }
			},
			{addClass: 'secondary tiny', text: _tr('No, go back.'), onClick: function($noty) {
				$noty.close();
			  }
			}
		  ]
		});
	});
	
	$(".itemMenuSingleSelect").multiselect({
	   multiple: false,
	   header: false,
	   noneSelectedText: "Pick an option type",
	   selectedList: 1
	});
	

	$("input[name^=iMod]").autocomplete({ source: [ _tr("Choose a size"),_tr("Choose a flavour"),_tr("Choose a topping"),_tr("Choose some extras"),_tr("Choose a side dish") ], delay: 10, minLength: 0 });
	$("input[name^=iMD]").autocomplete({ source: [ _tr("Choose a main"),_tr("Choose a side"),_tr("Choose a drink"),_tr("Choose a curry"),_tr("Choose a burger") ], delay: 10, minLength: 0 });
	
	$(document).on("click", '.showAChevy', function(){
		$elem = $(this).prevAll('input:first');
		$elem.focus();
		$elem.trigger('click');
	});
	
	$(document).on("click", 'input[name^=iMod], input[name^=iMD]', function(){
		$(this).parent('.modifierRow').find("input[name^=iMod]").autocomplete( "search", "C" );
		$(this).parent('.modifierRow').find("input[name^=iMD]").autocomplete( "search", "C" );
	});
	
	if($("#mName").length > 0)
	{
		$(".sortWithinDiv").sortable(sortableParams);
		$(".dynamicDataTable").sortable({ 
			opacity: 0.5, 
			axis: "y", 
			cursor: "move", 
			containment: ".dynamicDataTable", 
			handle: ".sortSecHandle", 
			cancel: "input,textarea,select,option",
			placeholder: "sortable-placeholder-sec",
			tolerance: "pointer",
			items: "> .moveSec",
			revert: 100,
			delay: 100,
			update: function(event, ui) {
				//update all sections from the first one in the doc
				var section = 1 ;
				$('body').find('.moveSec').each(function(){
					//for each section
					$(this).find("input[name^=mSectionName]").attr('name','mSectionName['+section+']'); //update name
					$(this).find("input[name^=mSectionName]").alterClass('section*', "section"+section);
					
					$(this).find("button[id^=add_section]").attr('id','add_section'+section+''); //update add button
					$(this).find("button[id^=delete_section]").attr('id','delete_section'+section+''); //update delete button
					
					
					$(this).find("table.menuTable").alterClass('tablesection*', "tablesection"+section);   
					
					$(this).find("input[name^=iName]").each(function(){
						tempName = $(this).attr('name');
						newName = tempName.replace(/\[section\d+\]/gi, "[section"+section+"]");
						$(this).attr('name', newName);
					});//update name
					
					$(this).find("input[name^=iDesc]").each(function(){
						tempName = $(this).attr('name');
						newName = tempName.replace(/\[section\d+\]/gi, "[section"+section+"]");
						$(this).attr('name', newName);
					});//update name
					
					$(this).find("input[name^=iPrice]").each(function(){
						tempName = $(this).attr('name');
						newName = tempName.replace(/\[section\d+\]/gi, "[section"+section+"]");
						$(this).attr('name', newName);
					});//update name
					
					$(this).find("input[name^=iQuan]").each(function(){
						tempName = $(this).attr('name');
						newName = tempName.replace(/\[section\d+\]/gi, "[section"+section+"]");
						$(this).attr('name', newName);
					});//update name
					
					$(this).find("input[name^=iVisi]").each(function(){
						tempName = $(this).attr('name');
						newName = tempName.replace(/\[section\d+\]/gi, "[section"+section+"]");
						$(this).attr('name', newName);
					});//update name 
					
					$(this).find("button[id^=dup]").each(function(){
						tempName = $(this).attr('id');
						newName = tempName.replace(/_section\d+/gi, "_section"+section);
						$(this).attr('id', newName);
					});//update duplicate button
					
					$(this).find("div").alterClass('firstItemDivsection*', "firstItemDivsection"+section); 
					
					//add data-attribute
					$(this).find('input[name^=mSectionName]').each(function(){
						$(this).attr('data-edit',true);
						$(this).data('edit',true);
					});
					
					section++;
				});
			}
		});
	}
	
	//add data-attribute
	//main entries
	$(document).on("blur", 'input[name^=mName], input[name^=mSectionName], input[name^=iName], input[name^=iMod], input[name^=oName]', function(){
		$(this).attr('data-edit',true);
		$(this).data('edit',true);
	});
	//dependant entries
	//item 
	$(document).on("blur", 'input[name^=iDesc], input[name^=iPrice], input[name^=iQuan], input[name^=iVisi]', function(){
		$(this).parents('.itemTR').first().find('input[name^=iName]').attr('data-edit',true);
		$(this).parents('.itemTR').first().find('input[name^=iName]').data('edit',true);
	});
	//mod 
	$(document).on("change", 'select[name^=iModType]', function(){
		$(this).parents('.subHeaderTR').first().find('input[name^=iMod]').attr('data-edit',true);
		$(this).parents('.subHeaderTR').first().find('input[name^=iMod]').data('edit',true);
	});
	//opt 
	$(document).on("blur", 'input[name^=oPrice], input[name^=oVisi]', function(){
		$(this).parents('.optionTR').first().find('input[name^=oName]').attr('data-edit',true);
		$(this).parents('.optionTR').first().find('input[name^=oName]').data('edit',true);
	});
	
	$('.collapseAllMenu').on('click', function(){
		//lock all
		$("body .itemSave").each(function(){
			if($(this).is(":visible"))
				$(this).trigger('click');
		});
	});
	
	$('#menuConfigForm').click(function(event) {
	  $(this).data('clicked',$(event.target))
	});
	
	$("#menuConfigForm").on('invalid', function (event) {
		//open all error areas
		$("td.error").each(function(){
			if( !$(this).is(":visible") )
			{	
				$currButton = $(this).closest('table').find('.itemEdit');
				if($currButton.is(":visible")) { $currButton.click(); }
					//$currButton.trigger('click'); 
			}
		});
	});

	var isSubmitForm = true;

	var $loadingContent = $('#loadingConfig');

	var postImage = 0;

	$(document).on('click', '.collapseSection', function(){
		var $this = $(this);
		if ( $this.is(':checked') && $this.data('value') != '1' ) {
			$this.data('edit', true);
		} else if(!$this.is(':checked') && $this.data('value') == '1' ) {
			$this.data('edit', true);
		} else {
			$this.data('edit', false);
		}
	});
	
	$("#menuConfigForm").on('valid', function (event) {
		var newSubmitTime = new Date().getTime();

		if(  isSubmitForm && (newSubmitTime - submitTime) > 400 && !postImage )
		{

			$loadingContent.show();
			isSubmitForm = false;
			//who be clickin'?
			var editingSkip = 0;
			if ($(this).data('clicked').is('[id=menuSaveButtonE]')) editingSkip = 1;
			
			$('#menuSaveButton').hide();
			if(editingSkip) $('#menuSaveButtonE').hide();
			$('#savingButton').show();
			
			var url = "/saveMenu";
			
			//create menu object
			var menu = {};
			
			//MENU
			menu['id'] 			= $('#menuID').val();
			menu['name']		= $('#mName').val();
			
			menu['edit']		= $('#mName').data('edit');
			
			menu['accountId']	= $('#accountID').val();
			
			//SECTIONS
			menu['sections'] = {};
			secCounter = 1;

			var $inputsSections = $("input[name^=mSectionName]");

			for (var i = 0, len = $inputsSections.length; i < len; i++) {
				var $inputSectionIndividual = $( $inputsSections[i] );

				var sID = $inputSectionIndividual.data('id');
				
				if(sID != "section0s")
				{
					menu['sections'][secCounter] = {};

					var menuSecionOneNivel = menu['sections'][secCounter];

					var $inputCollapse = $inputSectionIndividual.parent().parent().parent().find('.collapseSection');

					var collapse = $inputCollapse.is(':checked') ? 1 : 0;
					
					menuSecionOneNivel['id'] 			= sID.replace(/section/,'');
					menuSecionOneNivel['name'] 		= $inputSectionIndividual.val();
					menuSecionOneNivel['position'] 	= secCounter;
					menuSecionOneNivel['collapse'] 	= collapse;
					
					menuSecionOneNivel['insert'] 		= $inputSectionIndividual.data('insert');
					menuSecionOneNivel['edit'] 		= $inputSectionIndividual.data('edit');
					menuSecionOneNivel['delete'] 		= $inputSectionIndividual.data('delete');
					menuSecionOneNivel['md'] 			= $inputSectionIndividual.data('md');
					
					menuSecionOneNivel['menuId'] 		= menu['id'];

					if ( !menuSecionOneNivel['edit'] && !menuSecionOneNivel['insert'] && !menuSecionOneNivel['delete'] ) {
						menuSecionOneNivel['edit'] = $inputCollapse.data('edit');
					}
					
					//ITEMS
					menuSecionOneNivel['items'] = {};

					menu['sections'][secCounter] = menuSecionOneNivel;
					var $fullSection = $inputSectionIndividual.parents("#menuSectionRow");
					itemCounter = 1;

					var $tablesSection = $fullSection.find('.tablesection'+secCounter);

					for (var j = 0, lenTable = $tablesSection.length; j < lenTable; j++ ) {
						
						var $tableSectionUnique = $( $tablesSection[j] );
					
					
						var iID = $tableSectionUnique.find('input[name^=iName]').data('id');
						
						if(iID != "item0i")
						{
							var $inputIPrice = $tableSectionUnique.find('input[name^=iPrice]');
							var $inputName = $tableSectionUnique.find('input[name^=iName]');

							menuSecionOneNivel['items'][itemCounter] = {};
							menu['sections'][secCounter]['items'][itemCounter] = {};

							var menuSectionOneNivelItem = menuSecionOneNivel['items'][itemCounter];
							
							menuSectionOneNivelItem['id'] 			= iID.replace(/item/,'');
							menuSectionOneNivelItem['name'] 			= $tableSectionUnique.find('input[name^=iName]').val();
							menuSectionOneNivelItem['description']	= $tableSectionUnique.find('input[name^=iDesc]').val();
							if($inputIPrice.val() == '')
								menuSectionOneNivelItem['price'] 	= 0;
							else	
								menuSectionOneNivelItem['price'] 	= $inputIPrice.val();
							menuSectionOneNivelItem['visible'] 		= $tableSectionUnique.find('input[name^=iVisi]:checked').val();
							menuSectionOneNivelItem['quantity'] 		= 0;
							menuSectionOneNivelItem['position'] 		= parseInt(itemCounter+1000);
								
							menuSectionOneNivelItem['insert'] 		= $inputName.data('insert');
							menuSectionOneNivelItem['edit'] 			= $inputName.data('edit');
							menuSectionOneNivelItem['delete'] 		= $inputName.data('delete');
							menuSectionOneNivelItem['mdi'] 			= $inputName.data('mdi');
							menuSectionOneNivelItem['md'] 			= $inputName.data('md');
								
							menuSectionOneNivelItem['menuId'] 		= menu['id'];
							menuSectionOneNivelItem['venueId'] 		= $('#venueID').val();
							menuSectionOneNivelItem['sectionId'] 	= menuSecionOneNivel['id'];
							
							if ( !$inputName.data('delete') ) {
								menuSectionOneNivelItem['images'] 		= imagesMenu[iID];
								menuSectionOneNivelItem['tags'] 		= tagsMenu[iID];

								if( !menuSectionOneNivelItem['edit'] && !menuSectionOneNivelItem['insert'] && !menuSectionOneNivelItem['delete'] 
									&& imagesMenu[iID] instanceof Object && imagesMenu[iID].length && !imagesMenu[iID][0].saved) {
									menuSectionOneNivelItem['edit'] = true;
								}
							}
							//MODIFIERS
							menuSectionOneNivelItem['modifiers'] = {};

							menu['sections'][secCounter]['items'][itemCounter] = menuSectionOneNivelItem;
							var $fullItem = $tableSectionUnique.find(".subHeaderTR");
							modCounter = 1;

							for (var k = 0, lenItem = $fullItem.length; k < lenItem; k++) {

								var $fullItemUnique = $( $fullItem[k] );
							
								var mID = $fullItemUnique.find('input[name^=iMod]').data('id');
								
								if(mID != "mod0m")
								{
									var menuSectionOneNivelItemModifiers = menuSectionOneNivelItem['modifiers'];

									menuSectionOneNivelItemModifiers[modCounter] = {};

									var menuSectionOneNivelItemModifiersCounter = menuSectionOneNivelItemModifiers[modCounter];
									
									menuSectionOneNivelItemModifiersCounter['id'] 		= mID.replace(/mod/,'');
									menuSectionOneNivelItemModifiersCounter['name'] 	= $fullItemUnique.find('input[name^=iMod]').val();
									menuSectionOneNivelItemModifiersCounter['position'] = modCounter;
									menuSectionOneNivelItemModifiersCounter['type']	 	= $fullItemUnique.find('select[name^=iModType]').val();
									switch(menuSectionOneNivelItemModifiersCounter['type'])
									{
										case "S":
										{
											menuSectionOneNivelItemModifiersCounter['minChoices'] = "1";
											menuSectionOneNivelItemModifiersCounter['maxChoices'] = "1";
											break;
										}
										case "M":
										{
											menuSectionOneNivelItemModifiersCounter['minChoices'] = "1";
											menuSectionOneNivelItemModifiersCounter['maxChoices'] = "-1";
											break;
										}
										case "O":
										{
											menuSectionOneNivelItemModifiersCounter['minChoices'] = "0";
											menuSectionOneNivelItemModifiersCounter['maxChoices'] = "-1";
											break;
										}
										default:
										{
											menuSectionOneNivelItemModifiersCounter['minChoices'] = "0";
											menuSectionOneNivelItemModifiersCounter['maxChoices'] = "-1";
											break;
										}
									}
									
									var $inputNameItem = $fullItemUnique.find('input[name^=iMod]');

									menuSectionOneNivelItemModifiersCounter['insert'] 	= $inputNameItem.data('insert');
									menuSectionOneNivelItemModifiersCounter['edit'] 	= $inputNameItem.data('edit');
									menuSectionOneNivelItemModifiersCounter['delete'] 	= $inputNameItem.data('delete');
									
									menuSectionOneNivelItemModifiersCounter['itemId']	= menuSectionOneNivelItem['id'];
									
									//OPTIONS
									menuSectionOneNivelItemModifiersCounter['options'] = {};

									menu['sections'][secCounter]['items'][itemCounter]['modifiers'][modCounter] = menuSectionOneNivelItemModifiersCounter;
									var $fullMod = $fullItemUnique.nextAll("tr"); //THIS TAKES ALL OPTIONS FROM MODS BELOW IT!! (so we break when we get to a separator)
									optCounter = 1;

									for (var m = 0, lenMod = $fullMod.length; m < lenMod; m++) {

										var $fullModUnique = $( $fullMod[m] );
									
										if( ($fullModUnique.children('.itemSubheader').length) || ($fullModUnique.children('.xtraModTD').length) ) {
											break;
										}  //break!
										else if($fullModUnique.hasClass('optionTR')) //only see the options row
										{
											var oID = $fullModUnique.find('input[name^=oName]').data('id');
											
											if(oID != "opt0o")
											{
												var $inputOPriceMod = $fullModUnique.find('input[name^=oPrice]');
												var $inputONameMod = $fullModUnique.find('input[name^=oName]');

												menuSectionOneNivelItemModifiersCounter['options'][optCounter] = {};

												// menu['sections'][secCounter]['items'][itemCounter]['modifiers'][modCounter]['options'] = {};
												menu['sections'][secCounter]['items'][itemCounter]['modifiers'][modCounter]['options'][optCounter] = {}
												var menuSectionOneNivelItemModifiersCounterOptions = menuSectionOneNivelItemModifiersCounter['options'][optCounter];
												
												menuSectionOneNivelItemModifiersCounterOptions['id'] 			= oID.replace(/opt/,'');
												menuSectionOneNivelItemModifiersCounterOptions['name'] 			= $inputONameMod.val();
												if($inputOPriceMod.val() == '')
													menuSectionOneNivelItemModifiersCounterOptions['price'] 	= 0;
												else	
													menuSectionOneNivelItemModifiersCounterOptions['price'] 	= $inputOPriceMod.val();
												menuSectionOneNivelItemModifiersCounterOptions['visible'] 		= 1;
												menuSectionOneNivelItemModifiersCounterOptions['position'] 		= optCounter;
													
												menuSectionOneNivelItemModifiersCounterOptions['insert'] 		= $inputONameMod.data('insert');
												menuSectionOneNivelItemModifiersCounterOptions['edit'] 			= $inputONameMod.data('edit');
												menuSectionOneNivelItemModifiersCounterOptions['delete'] 		= $inputONameMod.data('delete');
												
												menuSectionOneNivelItemModifiersCounterOptions['modifierId']	= menuSectionOneNivelItemModifiersCounter['id']; 

												menu['sections'][secCounter]['items'][itemCounter]['modifiers'][modCounter]['options'][optCounter] = menuSectionOneNivelItemModifiersCounterOptions;
												
												optCounter++;
											}
										}
									};
									modCounter++;
								}
							};
							
							itemCounter++;
						}
					};
					
					secCounter++;
				}
			};
		
			menuData = JSON.stringify(menu);
		
			//console.log(menu);
			//console.log(menuData);
			
			$.ajax({
			   type: "POST",
			   url: url,
			   contentType: "application/json",
			   data: menuData, //custom serialization
			   success: function(data)
			   {
					try
					{
						var dataArray = jQuery.parseJSON(data); //parsing JSON
					}
					catch(e)
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: _tr("Sorry, but there's been an error processing your request.") //text: 'Connection Error! Check API endpoint.'
						});
						
						//alert(data);
						
						return false;
					}
					
					if( typeof dataArray['status'] !='undefined' || (typeof dataArray['result'] !='undefined' && typeof dataArray['result']['status'] !='undefined') ) //error
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: _tr("Sorry, but there's been an error processing your request.") //text: dataArray['message']
						});
				   
					}
					else
					{	
						newIDs = dataArray['update'];
						var imagesIDS = dataArray['images'];

						if(Object.keys(newIDs).length > 0) //this is an object not array so length and stuff works differently
						{
							$.each(newIDs, function(index, value) {
							if(index.match(/menu/))
							{
							  $('input[value='+index+']').val(value); //find by value and update!
							}
							else  
							{ 
								var $inputAjax = $('input[data-id='+index+']');
								$inputAjax.attr('data-id',value); //find by value and update!
								$inputAjax.data('id',value); //find by value and update! (use value from top as index as its already applied!)
							}
							});
						}

						if ( Object.keys(imagesIDS).length > 0 ) {
							$.each(imagesIDS, function( index, value ){
								if ( value && value.length ) {
									if ( value[0] instanceof Object ) {
										if (value[0].hasOwnProperty('replace')) {
											imagesMenu[value[0].id] = [{
												saved: true,
												url: imagesMenu[index][0].url,
												cropped: true
											}]
										}
									}
									imagesMenu[index][0].saved = true;
								}
							})
						}
						
						noty({ type: 'success', text: _tr('Menu configuration has been saved!') });
						if($('#redirectFlag').val()=='1' && !editingSkip) setTimeout(function(){window.location.replace("/dashboard");}, 1000);
					}
				}
			 }).done(function() {
				if($('#redirectFlag').val()!='1') $('#menuSaveButton').show(); 
				
				if(editingSkip)
				{ 
					$('#menuSaveButton').show(); 
					$('#menuSaveButtonE').show(); 
				}
				
				var $inputMName = $("#mName");

				//refresh data attributes
				$inputMName.attr('data-edit', false);
				$inputMName.data('edit', false);

				var $inputEachAjax = $("input[name^=mSectionName], input[name^=iName], input[name^=iMod], input[name^=oName]");
				
				for (var p = 0, lenAjax = $inputEachAjax.length; p < lenAjax; p++) {
					
					var $inputEachAjaxUnique = $( $inputEachAjax[p] );

					if ( $inputEachAjaxUnique[0].name.indexOf('mSectionName') !== -1 ) {
						var $inputCollapseAjax = $inputEachAjaxUnique.parent().parent().parent().find('.collapseSection');
						var collapseAjax = $inputCollapseAjax.is(':checked') ? 1 : 0;
						$inputCollapseAjax.data('value', collapseAjax);
						$inputCollapseAjax.attr('data-value', collapseAjax);
					}
				
					$inputEachAjaxUnique.attr('data-delete', false);
					$inputEachAjaxUnique.attr('data-insert', false);
					$inputEachAjaxUnique.attr('data-edit', false);
					
					$inputEachAjaxUnique.data('delete', false);
					$inputEachAjaxUnique.data('insert', false);
					$inputEachAjaxUnique.data('edit', false);
				};
				
				$('#savingButton').hide();

				isSubmitForm = true;

				$loadingContent.hide();
			 });
		}
		//update Time
		submitTime = new Date().getTime();
		return false; // avoid to execute the actual submit of the form.
	}); 
	
	$(document).on("click", ".newEvent, .eventDuplicate", function() {
		//new item or duplicate?
		var dup = 0;
		if($(this).hasClass("eventDuplicate")) dup = 1;
		var $oldTab;
		//get table event number
		$curTable = $(this).closest('table');
		var eventID = $curTable.attr('id');
		
		//get and update current count
		var eventCount = $("#eventCount").val();
		var newCount = parseInt(parseInt(eventCount) + 1);
		$("#eventCount").val(newCount);
		$("#eventCountAct").val(parseInt($("#eventCountAct").val())+1);
		
		if(dup) //clone an existing row
		{
			//create variables and insert
			$newOCount = $("#"+eventID+"_optionCount").clone(true);
			$newOCount.attr('id','event'+newCount+'_optionCount');
			$newOCount.attr('name','event'+newCount+'_optionCount');
			$newOCountAct = $("#"+eventID+"_optionCountAct").clone(true);
			$newOCountAct.attr('id','event'+newCount+'_optionCountAct');
			$newOCountAct.attr('name','event'+newCount+'_optionCountAct');
			$("#"+eventID+"_optionCountAct").after($newOCountAct);
			$("#"+eventID+"_optionCountAct").after($newOCount);
		
			//clone specific table
			$oldTab = $("#"+eventID);			
			$newTab = $("#"+eventID).clone(false);
			$newTab.attr('id','event'+newCount);
		}
		else //clone a dummy row
		{
			//create variables and insert
			$newOCount = $("#event0_optionCount").clone(true);
			$newOCount.attr('id','event'+newCount+'_optionCount');
			$newOCount.attr('name','event'+newCount+'_optionCount');
			$newOCount.val(1);
			$newOCountAct = $("#event0_optionCountAct").clone(true);
			$newOCountAct.attr('id','event'+newCount+'_optionCountAct');
			$newOCountAct.attr('name','event'+newCount+'_optionCountAct');
			$newOCountAct.val(1);
			$("#event0_optionCountAct").after($newOCountAct);
			$("#event0_optionCountAct").after($newOCount);
			
			//clone dummy table
			$newTab = $("#event0").clone(true);
			$newTab.attr('id','event'+newCount);
		}
		
		//Replace ids with incremented value and make value = default value
		$newTab.find(".eventTR input").each(function() {
			if(!dup) $(this).val( $(this).prop("defaultValue") );
			var tempName = $(this).attr('name');
			var newName = tempName.replace(/\[\d+\]/gi, "["+newCount+"]");
			$(this).attr('name', newName);
		});
		
		//Replace ids with incremented value and make value = default value
		$newTab.find(".optionTR input").each(function() {
			if(!dup) $(this).val( $(this).prop("defaultValue") );
			var tempName = $(this).attr('name');
			var newName = tempName.replace(/event\d+/gi, 'event'+newCount);
			newName = newName.replace(/\[\d+\]/gi, "["+$newOCount.val()+"]");
			$(this).attr('name', newName);
		});
		
		//remove multiselect
		if(dup) $newTab.find(".ui-multiselect").remove();
		
		//Replace ids with incremented value and make value = default value + add multiselect
		$newTab.find(".optionTR .eventTDCollection select").each(function() {
			if(!dup) $(this).val( $(this).prop("defaultValue") );
			var tempName = $(this).attr('name');
			var newName = tempName.replace(/event\d+/gi, 'event'+newCount);
			newName = newName.replace(/\[\d+\]/gi, "["+$newOCount.val()+"]");
			$(this).attr('name', newName);
			
			$(this).multiselect({
			   multiple: false,
			   header: false,
			   noneSelectedText: _tr("Choose a Collection Slot"),
			   selectedList: 1,
			   minWidth: 342
			}); 
		});

		//Replace ids with incremented value and make value = default value + add multiselect
		$newTab.find(".optionTR .eventTDOutletLocation select").each(function() {
			if(!dup) $(this).val( $(this).prop("defaultValue") );
			if ($oldTab) $(this).val($oldTab.find(".optionTR .eventTDOutletLocation select").val());
			var tempName = $(this).attr('name');			
			var newName = tempName.replace(/event\d+/gi, 'event'+newCount);			
			newName = newName.replace(/\[\d+\]/gi, "["+newCount+"]");			
			$(this).attr('name', newName);
			$(this).multiselect({
			   multiple: false,
			   header: false,
			   noneSelectedText: _tr("Choose Event Location"),
			   selectedList: 1,
			   minWidth: 342
			}); 
		});
		
		if(!dup){
			//now we fix placeholder
			$newTab.find("input[name^=eName]").each(function() {
				var temp = $(this).val();
				$(this).val("");
				$(this).attr('placeholder', temp);
			});
			
			//now we fix placeholder
			$newTab.find("input[name^=eTime]").each(function() {
				var temp = $(this).val();
				$(this).val("");
				$(this).attr('placeholder', temp);
				$(this).attr('pattern', "\\d\\d:\\d\\d");
			});
			
			//now we fix placeholder
			$newTab.find("input[name^=eETime]").each(function() {
				var temp = $(this).val();
				$(this).val("");
				$(this).attr('placeholder', temp);
				$(this).attr('pattern', "\\d\\d:\\d\\d");
			});
			
			//now we fix placeholder
			$newTab.find("input[name^=eDate]").each(function() {
				var temp = $(this).val();
				$(this).val("");
				$(this).attr('placeholder', temp);
				$(this).attr('pattern', "^\\d\\d\\/\\d\\d\\/\\d\\d\\d\\d$");
			});
			
			//now we fix placeholder
			$newTab.find("input[name^=eLead]").each(function() {
				var temp = $(this).val();
				$(this).val("");
				$(this).attr('placeholder', temp);
			});
		}
		
		//now we fix eID
		$newTab.find("input[name^=eID]").val("e"+newCount);
				
		//now we give the item id to the duplicate button
		$newTab.find(".eventDuplicate").attr('id',"dup"+newCount);
		
		//now we add datepicker
		$newTab.find(".eventTDDate input").fdatepicker({format:'dd/mm/yyyy', onRender: function(date) {return date.valueOf() < now.valueOf() ? 'disabled' : '';}}); 
		
		//now we add timepicker
		$newTab.find("input[name^=eTime]").timepicker({'showDuration': true, 'timeFormat': 'H:i', 'step': 15 }); 
		$newTab.find("input[name^=eETime]").timepicker({'showDuration': true, 'timeFormat': 'H:i', 'step': 15 }); 
		
		$newTab.css('backgroundColor','#fafafa');
		$newTab.css('box-shadow', 'rgba(70, 83, 93, 0.54902) 0px 0px 6px inset');
		$newTab.css('max-width', '100%'); 
		
		//hide it so we can animate it!
		$newTab.css('display','none');
		
		//insert before section header/before hidden div
		$(".firstEventDiv").before($newTab); 
		$newTab.slideRow('down');
		if(!$newTab.find('.eventSave').is(':visible')) $newTab.find('.eventTDEdit').trigger('click');
		$("html, body").animate({scrollTop: $($newTab).offset().top - ( $(window).height() - $($newTab).outerHeight(true) ) / 2}, 200);
	});
	
	$("input[name^=eTime]").on('changeTime',function() {
		currTime = $(this).val()+":00";
		
		newTime = extractAMPM("January 01, 2000 "+currTime);
		
		$(this).parents('table').find("input[name^=eETime]").timepicker('remove');
		$(this).parents('table').find("input[name^=eETime]").timepicker({'showDuration': true, 'timeFormat': 'H:i', 'step': 15 });
		$(this).parents('table').find("input[name^=eETime]").timepicker({ 'minTime': newTime, 'timeFormat': 'H:i', 'step': 15 });
		$(this).parents('table').find("input[name^=eETime]").timepicker('setTime', newTime);
	});
	
	$(document).on("click", ".eventSave", function() {
		$(this).hide();
		$curItem = $(this).closest('table');
		$curItem.find("tr").removeClass('eventEdit');
		$curItem.find("tr").addClass('savedInput');
		$curItem.find("input").attr("readonly", "readonly");
		$curItem.find(".eventTDEdit").removeClass('hide');
		$curItem.find(".eventTDEdit").show();
		$curItem.find(".optionTR").slideRow('up');
		$curItem.find(".eventMenuSingleSelect").multiselect("disable");
		$curItem.css('background', 'transparent');
		$curItem.css('box-shadow', '0px 0px 0px');
		$curItem.css('max-width', '100%');
	});
	
	$(document).on("click", ".eventTDEdit, .eventTR input[readonly='readonly']", function() {
		if($(this).hasClass('eventTDEdit')) $(this).hide();
		else $(this).closest('table').find('.eventTDEdit').hide();
		$curItem = $(this).closest('table');
		$curItem.find("tr").addClass('eventEdit');
		$curItem.find("tr").removeClass('savedInput');
		$curItem.find("input").removeAttr("readonly");
		$curItem.find(".eventSave").removeClass('hide');
		$curItem.find(".eventSave").show();
		$curItem.find(".optionTR").slideRow('down');
		$curItem.find(".eventMenuSingleSelect").multiselect("enable");
		$curItem.css('background', '#fafafa');
		$curItem.css('box-shadow', 'rgba(70, 83, 93, 0.54902) 0px 0px 6px inset');
		$curItem.css('max-width', '100%');
		
		$curItem.find("td.eventTDCollection select").each(function() {
			$(this).multiselect({
			   multiple: false,
			   header: false,
			   noneSelectedText: _tr("Choose a Collection Slot"),
			   selectedList: 1,
			   minWidth: 342
			}); 
		});

		$curItem.find("td.eventTDOutletLocation select").each(function() {
			$(this).multiselect({
			   multiple: false,
			   header: false,
			   noneSelectedText: _tr("Choose Event Location"),
			   selectedList: 1,
			   minWidth: 342
			}) ; 
		});
	});
	
	$(document).on("click", ".eventDelete", function() {
		//get event number
		$curTable = $(this).closest('table');
		eventID = $curTable.attr('id');
		
		realEventID = $curTable.find("input[name^=eID]").val();
		
		if(typeof realEventID =='undefined' || realEventID == '' || !realEventID.match(/^\d+?$/gi)) //event not saved in DB
		{
			noty({
				layout: 'center',
				type: 'confirm',
				text: _tr('Are you sure you want to delete this event? Note: all event data will be lost!'),
				buttons: [
				{addClass: 'alert tiny', text: _tr('Yes, delete this event!'), onClick: function($noty) {
					
					//get and update current count
					eventCount = $("#eventCountAct").val();
					newCount = parseInt(parseInt(eventCount) - 1);
					$("#eventCountAct").val(newCount);
					
					//bye-bye
					$("#"+eventID).remove();
					
					$noty.close();
				  }
				},
				{addClass: 'secondary tiny', text: _tr('No, go back.'), onClick: function($noty) {
					$noty.close();
				  }
				}
			  ]
			});
		}
		else //event in DB
		{
			noty({
				layout: 'center',
				type: 'confirm',
				text: _tr('Are you sure you want to delete this event? Note: all event data will be lost!'),
				buttons: [
				{addClass: 'alert tiny', text: _tr('Yes, delete this event!'), onClick: function($noty) {
					
					var url = "/deleteEvent";
					$.ajax({
						   type: "POST",
						   url: url,
						   data: 'eventID='+realEventID, // serializes the form's elements.
						   success: function(data)
						   {
								try
								{
									var dataArray = jQuery.parseJSON(data); //parsing JSON
								}
								catch(e)
								{
									noty({
									  type: 'error',  layout: 'topCenter',
									  text: _tr("Sorry, but there's been an error processing your request.") /*text: 'Connection Error! Check API endpoint.'*/
									});
									
									//alert(data);
									
									return false;
								}
									
								//get and update current count
								eventCount = $("#eventCountAct").val();
								newCount = parseInt(parseInt(eventCount) - 1);
								$("#eventCountAct").val(newCount);
								
								//bye-bye
								$("#"+eventID).remove();
							}
						 });
					$noty.close();
				  }
				},
				{addClass: 'secondary tiny', text: _tr('No, go back.'), onClick: function($noty) {
					$noty.close();
				  }
				}
			  ]
			});
		}
		
	});
	
	$(".eventMenuSingleSelect.selectCollectionSlot").multiselect({
	   multiple: false,
	   header: false,
	   noneSelectedText: _tr("Choose a Collection Slot"),
	   selectedList: 1,
	   minWidth: 342
	}); 
	$(".eventMenuSingleSelect.selectOutletLocation").multiselect({
	   multiple: false,
	   header: false,
	   noneSelectedText: _tr("Choose Event Location"),
	   selectedList: 1,
	   minWidth: 342
	}); 
		
	$(".eventMenuSingleSelect").multiselect('disable');
	
	$(document).on("click", ".newCollSlot", function() {
		//get event number
		$curTable = $(this).closest('table');
		var eventID = $curTable.attr('id');
		 
		//get and update current count
		var eventCount = $("#"+eventID+"_optionCount").val();
		var newCount = parseInt(parseInt(eventCount) + 1);
		$("#"+eventID+"_optionCount").val(newCount);
		$("#"+eventID+"_optionCountAct").val(parseInt($("#"+eventID+"_optionCountAct").val())+1);
		
		//clone the nearest row
		$curRow = $(this).closest("tr"); 
		
        $newRow = $curRow.clone(false);
		
		$newRow.find("td.eventTDAddMore").empty();
		$newRow.find("td.eventTDAddMore").append("<button type='button' class='delCollSlot secondary' title='Delete this slot'><i class='pd-delete'></i></button>");
		$newRow.find(".ui-multiselect").remove();
		
		$newRow.find("td.eventTDCollection select").each(function() {
			$(this).val( $(this).prop("defaultValue") );
			var tempName = $(this).attr('name');
			var newName = tempName.replace(/\[\d+\]/gi, "["+newCount+"]");
			$(this).attr('name', newName);
			
			$(this).multiselect({
			   multiple: false,
			   header: false,
			   noneSelectedText: _tr("Choose a Collection Slot"),
			   selectedList: 1,
			   minWidth: 342
			}); 
		});	
		
		//replace ids with incremented value and make value = default value
		$newRow.find("input").each(function() {
			$(this).val( $(this).prop("defaultValue") );
			var tempName = $(this).attr('name');
			var newName = tempName.replace(/event\d+/gi, eventID);
			newName = newName.replace(/\[\d+\]/gi, "["+newCount+"]");
			$(this).attr('name', newName);
		});
		
		//now we fix placeholder
		$newRow.find("input[name^=eLead]").each(function() {
			var temp = $(this).val();
			$(this).val("");
			$(this).attr('placeholder', temp);
		});
				
		//hide it so we can animate it!
		$newRow.css('display','none');
		
		//insert at the end of the table
		$("#"+eventID+" tr:last").after($newRow);
		$("#"+eventID+" tr:last").slideRow('down');

		// $(document).foundation('abide', 'events');
		
		$("html, body").animate({scrollTop: $($newRow).offset().top - ( $(window).height() - $($newRow).outerHeight(true) ) / 2}, 200); //.animate({ scrollTop: $($newRow).offset().top }, 250);
	});
	
	$(document).on("click", ".delCollSlot", function() {
		//get item number
		$curTable = $(this).closest('table');
		var eventID = $curTable.attr('id');
		
		//get and update current count
		var eventCount = $("#"+eventID+"_optionCountAct").val();
		var newCount = parseInt(parseInt(eventCount) - 1);
		$("#"+eventID+"_optionCountAct").val(newCount);
		
		//bye-bye
		$(this).parents("tr:first").remove();
	});
	
	$("#eventConfigForm").on('valid', function (event) {
		//prevent multiple submissions
		var newSubmitTime = new Date().getTime();
		
		if( (newSubmitTime - submitTime) > 300 )
		{
			//lock all
			$("body .eventSave").each(function(){
				if($(this).is(":visible"))
					$(this).trigger('click');
			});
			
			//enable dropdowns or we wont get the values!
			$(".eventMenuSingleSelect").multiselect('enable');
			
			var url = "/saveEvent";
			
			$('#eventSubButton').hide();
			$('#savingButton').show();

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
						  type: 'error',  layout: 'topCenter',
						  text: _tr("Sorry, but there's been an error processing your request.") /*text: 'Connection Error! Check API endpoint.'*/
						});
						//alert(data);
						return false;
					}
					
					if( typeof dataArray['status'] !='undefined' || (typeof dataArray['result'] !='undefined' && typeof dataArray['result']['status'] !='undefined') ) //error
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: _tr("Sorry, but there's been an error processing your request.") /*text: dataArray['message']*/
						});
				   
					}
					else
					{	
						newIDs = dataArray['update'];

						if(Object.keys(newIDs).length > 0) //this is an object not array so length and stuff works differently
						{
							$.each(newIDs, function(index, value) {
							  $('input[value='+index+']').val(value); //find by value and update!
							});
						}
						
						noty({ type: 'success', text: 'Event configuration has been saved!' });
						if($('#redirectFlag').val()=='1') setTimeout(function(){window.location.replace("/payment");}, 1000);
					}
				}
			 }).done(function() {
				$('#eventSubButton').show();
				$('#savingButton').hide();
				$(".eventMenuSingleSelect").multiselect('disable');
			 });
		}
		//update Time
		submitTime = new Date().getTime();
		return false; // avoid to execute the actual submit of the form.
	});
	
	$(document).on("click", ".userSave", function() {
		$(this).hide();
		$curItem = $(this).closest('table');
		$curItem.find("tr").removeClass('userEdit');
		$curItem.find("tr").addClass('savedInput');
		$curItem.find("input").attr("readonly", "readonly");
		$curItem.find(".userTDEdit").removeClass('hide');
		$curItem.find(".userTDEdit").show();
		$curItem.find(".userPassTR").hide();
		$curItem.find(".userMenuSingleSelect").multiselect("disable");
		$curItem.css('background', 'transparent');
		$curItem.css('box-shadow', '0px 0px 0px');
		$curItem.css('max-width', '100%'); 
	});
	
	$(document).on("click", ".userTDEdit, .userTR input[readonly='readonly']", function() {
		if($(this).hasClass('userTDEdit')) $(this).hide();
		else $(this).closest('table').find('.userTDEdit').hide();
		$curItem = $(this).closest('table');
		$curItem.find("tr").addClass('userEdit');
		$curItem.find("tr").removeClass('savedInput');
		$curItem.find("input").removeAttr("readonly");
		$curItem.find("input[name^='uEmail']").each(function(){ if($(this).hasClass('preSaved')) $(this).attr("readonly", "readonly"); });
		$curItem.find(".userSave").removeClass('hide');
		$curItem.find(".userSave").show();
		$curItem.find(".userPassTR").show();
		$curItem.find(".userMenuSingleSelect").multiselect("enable");
		$curItem.css('background', '#fafafa');
		$curItem.css('box-shadow', 'rgba(70, 83, 93, 0.54902) 0px 0px 6px inset');
		$curItem.css('max-width', '100%'); 
	});
	
	$(document).on("click", ".newUser", function() {
		//new item or duplicate?
		var dup = 0;
		if($(this).hasClass("userDuplicate")) dup = 1;
		
		//get table user number
		$curTable = $(this).closest('table');
		var eventID = $curTable.attr('id');
		
		//get and update current count
		var userCount = $("#userCount").val();
		var newCount = parseInt(parseInt(userCount) + 1);
		$("#userCount").val(newCount);
		$("#userCountAct").val(parseInt($("#userCountAct").val())+1);
		
		if(dup) //clone an existing row
		{
			//clone specific table
			$newTab = $("#"+eventID).clone(false);
			$newTab.attr('id','user'+newCount);
		}
		else //clone a dummy row
		{
			//clone dummy table
			$newTab = $("#user0").clone(true);
			$newTab.attr('id','user'+newCount);
		}
		
		//replace ids with incremented value and make value = default value
		$newTab.find(".userTR input").each(function() {
			if(!dup) $(this).val( $(this).prop("defaultValue") );
			var tempName = $(this).attr('name');
			var newName = tempName.replace(/\[\d+\]/gi, "["+newCount+"]");
			$(this).attr('name', newName);
		});
		
		$newTab.find("input[name^=uPasswordConf]").each(function() {
			var tempName = $(this).attr('data-equalTo');
			var newName = tempName.replace(/\[\d+\]/gi, "["+newCount+"]");
			$(this).attr('data-equalTo', newName);
		});
		
		$newTab.find("input[id^=uPassword]").each(function() {
			var tempName = $(this).attr('id');
			var newName = tempName.replace(/\[\d+\]/gi, "["+newCount+"]");
			$(this).attr('id', newName);
		});
		
		$newTab.find(".userTR select").each(function() {
			if(!dup) $(this).val( $(this).prop("defaultValue") );
			var tempName = $(this).attr('name');
			var newName = tempName.replace(/\[\d+\]/gi, "["+newCount+"]");
			$(this).attr('name', newName);
			
			$(this).multiselect({
			   multiple: false,
			   header: false,
			   noneSelectedText: _tr("Role"),
			   selectedList: 1,
			   minWidth: 108
			}); 
		});
		
		if(!dup){
			//now we fix placeholder
			$newTab.find("input[name^=uName]").each(function() {
				var temp = $(this).val();
				$(this).val("");
				$(this).attr('placeholder', temp);
			});
		}
		
		//now we fix uID
		$newTab.find("input[name^=uID]").each(function() {
			$(this).val("u"+newCount);
		});
		
		$newTab.find("input[name^=uPass]").attr('required','required');
		$newTab.find("input[name^=uName]").attr('required','required');
		$newTab.find("input[name^=uEmail]").attr('required','required');
				
		//now we give the item id to the duplicate button
		$newTab.find(".userDuplicate").attr('id',"dup"+newCount);
		
		$newTab.css('backgroundColor','#fafafa');
		$newTab.css('box-shadow', 'rgba(70, 83, 93, 0.54902) 0px 0px 6px inset');
		$newTab.css('max-width', '100%'); 
		
		//hide it so we can animate it!
		$newTab.css('display','none');
		
		//insert before section header/before hidden div
		$(".firstUserDiv").before($newTab); 
		$newTab.slideRow('down');
		$("html, body").animate({scrollTop: $($newTab).offset().top - ( $(window).height() - $($newTab).outerHeight(true) ) / 2}, 200);
	});
	
	$(document).on("click", ".userDelete", function() {
		//get event number
		$curTable = $(this).closest('table');
		userID = $curTable.attr('id');
		
		realUserID = $curTable.find("input[name^=uID]").val();
		
		if(typeof realUserID =='undefined' || realUserID == '' || !realUserID.match(/^\d+?$/gi)) //event not saved in DB
		{
			noty({
				layout: 'center',
				type: 'confirm',
				text: _tr('Are you sure you want to delete this user? Note: all user data will be lost!'),
				buttons: [
				{addClass: 'alert tiny', text: _tr('Yes, delete this user!'), onClick: function($noty) {
					
					//get and update current count
					userCount = $("#userCountAct").val();
					newCount = parseInt(parseInt(userCount) - 1);
					$("#userCountAct").val(newCount);
					
					//bye-bye
					$("#"+userID).remove();
					
					$noty.close();
				  }
				},
				{addClass: 'secondary tiny', text: _tr('No, go back.'), onClick: function($noty) {
					$noty.close();
				  }
				}
			  ]
			});
		}
		else //event in DB
		{
			noty({
				layout: 'center',
				type: 'confirm',
				text: _tr('Are you sure you want to delete this user? Note: all user data will be lost!'),
				buttons: [
				{addClass: 'alert tiny', text: _tr('Yes, delete this user!'), onClick: function($noty) {
					
					var url = "/deleteUser";
					$.ajax({
						   type: "POST",
						   url: url,
						   data: 'userID='+realUserID, // serializes the form's elements.
						   success: function(data)
						   {
								try
								{
									var dataArray = jQuery.parseJSON(data); //parsing JSON
								}
								catch(e)
								{
									noty({
									  type: 'error',  layout: 'topCenter',
									  text: _tr("Sorry, but there's been an error processing your request.") /*text: 'Connection Error! Check API endpoint.'*/
									});
									
									//alert(data);
									
									return false;
								}
									
								//get and update current count
								userCount = $("#userCountAct").val();
								newCount = parseInt(parseInt(userCount) - 1);
								$("#userCountAct").val(newCount);
								
								//bye-bye
								$("#"+userID).remove();
							}
						 });
					$noty.close();
				  }
				},
				{addClass: 'secondary tiny', text: _tr('No, go back.'), onClick: function($noty) {
					$noty.close();
				  }
				}
			  ]
			});
		}
		
	});
	
	$(".userMenuSingleSelect").multiselect({
	   multiple: false,
	   header: false,
	   noneSelectedText: "Role",
	   selectedList: 1
	}); 
		
	$(".userMenuSingleSelect").multiselect('disable');
	
	$("#userConfigForm").on('valid', function (event) {
		//lock all
		$("body .userSave").each(function(){
			if($(this).is(":visible"))
				$(this).trigger('click');
		});
		
		$('#userSubButton').hide();
		$('#savingButton').show();
		
		//enable dropdowns or we wont get the values!
		$(".userMenuSingleSelect").multiselect('enable');
		
		var url = "/saveUser";

		var errorFlag = 0;
		
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
						  type: 'error',  layout: 'topCenter',
						  text: _tr("Sorry, but there's been an error processing your request.") /*text: 'Connection Error! Check API endpoint.'*/
						});
						
						errorFlag = 1;
						
						//alert(data);
						return false;
					}
					
					if( typeof dataArray['status'] !='undefined' || (typeof dataArray['result'] !='undefined' && typeof dataArray['result']['status'] !='undefined') ) //error
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: _tr("Username/email already exists")
						  //text: _tr("Sorry, but there's been an error processing your request.") /*text: dataArray['message']*/
						});
						//alert(data);
						errorFlag = 1;
					}
					else
					{	
						newIDs = dataArray['update'];

						if(Object.keys(newIDs).length > 0) //this is an object not array so length and stuff works differently
						{
							$.each(newIDs, function(index, value) {
							  $('input[value='+index+']').val(value); //find by value and update!
							});
						}
						noty({ type: 'success', text: _tr('User configuration has been saved!') });
						errorFlag = 0;
						
						//alert(data);
					}
				}
			 }).done(function() {
					$('#userSubButton').show();
					$('#savingButton').hide();
					$(".userMenuSingleSelect").multiselect('disable');
					if(!errorFlag) 
					{
						$('table').each(function(){
							if($(this).is(':visible'))
								$(this).find('.userPassTR').remove(); //now all saved users are in edit mode only
						});
						$("input[name^='uEmail']").each(function(){ $(this).addClass("preSaved"); }); //make saved input emails permanently readonly
					}
			 });

		return false; // avoid to execute the actual submit of the form.
	});
	
	$(document).on("click", ".outletSave", function() {
		$(this).hide();
		$curItem = $(this).closest('table');
		$curItem.find("tr").removeClass('outletEdit');
		$curItem.find("tr").addClass('savedInput');
		$curItem.find("input").attr("readonly", "readonly");
		$curItem.find(".outletTDEdit").removeClass('hide');
		$curItem.find(".outletTDEdit").show();
		$curItem.find(".outletMenuMultiSelect").multiselect("disable");
		$curItem.css('background', 'transparent');
	});
	
	$(document).on("click", ".outletTDEdit", function() {
		$(this).hide();
		$curItem = $(this).closest('table');
		$curItem.find("tr").addClass('outletEdit');
		$curItem.find("tr").removeClass('savedInput');
		$curItem.find("input").removeAttr("readonly");
		$curItem.find(".outletSave").removeClass('hide');
		$curItem.find(".outletSave").show();
		$curItem.find(".outletMenuMultiSelect").multiselect("enable");
		$curItem.css('background', '#fafafa');
	});
	
	$(document).on("click", ".newOutlet", function() {
		//new item or duplicate?
		var dup = 0;
		if($(this).hasClass("outletDuplicate")) dup = 1;
		
		//get table outlet number
		$curTable = $(this).closest('table');
		var outletID = $curTable.attr('id');
		
		//get and update current count
		var outletCount = $("#outletCount").val();
		var newCount = parseInt(parseInt(outletCount) + 1);
		$("#outletCount").val(newCount);
		$("#outletCountAct").val(parseInt($("#outletCountAct").val())+1);
		
		if(dup) //clone an existing row
		{
			//clone specific table
			$newTab = $("#"+outletID).clone(false);
			$newTab.attr('id','outlet'+newCount);
		}
		else //clone a dummy row
		{
			//clone dummy table
			$newTab = $("#outlet0").clone(true);
			$newTab.attr('id','outlet'+newCount);
		}
		
		//replace ids with incremented value and make value = default value
		$newTab.find(".outletTR input").each(function() {
			if(!dup) $(this).val( $(this).prop("defaultValue") );
			var tempName = $(this).attr('name');
			var newName = tempName.replace(/\[\d+\]/gi, "["+newCount+"]");
			$(this).attr('name', newName);
		});
		
		$newTab.find(".outletTR select").each(function() {
			if(!dup) $(this).val( $(this).prop("defaultValue") );
			var tempName = $(this).attr('name');
			var newName = tempName.replace(/\[\d+\]/gi, "["+newCount+"]");
			$(this).attr('name', newName);
			
			$(this).multiselect({
			   checkAllText: _tr("Select all menus"),
			   uncheckAllText: _tr("Unselect all menus"),
			   noneSelectedText: _tr("Select menu(s) for this outlet"),
			   selectedText: _tr("# of # selected"),
			   selectedList: 0
			});
		});
		
		if(!dup){
			//now we fix placeholder
			$newTab.find("input[name^=oName]").each(function() {
				var temp = $(this).val();
				$(this).val("");
				$(this).attr('placeholder', temp);
			});
		}
		else
		{
			//now we fix uID
			$newTab.find("input[name^=oID]").each(function() {
				$(this).val("");
			});
		}
				
		//now we give the item id to the duplicate button
		$newTab.find(".outletDuplicate").attr('id',"dup"+newCount);
		
		$newTab.css('backgroundColor','#fafafa');
		
		//hide it so we can animate it!
		$newTab.css('display','none');
		
		//insert before section header/before hidden div
		$(".firstOutletDiv").before($newTab); 
		$newTab.slideRow('down');
		$("html, body").animate({scrollTop: $($newTab).offset().top - ( $(window).height() - $($newTab).outerHeight(true) ) / 2}, 200);
	});
	
	$("#new_menu").on('click', function(){
		window.location.href = "/newMenu";
	});
	
	$(".outletMenuMultiSelect").multiselect({
	   checkAllText: _tr("Select all menus"),
	   uncheckAllText: _tr("Unselect all menus"),
	   noneSelectedText: _tr("Select menu(s) for this outlet"),
	   selectedText: _tr("# of # selected"),
	   selectedList: 0
	}); 
		
	$(".outletMenuMultiSelect").multiselect('disable');
	
	$(document).on("click", ".outletDelete", function() {
		//get outlet number
		$curTable = $(this).closest('table');
		outletID = $curTable.attr('id');
		
		realOutletID = $curTable.find("input[name^=oID]").val();
		
		if(typeof realOutletID =='undefined' || realOutletID == '') //event not saved in DB
		{
			noty({
				layout: 'center',
				type: 'confirm',
				text: _tr('Are you sure you want to delete this outlet? Note: all outlet data will be lost!'),
				buttons: [
				{addClass: 'alert tiny', text: _tr('Yes, delete this outlet!'), onClick: function($noty) {
					
					//get and update current count
					outletCount = $("#outletCountAct").val();
					newCount = parseInt(parseInt(outletCount) - 1);
					$("#outletCountAct").val(newCount);
					
					//bye-bye
					$("#"+outletID).remove();
					
					$noty.close();
				  }
				},
				{addClass: 'secondary tiny', text: _tr('No, go back.'), onClick: function($noty) {
					$noty.close();
				  }
				}
			  ]
			});
		}
		else //event in DB
		{
			noty({
				layout: 'center',
				type: 'confirm',
				text: _tr('Are you sure you want to delete this outlet? Note: all outlet data will be lost!'),
				buttons: [
				{addClass: 'alert tiny', text: _tr('Yes, delete this outlet!'), onClick: function($noty) {
					
					var url = "/deleteOutlet";
					$.ajax({
						   type: "POST",
						   url: url,
						   data: 'outletID='+realOutletID, // serializes the form's elements.
						   success: function(data)
						   {
								try
								{
									var dataArray = jQuery.parseJSON(data); //parsing JSON
								}
								catch(e)
								{
									noty({
									  type: 'error',  layout: 'topCenter',
									  text: _tr("Sorry, but there's been an error processing your request.") /*text: 'Connection Error! Check API endpoint.'*/
									});
									
									//alert(data);
									
									return false;
								}
									
								//get and update current count
								outletCount = $("#outletCountAct").val();
								newCount = parseInt(parseInt(outletCount) - 1);
								$("#outletCountAct").val(newCount);
								
								//bye-bye
								$("#"+outletID).remove();
								
								$noty.close();
							}
						 });
					$noty.close();
				  }
				},
				{addClass: 'secondary tiny', text: _tr('No, go back.'), onClick: function($noty) {
					$noty.close();
				  }
				}
			  ]
			});
		}
		
	});
	
	$("#outletConfigForm").on('valid', function (event) {
		//lock all
		$("body .outletSave").each(function(){
			if($(this).is(":visible"))
				$(this).trigger('click');
		});
		
		//enable dropdowns or we wont get the values!
		$(".outletMenuMultiSelect").multiselect('enable');
		
		var url = "/saveOutlet";
		
		$('#outSubButton').hide();
		$('#savingButton').show();

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
						  type: 'error',  layout: 'topCenter',
						  text: _tr("Sorry, but there's been an error processing your request.") /*text: 'Connection Error! Check API endpoint.'*/
						});
						//alert(data);
						return false;
					}
					
					if(typeof dataArray['status'] !='undefined') //error
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: _tr("Sorry, but there's been an error processing your request.") /*text: dataArray['message']*/
						});
					}
					else
					{	
						noty({ type: 'success', text: _tr('Outlet configuration has been saved!') });
						
					}
				}
			 }).done(function() {
				$('#outSubButton').show();
				$('#savingButton').hide();
				$(".outletMenuMultiSelect").multiselect('disable');
			 });

		return false; // avoid to execute the actual submit of the form.
	});
	
	$(".openDay").on('click', function(){
		$(".openDay").addClass('secondary');
		$(this).removeClass('secondary');
		
		id = $(this).attr('id');
		id = id.substring(0, id.length - 1); //delete the 'B' to get just monday, etc.
		
		$(".monday").addClass('hide');
		$(".tuesday").addClass('hide');
		$(".wednesday").addClass('hide');
		$(".thursday").addClass('hide');
		$(".friday").addClass('hide');
		$(".saturday").addClass('hide');
		$(".sunday").addClass('hide');
		
		$("."+id).removeClass('hide');
	});
	
	$("input[name^=ohStartTime]").timepicker({'showDuration': true, 'timeFormat': 'H:i', 'step': 15 }); 
	
	$("input[name^=ohEndTime]").timepicker({'showDuration': true, 'timeFormat': 'H:i', 'step': 15 }); 
	
	$("input[name^=ohStartTime]").on('changeTime',function() {
		currTime = $(this).val()+":00";
		
		newTime = extractAMPM("January 01, 2000 "+currTime);
		
		$(this).parent().next("div").children("input[name^=ohEndTime]").timepicker('remove');
		$(this).parent().next("div").children("input[name^=ohEndTime]").timepicker({'showDuration': true, 'timeFormat': 'H:i', 'step': 15 });
		$(this).parent().next("div").children("input[name^=ohEndTime]").timepicker({ 'minTime': newTime, 'timeFormat': 'H:i', 'step': 15 });
		$(this).parent().next("div").children("input[name^=ohEndTime]").timepicker('setTime', newTime);
	});
	
	$(document).on("click", '.addMoreOH', function(){
				
		$oldDiv = $(this).parents('.openingHoursDiv').find('.openHWrapper:first');
		if ($oldDiv.find('.oh-is-open:first').val() == "c"){
			noty({
			  type: 'error',  layout: 'topCenter',
			  text: "You cannot add another opening hour if your venue is closed today." /*text: dataArray['message']*/
			});
			return;
		}
		// console.log($oldDiv,$oldDiv.val())
		$newDiv = $oldDiv.clone(false);
		
		$ohDowCount = $(this).parents('.openingHoursDiv').find('.openHWrapper').length;
		
		$newDiv.find('input[type=text]').each(function(){
			$(this).val('');
			$(this).timepicker({'showDuration': true, 'timeFormat': 'H:i', 'step': 15 });
		});
		
		$newDiv.find("input[name^=ohStartTime]").on('changeTime',function() {
			currTime = $(this).val()+":00";
			
			newTime = extractAMPM("January 01, 2000 "+currTime);
			$(this).parent().next("div").children("input[name^=ohEndTime]").timepicker('remove');
			$(this).parent().next("div").children("input[name^=ohEndTime]").timepicker({'showDuration': true, 'timeFormat': 'H:i', 'step': 15 });
			$(this).parent().next("div").children("input[name^=ohEndTime]").timepicker({ 'minTime': newTime, 'timeFormat': 'H:i', 'step': 15 });
			$(this).parent().next("div").children("input[name^=ohEndTime]").timepicker('setTime', newTime);
		});
		
		//increment the name for each row
		$newDiv.find("input[type=radio]").each(function(){
			var tempName = $(this).attr('name');
			var newName = tempName.replace(/\[\d*\]/, '['+$ohDowCount+']');
			$(this).attr('name', newName);		
		});
		
		$newDiv.find('.removeOHDiv').show();
		
		//hide it so we can animate it!
		$newDiv.css('display','none');
		
		//add event listener to hid hours if closed
		$newDiv.find(".oh-is-open").on('change',onIsOpenChange).each(function(i){
			// console.log('i = ' + i)
			if (i>0){								
				$(this).find("li:last").remove();
			}
		});		

		//insert at the end of the list
		$(this).parents('.openingHoursDiv').find('.openHWrapper:last').after($newDiv);

		$newDiv.slideDown();

	});
	
	$(document).on("click", '.removeOH', function(){
		$ele = $(this).parents('.openHWrapper');
		
		$ele.slideUp();
		
		$ele.remove();
	});
	
	$(document).on("click", ".applyTimesAllDays", function(){

		id = ($(this).parents('div.applyAllDiv')).attr('id');
		id = id.substring(0, id.length - 1); //delete the 'C' to get just monday, etc.
		
		//used get original values for select. it's not copied on clone
		$original = $(".openingHoursDiv."+id);
		
		//get data for this day
		$data = $("."+id).clone(true,true);
		
		openData = new Array();
		closeData = new Array();
		isOpenData = new Array();
		
		openCounter = 0;
		closeCounter = 0;
		isOpenCounter = 0;
		
		$data.find('input[name^=ohStartTime]').each(function(){
			openData[openCounter] = $(this).val();
			openCounter++;
		});
		
		$data.find('input[name^=ohEndTime]').each(function(){
			closeData[closeCounter] = $(this).val();
			closeCounter++;
		});
		
		$original.find('select[name^=ohIsOpen]').each(function(){			
			isOpenData[isOpenCounter] = $(this).val();
			isOpenCounter++;
		});
		
		$("body").find('.openingHoursDiv').each(function(){
			if(!($(this).hasClass(id)))
			{
				$(this).empty();
				$(this).append($data.html());
				
				openCounter = 0;
				closeCounter = 0;
				isOpenCounter = 0;
				
				newID = $(this).attr('id');
				
				$(this).find('.openHWrapper').each(function(i){
				
					$(this).find('input').each(function(){
						$(this).timepicker({'showDuration': true, 'timeFormat': 'H:i', 'step': 15 });
						var tempName = $(this).attr('name');
						var newName = tempName.replace(id, newID);
						$(this).attr('name', newName);
					});
					
					$(this).find('select').each(function(i){

						var tempName = $(this).attr('name');
						var newName = tempName.replace(id, newID);
						$(this).attr('name', newName);						
						$(this).val(isOpenData[isOpenCounter]);
						isOpenCounter++;
					});
					
					$(this).find('input[name^=ohStartTime]').each(function(){
						$(this).val(openData[openCounter]);
						openCounter++;
					});
					
					$(this).find('input[name^=ohEndTime]').each(function(){
						$(this).val(closeData[closeCounter]);
						$(this).timepicker({ 'minTime': closeData[closeCounter], 'timeFormat': 'H:i', 'step': 15 });
						closeCounter++;
					});
					
					$(this).find("input[name^=ohStartTime]").each(function(){
						$(this).on('changeTime',function() {
							currTime = $(this).val()+":00";
							
							newTime = extractAMPM("January 01, 2000 "+currTime);
							
							$(this).parent().next("div").children("input[name^=ohEndTime]").timepicker('remove');
							$(this).parent().next("div").children("input[name^=ohEndTime]").timepicker({'showDuration': true, 'timeFormat': 'H:i', 'step': 15 });
							$(this).parent().next("div").children("input[name^=ohEndTime]").timepicker({ 'minTime': newTime, 'timeFormat': 'H:i', 'step': 15 });
							$(this).parent().next("div").children("input[name^=ohEndTime]").timepicker('setTime', newTime);
						});
					});
					$(this).find(".oh-is-open").on('change',onIsOpenChange);
					//hide closed option
					if (i>0){								
						$(this).find("li:eq(3)").remove();
					}					
				});
			}
		});
		
		//notify!
		noty({
			type: 'success',
			text: _tr('These times have been applied to all days!')
		});
	});
	
	function onIsOpenChange(){
		var val = $(this).val();						
		if (val == "c"){
				$(this).closest('.openingHours').find('.ui-timepicker-input-wrapper').slideUp()
				$(this).closest('.openingHours').find('input').removeAttr("required")
				$(this).closest('.openingHoursDiv').find('.openHWrapper').each(function(i){
					if (i>0){
						$(this).slideUp();		
						$(this).remove();		
					}
				})							
		} else {
				$(this).closest('.openingHours').find('.ui-timepicker-input-wrapper').slideDown()								
				$(this).closest('.openingHours').find('input').prop('required',true);
		}
	}
	
	$("#nonEventConfigForm").on('invalid', function (event) {
		noty({
		  type: 'error',  layout: 'topCenter',
		  text: _tr("We still need some more information. Don't forget to fill out the remaining days of the week!") /*text: dataArray['message']*/
		});
	});
	
	$("#nonEventConfigForm").on('valid', function (event) {
		var allClosed = true;		
		$("select.oh-is-open").each(function(){			
			allClosed = $(this).val() == "c" ? true : false;		
			return allClosed; //break if false
		})		
		if (allClosed){
			noty({
			  type: 'error',  layout: 'topCenter',
			  text: "Sorry, but you need to have at least one open day." /*text: dataArray['message']*/
			});
			return;
		}		

		var url = "/saveHours";
		$('#ohSubButton').hide();
		$('#savingButton').show();

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
						  type: 'error',  layout: 'topCenter',
						  text: _tr("Sorry, but there's been an error processing your request.") /*text: 'Connection Error! Check API endpoint.'*/
						});
						//alert(data);
						return false;
					}
					
					if(typeof dataArray['status'] !='undefined') //error
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: _tr("Sorry, but there's been an error processing your request.") /*text: dataArray['message']*/
						});
					}
					else
					{	
						noty({ type: 'success', text: 'All times has been saved!' });
						if($('#redirectFlag').val()=='1') setTimeout(function(){window.location.replace("/payment");}, 1000);
					}
				}
			}).done(function() {
				if($('#redirectFlag').val()!='1') $('#ohSubButton').show();
				$('#savingButton').hide();
			 });
			 

		return false; // avoid to execute the actual submit of the form.
	});
	
	$(document).on("click", ".newMD", function() {
		//get and update current count
		var mdCount = $("#mdCount").val();
		var newCount = parseInt(parseInt(mdCount) + 1);
		$("#mdCount").val(newCount);
		$("#mdCountAct").val(parseInt($("#mdCountAct").val())+1);
		
		$newOCount = $("#md0_secCount").clone(true);
		$newOCount.attr('id','md'+newCount+'_secCount');
		$newOCount.attr('name','md'+newCount+'_secCount');
		$newOCountAct = $("#md0_secCountAct").clone(true);
		$newOCountAct.attr('id','md'+newCount+'_secCountAct');
		$newOCountAct.attr('name','md'+newCount+'_secCountAct');
		$("#md0_secCountAct").after($newOCountAct);
		$("#md0_secCountAct").after($newOCount);
		
		//clone dummy table
		$newTab = $("#md0").clone(true);
		$newTab.attr('id','md'+newCount);
		
		//replace ids with incremented value and make value = default value
		$newTab.find(".mdTR input, .mdTR select").each(function() {
			//$(this).val( $(this).prop("defaultValue") );
			var tempName = $(this).attr('name');
			var newName = tempName.replace(/\[\d+\]/gi, "["+newCount+"]");
			$(this).attr('name', newName);
		});
		
		//replace ids with incremented value and make value = default value
		$newTab.find(".mdTDIName input").each(function() {
			$(this).val( $(this).prop("defaultValue") );
			var tempName = $(this).attr('name');
			var newName = tempName.replace(/\[\d+\]/gi, "["+newCount+"]");
			$(this).attr('name', newName);
		});
		
		//replace ids with incremented value
		$newTab.find(".optionTR span").each(function() {
			var tempName = $(this).attr('id');
			var newName = tempName.replace(/\d+_item/gi, newCount+'_item');
			$(this).attr('id', newName);
		});
		
		//now we fix placeholder
		$newTab.find("input[name^=mdName]").each(function() {
			var temp = $(this).val();
			$(this).val("");
			$(this).attr('placeholder', temp);
		});
		
		//now we fix placeholder
		$newTab.find("input[name^=mdPrice]").each(function() {
			var temp = $(this).val();
			$(this).val("");
			$(this).attr('placeholder', temp);
		});
		
		//now we fix placeholder
		$newTab.find("input[name^=mdTPrice]").each(function() {
			var temp = $(this).val();
			$(this).val("");
			$(this).attr('placeholder', temp);
		});
		
		//add id
		$newTab.find("input[name^=mdID]").each(function() {
			$(this).val('mid'+newCount);
		});
		
		//add autocomplete
		$newTab.find("input[name^=iMD]").autocomplete({ source: [ _tr("Choose a main"),_tr("Choose a side"),_tr("Choose a drink"),_tr("Choose a curry"),_tr("Choose a burger") ], delay: 10, minLength: 0, position: { my: "left top", at: "left bottom", collision: "none", of: $newTab.find("input[name^=iMD]") } });
		
		$newTab.find('.modifierRow').remove();
		$newTab.find('.mdEdit.optionTR').remove();
		
		$newTab.css('backgroundColor','#fafafa');
		$newTab.css('box-shadow', 'rgba(70, 83, 93, 0.54902) 0px 0px 6px inset');
		$newTab.find('tr').css('border-bottom','0px');
		$newTab.css('max-width', '100%'); 	
		
		//hide it so we can animate it!
		$newTab.css('display','none');
		$newTab.find('select[name^=mdSec]').hide();
		
		//insert after section header/before hidden div
		$(".dynamicDataTable table").last().after($newTab); 
		
		$($newTab).slideRow('down');
		
		$newTab.find('.mdTR select').each(function(){
			$(this).addClass('mdSecSingleSelect');
			$(this).multiselect({
			   multiple: false,
			   header: false,
			   noneSelectedText: _tr("Where should this meal deal appear?"),
			   selectedList: 1
			}); 
		});
		
		$("html, body").animate({scrollTop: $($newTab).offset().top - ( $(window).height() - $($newTab).outerHeight(true) ) / 2}, 200);
		
		$newTab.find('.newMDSection').trigger('click');
	});
	
	$(document).on("click", ".mdSectionDelete", function(){
		//get table id
		mdID = $(this).closest('table').attr('id');
		mdIDOnly = mdID.replace('md','');
			
		//update count
		$('#'+mdID+'_secCountAct').val(parseInt($('#'+mdID+'_secCountAct').val())-1);
		
		//byebye
		$(this).parents('.subHeaderTR').first().next().remove();
		$(this).parents('.subHeaderTR').first().remove();
	});
	
	$(document).on("click", ".newMDSection", function(){
		
		//get table id
		mdID = $(this).closest('table').attr('id');
		mdIDOnly = mdID.replace('md','');
		
		//update count
		var newCount = parseInt($('#'+mdID+'_secCount').val())+1;
		$('#'+mdID+'_secCount').val(newCount);
		
		$('#'+mdID+'_secCountAct').val(parseInt($('#'+mdID+'_secCountAct').val())+1);
		
		//start cloning subheader and fixing names
		$subHead = $('#md0').find('.subHeaderTR').clone(false);
		$subHead.find('.mdSubheader h6').html($('.deleteDummy').html());
		$subHead.find('input, select').each(function(){
			var tempName = $(this).attr('name');
			var newName  = tempName.replace(/\[\d+\]/gi, "["+mdIDOnly+"]");
			newName = newName.replace(/\[s\d+\]/gi, "[s"+newCount+"]");
			$(this).attr('name', newName);
			
		});
		$subHead.find('input[name^=iMD]').autocomplete({ source: [ _tr("Choose a main"),_tr("Choose a side"),_tr("Choose a drink"),_tr("Choose a curry"),_tr("Choose a burger")], delay: 10, minLength: 0 });
		$subHead.find('input[name^=iMD]').attr('required','required');
		
		//start cloning options and fixing names
		$opts = $('#md0').find('.mdEdit.optionTR').clone(false);
		$opts.find('input[name^=mdItems]').each(function(){
			var tempName = $(this).attr('name');
			var newName  = tempName.replace(/\[\d+\]/gi, "["+mdIDOnly+"]");
			newName = newName.replace(/\[s\d+\]/gi, "[s"+newCount+"]");
			$(this).attr('name', newName);
		});
		
		$opts.find('.mdTDIName label span').each(function(){
			var tempName = $(this).attr('id');
			var newName  = tempName.replace(/\d+_item/gi, newCount+"_item");
			$(this).attr('id', newName);
		});
		
		//get position
		$currTR = $(this).parents('.subHeaderTR').first();
		
		//hide so we can animate them
		$subHead.hide();
		$opts.hide();
		
		$currTR.before($subHead).before($opts);
		
		//show!
		$subHead.slideRow('down');
		$opts.show();
		$subHead.find('.modifierRow').fadeIn('slow');
		
		//now for the dropdown as it needs to be done after show
		$subHead.find('select[name^=iMDType]').each(function(){
			$(this).addClass('mdMenuSingleSelect');
			$(this).multiselect({
			   multiple: false,
			   header: false,
			   noneSelectedText: _tr("Choose a menu section"),
			   selectedList: 1
			}); 
			$(this).attr('required','required');
		}); 
		
		// $(document).foundation('abide', 'events');
	});
	
	$(document).on("click", ".newmdItem", function(){
		
		if($(this).find('i').hasClass('pd-add')) //add
		{
			$(this).find('i').removeClass('pd-add');
			$(this).find('i').addClass('pd-delete');
			$(this).find('i').parent().addClass('secondary');
			
			$theSpan = $(this).closest(".mdItemName").find('span');
			
			//add price
			/*$tempEl = $(this).closest(".mdTable").find('.mdTDTPrice input');
			temp = parseFloat($tempEl.val());
			$theSpan = $(this).closest(".mdItemName").find('span');
			currentPrice = parseFloat($theSpan.attr('data-value'));
			temp = parseFloat(temp + currentPrice).toFixed(2);
			$tempEl.val(temp);*/
			
			//add id to list
			$mdItems = $(this).parents(".mdTDIName").first().find("input[name^=mdItems]");
			allIDs = $mdItems.val();
			thisID = $theSpan.attr('id');
			thisID = thisID.replace(/\d+_item_/gi, "");
			allIDs = allIDs + thisID + ";";
			$mdItems.val(allIDs);
		}
		else
		{
			$(this).find('i').removeClass('pd-delete');
			$(this).find('i').addClass('pd-add');
			$(this).find('i').parent().removeClass('secondary');
			
			$theSpan = $(this).closest(".mdItemName").find('span');
			
			//subtract price
			//$tempEl = $(this).closest(".mdTable").find('.mdTDTPrice input');
			//temp = parseFloat($tempEl.val());
			//$theSpan = $(this).closest(".mdItemName").find('span');
			//currentPrice = parseFloat($theSpan.attr('data-value'));
			//temp = parseFloat(temp - currentPrice).toFixed(2);
			//$tempEl.val(temp);
			
			//remove id from list
			$mdItems = $(this).closest("td.mdTDIName").find("input[name^=mdItems]");
			allIDs = $mdItems.val();
			thisID = $theSpan.attr('id');
			thisID = thisID.replace(/\d+_item_/gi, "");
			allIDs = allIDs.replace(thisID+";", "");
			$mdItems.val(allIDs);
		}
	});
	
	$(document).on("click", ".mdDelete", function() {
		//get event number
		$curTable = $(this).closest('table');
		mdID = $curTable.attr('id');
		
		realmdID = $curTable.find("input[name^=mdID]").val();
		
		if(typeof realmdID =='undefined' || realmdID == '' || !realmdID.match(/^\d+$/)) //event not saved in DB
		{
			noty({
				layout: 'center',
				type: 'confirm',
				text: _tr('Are you sure you want to delete this meal deal? Note: all associated data will be lost!'),
				buttons: [
				{addClass: 'alert tiny', text: _tr('Yes, delete this meal deal!'), onClick: function($noty) {
					
					//get and update current count
					mdCount = $("#mdCountAct").val();
					newCount = parseInt(parseInt(mdCount) - 1);
					$("#mdCountAct").val(newCount);	
					
					//bye-bye
					$("#"+mdID).remove();
					
					$noty.close();
				  }
				},
				{addClass: 'secondary tiny', text: _tr('No, go back.'), onClick: function($noty) {
					$noty.close();
				  }
				}
			  ]
			});
		}
		else //event in DB
		{
			noty({
				layout: 'center',
				type: 'confirm',
				text: _tr('Are you sure you want to delete this meal deal? Note: all associated data will be lost!'),
				buttons: [
				{addClass: 'alert tiny', text: _tr('Yes, delete this meal deal!'), onClick: function($noty) {
					
					var url = "/deleteMealDeal";
					$.ajax({
						   type: "POST",
						   url: url,
						   data: 'mdID='+realmdID, // serializes the form's elements.
						   success: function(data)
						   {
								try
								{
									var dataArray = jQuery.parseJSON(data); //parsing JSON
								}
								catch(e)
								{
									noty({
									  type: 'error',  layout: 'topCenter',
									  text: _tr("Sorry, but there's been an error processing your request.") /*text: 'Connection Error! Check API endpoint.'*/
									});
									
									//alert(data);									
									return false;
								}
									
								//get and update current count
								mdCount = $("#mdCountAct").val();
								newCount = parseInt(parseInt(mdCount) - 1);
								$("#mdCountAct").val(newCount);
								
								//bye-bye
								$("#"+mdID).remove();
							}
						 });
					$noty.close();
				  }
				},
				{addClass: 'secondary tiny', text: _tr('No, go back.'), onClick: function($noty) {
					$noty.close();
				  }
				}
			  ]
			});
		}
		
	});
	
	$(document).on("click", ".mdSave", function() {
		$(this).hide();
		$curItem = $(this).closest('table');
		$curItem.find("tr").removeClass('mdEdit');
		$curItem.find("tr").addClass('savedInput');
		$curItem.find("input").attr("readonly", "readonly");
		$curItem.find(".mdTDEdit").removeClass('hide');
		$curItem.find(".mdTDEdit").show();
		$curItem.find(".subHeaderTR").slideRow('up');
		$curItem.find(".optionTR").slideRow('up');
		$curItem.find(".modifierRow").hide();
		$curItem.find(".mdTR select").multiselect("disable");
		$curItem.css('background', 'transparent');
		$curItem.css('box-shadow', '0px 0px 0px');
		$curItem.css('max-width', '100%'); 
		$curItem.find('tr').first().css('border-bottom','1px solid #B9BBBD');
	});
	
	$(document).on("click", ".mdTDEdit, .mdTR input[readonly='readonly']", function() {
	
		if($(this).hasClass('mdTDEdit')) $(this).hide();
		else $(this).closest('table').find('.mdTDEdit').hide();

		$curItem = $(this).closest('table');
		$curItem.find("tr").addClass('mdEdit');
		$curItem.find("tr").removeClass('savedInput');
		$curItem.find("input").removeAttr("readonly");
		//$curItem.find("input[name^=mdTPrice]").attr("readonly", "readonly"); //this is always readonly
		$curItem.find(".mdSave").removeClass('hide');
		$curItem.find(".mdSave").show();
		$curItem.find(".mdTR select").multiselect("enable");
		$curItem.find(".optionTR").slideRow('down');
		$curItem.find(".subHeaderTR").slideRow('down');
		$curItem.find(".modifierRow").fadeIn('slow');
		$curItem.css('background', '#fafafa');
		$curItem.css('box-shadow', 'rgba(70, 83, 93, 0.54902) 0px 0px 6px inset');
		$curItem.css('max-width', '100%'); 
		$curItem.find('tr').css('border-bottom','0px');
		
		$curItem.find('select[name^=iMDType]').each(function(){ //reinitialize to get the right width
			$(this).multiselect({
				   multiple: false,
				   header: false,
				   noneSelectedText: "Choose a menu section",
				   selectedList: 1
				}); 
		});
		
		$curItem.find('.mdTDIName label span').each(function() {
			var curHeight = ($(this).actual('height')).toString();
			curHeight = parseInt(curHeight.replace('px',''));
			
			if(curHeight < 39 && !$(this).hasClass('alreadyApplied'))
			{	
				$(this).css('padding-top', '10px');
			}
			
			$(this).addClass('alreadyApplied'); //pass through only once
		});
		
	});
	
	$(document).on("change",'select[name^=iMDType]', function(){
		var selectedID = $(this).selected().val();
		$loc = $(this).parent().parent().next();
		if(selectedID == 'all')
		{
			$loc.find('label').hide();
			$loc.find('label').show();
		}
		else
		{
			$loc.find('label').hide();
			$loc.find('label.sec'+selectedID).show();
		}
		
		$(this).parent().parent().next().find('.mdTDIName label span').each(function() {
			var curHeight =  ($(this).actual('height')).toString();
			curHeight = parseInt(curHeight.replace('px',''));
			
			if(curHeight < 39 && !$(this).hasClass('alreadyApplied'))
			{	
				$(this).css('padding-top', '10px');
			}
			
			$(this).addClass('alreadyApplied'); //pass through only once
		});
		
	});
	
	$('.mdSecSingleSelect').multiselect({
	   multiple: false,
	   header: false,
	   noneSelectedText: _tr("Where should this meal deal appear?"),
	   selectedList: 1
	}); 
	
	$('.mdMenuSingleSelect').multiselect({
	   multiple: false,
	   header: false,
	   noneSelectedText: _tr("Choose a menu section"),
	   selectedList: 1
	}); 
	
	$('.mdSecSingleSelect').multiselect('disable');
		
	$("#mealDealConfigForm").on('valid', function (event) {
		//prevent multiple submissions
		var newSubmitTime = new Date().getTime();
		
		if( (newSubmitTime - submitTime) > 300 )
		{
			//lock all
			$("body .mdSave").each(function(){
				if($(this).is(":visible"))
					$(this).trigger('click');
			});
		
			var url = "/saveMealDeal";
			
			$('#mdSubButton').hide();
			$('#savingButton').show();
			
			//enable dropdowns or we wont get the values!
			$(".mdSecSingleSelect").multiselect('enable');
			
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
							  type: 'error',  layout: 'topCenter',
							  text: _tr("Sorry, but there's been an error processing your request.") /*text: 'Connection Error! Check API endpoint.'*/
							});
							//alert(data);
							return false;
						}
						
						if( typeof dataArray['status'] !='undefined' || (typeof dataArray['result'] !='undefined' && dataArray['result'] && typeof dataArray['result']['status'] !='undefined') ) //error
						{
							noty({
							  type: 'error',  layout: 'topCenter',
							  text: _tr("Sorry, but there's been an error processing your request.") /*text: dataArray['message']*/
							});
						}
						else
						{	
							newIDs = dataArray['update'];

							if(Object.keys(newIDs).length > 0) //this is an object not array so length and stuff works differently
							{
								$.each(newIDs, function(index, value) {
								  $('input[value='+index+']').val(value); //find by value and update!
								});
							}
							
							noty({ type: 'success', text: _tr('All changes has been saved!') });
						}
					}
				}).done(function() {
					$('#mdSubButton').show();
					$('#savingButton').hide();
					$(".mdSecSingleSelect").multiselect('disable');
				 });
		}
		
		//update Time
		submitTime = new Date().getTime();
		return false; // avoid to execute the actual submit of the form.
	});
	
	// Twitter App
	$(".twitterfeed").tweet({
		username: "PreoDay",
		modpath: 'js/twitter_app/index.php',
		join_text: "auto",
		avatar_size: 48,
		count: 2,
		// auto_join_text_default: "we said,",
		// auto_join_text_ed: "we",
		// auto_join_text_ing: "we were",
		// auto_join_text_reply: "we replied to",
		// auto_join_text_url: "we were checking out"
		auto_join_text_default: "",
		auto_join_text_ed: "",
		auto_join_text_ing: "",
		auto_join_text_reply: "",
		auto_join_text_url: ""
	  });
	  
	$(".showNextPhone, .phoneContainer").on('click', function(){
		if(!$(".phone2").is(':visible'))
		{
			$(".phone1").hide();
			$(".phone2").show();
		}
		else
		{
			$(".phone2").hide();
			$(".phone1").show();
		}
		
		$(".phone1pager").toggle();
		$(".phone2pager").toggle();
	});
	
	$("#changePassTrigger").on('click', function(e) {
		if(!$("#passDiv").is(":visible"))
		{
			$("#passDiv").slideDown();
			$(".passField").attr('required','required');
			$("#passFlag").val(1);
		}
		else
		{
			$("#passDiv").slideUp();
			$(".passField").removeAttr('required');
			$("#passFlag").val(0);
		}
		
	});
	
	$(document).on("click", ".deleteMenu", function() {
		//get menu id
		menuID = $(this).attr('id');
		
		menuID = menuID.replace('dmi-','');
		
		noty({
			layout: 'center',
			type: 'confirm',
			text: _tr('Are you sure you want to delete this menu? Note: all menu data will be lost!'),
			buttons: [
			{addClass: 'alert tiny', text: _tr('Yes, delete this menu!'), onClick: function($noty) {
				
				var url = "/deleteMenu";
				$.ajax({
					   type: "POST",
					   url: url,
					   data: 'menuID='+menuID, // serializes the form's elements.
					   success: function(data)
					   {
							try
							{
								var dataArray = jQuery.parseJSON(data); //parsing JSON
							}
							catch(e)
							{
								noty({
								  type: 'error',  layout: 'topCenter',
								  text: _tr("Sorry, but there's been an error processing your request.") /*text: 'Connection Error! Check API endpoint.'*/
								});
								
								//alert(data);
								
								return false;
							}

							//bye-bye
							$("#p-"+menuID).remove();
						}
					 });
				$noty.close();
			  }
			},
			{addClass: 'secondary tiny', text: _tr('No, go back.'), onClick: function($noty) {
				$noty.close();
			  }
			}
		  ]
		});
	});
	
	$("#settingsForm").on('valid', function (event) {
		var url = "/saveProfile";
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
						  type: 'error',  layout: 'topCenter',
						  text: _tr("Sorry, but there's been an error processing your request.") //text: 'Connection Error! Check API endpoint.'
						});
						//alert(data);
						return false;
					}
					
					if(typeof dataArray['status'] !='undefined') //error
					{
						if($('#passFlag').val()=='1')
						{
							noty({
							  type: 'error',  layout: 'topCenter',
							  text: _tr("Sorry, incorrect password.") //text: dataArray['message']
							});
						}
						else
						{
							noty({
							  type: 'error',  layout: 'topCenter',
							  text: _tr("Sorry, but there's been an error processing your request.") //text: dataArray['message']
							});
						}
					}
					else
					{	
						if($('#passFlag').val()=='1')
						{
							noty({ type: 'success', text: _tr('Settings and Password has been saved!<br/>You will need to log in again with your new password to continue.') });
							setTimeout(function(){window.location.replace("/logout");}, 2500);
						}
						else
						{
							noty({ type: 'success', text: _tr('Settings have been saved!') });
						}
					}
				}
			 });

		return false; // avoid to execute the actual submit of the form.
	});
	
	$(".moreSelect").multiselect({
	   noneSelectedText: _tr("Please select features you require"),
	   selectedText: _tr("# of # selected"),
	   checkAllText: _tr("Select all"),
	   uncheckAllText: _tr("")
	}); 
	
	$("#moreForm").on('valid', function (event) {
		var url = "/sendForm";
		$.ajax({
		   type: "POST",
		   url: url,
		   data: $(this).serialize(), // serializes the form's elements.
		   success: function(data)
		   {
				$('#moreForm').hide();
				$('#thankyouArea').fadeIn('fast');
			}
		 });
		return false; // avoid to execute the actual submit of the form.
	});
	
	//google+ consent
	$('.g-signin').on('click', function(){
		$('#userConsent').val('1');
	});
	
	//go Demo
	$('#goDemo').on('click', function(){
		var url = "/goDemo";
		$.ajax({
		   type: "POST",
		   url: url,
		   success: function(data)
		   {
				setTimeout(function(){window.location.replace("/dashboard");}, 100);
			}
		 });
		return false; // avoid to execute the actual submit of the form.
	});
	
	//skip stripe connect
	$('#skipStripe').on('click', function(){
		var url = "/skipStripe";
		$.ajax({
		   type: "POST",
		   url: url,
		   success: function(data)
		   {
				setTimeout(function(){window.location.replace("/dashboard");}, 100);
			}
		 });
		return false; // avoid to execute the actual submit of the form.
	});

	$('.switchDashboardMode').on('click', function(){		

		if ($(this).hasClass("active")){
			return;
		}
		var value = $(this).data("mode");


		if ( value === 'l' ) {
			var modeMsg = _tr("Your app is now live!");
			var data = {
			   	liveFlag: 0,
			   	offFlag: 0,
			   	offFlagVerify: 0
		   }
		} 
		else if ( value === 'd' ) {
			var modeMsg = _tr("Your app is now in demo mode!");
			var data = {
			   	liveFlag: 1,
			   	offFlag: 0,
			   	offFlagVerify: 0
		   }
		}
		else if ( value === 'o' ) {
			var modeMsg = _tr("Your app is now offline!");
			var data = {
			   	liveFlag: 0,
			   	offFlag: 1,
			   	offFlagVerify: 0
		   }
		}else if ( value === 'n' ) {
			//TODO finish this.
			$('#noPaymentMethod').foundation('reveal', 'open');
			return;
		}
		$('#loadingDashboard').show();		
		$(".switchDashboardMode").removeClass('active');
		$(this).addClass('active');
		$.ajax({
		   type: "POST",
		   url: '/code/finish/do_finish.php',
		   data:data,
		   success: function(data) {
		    	$('#loadingDashboard').hide();
					noty({ type: 'success', text: modeMsg });
		  	}
		 });					
	})
	
	//back to stripe connect
	$('#startStripe').on('click', function(){
		var url = "/startStripe";
		$.ajax({
		   type: "POST",
		   url: url,
		   success: function(data)
		   {
				setTimeout(function(){window.location.replace("/payment");}, 100);
			}
		 });
		return false; // avoid to execute the actual submit of the form.
	});
	
	//go Offline
	$('.goOffline').on('click', function(){
		$('#offFlag').val(1);
		$('#finishForm').submit();
	});

	var currencyManager = new CurrencyManager();	
	currencyManager.init("#currency");//

	$("#vOrderMin").autoNumeric('init');

	$('.featureHolder').each(function (){
			var featureId = $(this).data("feature");			
			var displayName = "";
			
			for (var i=0;i<features.length;i++){
					var feature = features[i]
					if (feature.id == featureId){
						var link = "accountSettings#/subscription";
						if (feature.$link)
							link = feature.$link;
						displayName = feature.name;

						if (feature.showAppTitle){
							displayName = _tr("My order app ") + feature.name; 
						}
						$(this).children(".featureName").attr("href",link).html(displayName);						
						$(this).children(".featureIcon").attr("src",feature.icon);
						break;
					}
			}
									
	})

	  // Disable default reveal animations
    $(document).foundation('reveal', {
        'animation': 'fade'
    });

    $(".reveal-modal").on('opened', function() {
      var that = this;
      setTimeout(function(){
        $(that).addClass('active');  
      },1)    
    }).on('closed',function(){        
        $(this).removeClass("active");
    });

});

function CurrencyManager(){
	var currentCurrency;
	var $currency;
	this.currencies = {};

	function getAllCurrencies(callback){
		var that = this;
		var url = "/getCurrencies";

		$.ajax({
		   type: "GET",
		   url: url,
		   dataType:"json",		   
		   success: function(data)
		   {
		   	  // console.log("success",data)
		   	  that.currencies = data;		   	  
		   }, error:function(data){
		   	console.log("error",data)
		   	  that.currencies = {
		   	  	//In the worst case, if something really wrong happens we still have gpb.
		   	  	// we never should end here tho.
		   	  	"GBP": {
			        "symbol": "£",
			        "name": "Pound Sterling",
			        "symbol_native": "£",
			        "decimal_digits": 2,
			        "rounding": 0,
			        "code": "GBP",
			        "name_plural": "British pounds sterling"
			    }
		   	  }
		    },
		    complete:function(){
   	    		callback();
		   }
		});
	}

	function getCurrency(currencyCode){
		return currencies[currencyCode];
	}	

	function refreshCurrencySymbols(currencyCode){				
		this.currentCurrency = this.getCurrency(currencyCode);	
		$(".currencySymbol").html(this.currentCurrency["symbol"]);
	}

	function init(currencySelector){
		var that = this;
		$currency = $(currencySelector);
		console.log("SESSION_VENUE_CURRENCY",SESSION_VENUE_CURRENCY)
		var currencyCode = "GBP"; //defaults to GBP
		if (SESSION_VENUE_CURRENCY != undefined){
			currencyCode  = SESSION_VENUE_CURRENCY;
		} 
		
		$(currencySelector).on("change",function(){				
			that.refreshCurrencySymbols($(this).val());

		})
		console.log("Initing CurrencyManager with currency:" + currencyCode);				
		getAllCurrencies(function(){				
			that.refreshCurrencySymbols(currencyCode);			
		});
		
	}

	return {
		init:init,
		getCurrency:getCurrency,
		currentCurrency:currentCurrency,
		refreshCurrencySymbols:refreshCurrencySymbols
	}
}

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
	$("#vSug").val('');
	$("#vName").val('');
	$("#vAdd").val('');
	$("#vPostal").val('');
	$("#vCountry").prop('selectedIndex', 0);
	$("#vCountry").next('.custom.dropdown').find('li.selected').removeClass('selected');
	$("#vCountry").next('.custom.dropdown').find('li:first').addClass('selected');
	$("#vCountry").next('.custom.dropdown').find('a.current').html('United Kingdom');
	$("#vCode").val('(0, 0)');
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

function extractAMPM(date) {
    var d = new Date(date);
    var hh = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var dd = "AM";
    var h = hh;
    if (h >= 12) {
        h = hh-12;
        dd = "PM";
    }
    if (h == 0) {
        h = 12;
    }
    m = m<10?"0"+m:m;

    s = s<10?"0"+s:s;

    /* if you want 2 digit hours:
    h = h<10?"0"+h:h; */

    var pattern = new RegExp("0?"+hh+":"+m+":"+s);

    var replacement = h+":"+m;
    /* if you want to add seconds
    replacement += ":"+s;  */
    replacement += " "+dd;    

    //return date.replace(pattern,replacement);
	return(replacement);
}

//On window resize
//map resizing with window
$(window).resize(function(){
	if($("#map").length > 0)
	{
		google.maps.event.trigger(map, 'resize');
		if (typeof place != 'undefined') map.setCenter(place.geometry.location);
			else map.setCenter( new google.maps.LatLng(mapDefaultCenterLat,mapDefaultCenterLong) );
	}
});


//namespace
function Preoday(){


}
