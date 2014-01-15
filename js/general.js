//global variables
map = null; // make google maps var global
mapDefaultCenterLat = 54.370559; // make google maps var global = set center as center of UK
mapDefaultCenterLong = -2.510376; // make google maps var global = set center as center of UK
nowTemp = new Date();
now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

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
						  text: "Sorry, but there's been an error processing your request." /*text: 'Connection Error! Check API endpoint.'*/
						});
						//alert(data);
						
						return false;
					}
					
					if(typeof dataArray['status'] !='undefined') //error
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: dataArray['message'] //text: "Sorry, but there's been an error processing your request."
						});
					}
					else
					{	
						$.post("/saveSignUp", 
						'bName='+dataArray['name']+'&bID='+dataArray['id']+'&email='+dataArray['owner']['email']+'&fName='+dataArray['owner']['firstName']+'&lName='+dataArray['owner']['lastName']+'&id='+dataArray['owner']['id'],
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
						  text: "Sorry, but there's been an error processing your request." /*text: 'Connection Error! Check API endpoint.'*/
						});
						//alert(data);
						return false;
					}
					
					if(typeof dataArray['status'] !='undefined') //error
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: "Incorrect credentials or account does not exist." //dataArray['message'] //text: "Sorry, but there's been an error processing your request."
						});
				   
					}
					else
					{	
						$.post("/saveSignIn", 
						'email='+dataArray['email']+'&fName='+dataArray['firstName']+'&lName='+dataArray['lastName']+'&id='+dataArray['id'], 
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
						  text: "Sorry, but there's been an error processing your request." /*text: 'Connection Error! Check API endpoint.'*/
						});
						
						//alert(data);
						
						return false;
					}
					
					if(dataArray && typeof dataArray['status'] !='undefined') //error
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: "Sorry, but there's been an error processing your request." /*text: dataArray['message']*/
						});
				   
					}
					else
					{	
						noty({
						  type: 'success',
						  text: 'Success! Please check your email for further instructions.'
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
						  text: "Sorry, but there's been an error processing your request." //text: 'Connection Error! Check API endpoint.'
						});
						//alert(data);
						return false;
					}
					
					if(typeof dataArray['status'] !='undefined') //error
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: "Sorry, incorrect code." //text: dataArray['message']
						});
					}
					else
					{	
						noty({ type: 'success', text: 'Your password has been reset.<br/>You will now be redirected to the login page.' });
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
		$.post("code/shared/changeLang.php", 'lang='+newLang, function() {window.location.reload();}); 
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
		pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
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
			document.getElementById("vAdd").value = address;
			
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
			//$('.cSlotDiv').slideDown();
			$('.leadTimeDiv').slideDown();
			
			//$('.cSlotDiv').find('input').attr('required','required');
			$('.leadTimeDiv').find('input').attr('required','required');
		}
		else
		{
			//$('.cSlotDiv').slideUp();
			$('.leadTimeDiv').slideUp();
			
			//$('.cSlotDiv').find('input').removeAttr('required');
			$('.leadTimeDiv').find('input').removeAttr('required');
		}
	});
	
	$("#venueConfigForm").on('valid', function (event) {
		var url = "/saveVenue";
		
		$('#venueSave').hide();
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
						  text: "Sorry, but there's been an error processing your request." /*text: 'Connection Error! Check API endpoint.'*/
						});
						//alert(data);
						return false;
					}
					
					if(typeof dataArray['status'] !='undefined') //error
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: "Sorry, but there's been an error processing your request." /*text: dataArray['message']*/
						});
					}
					else
					{	
						noty({ type: 'success', text: 'Venue changes have been saved!' });
						if($('#redirectFlag').val()=='1') { setTimeout(function(){window.location.replace("/homescreen");}, 1000); }
					}
				}
			 }).done(function(){
				if($('#redirectFlag').val()!='1') $('#venueSave').show();
				$('#savingButton').hide();
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
			
			//alert(responseText);
			
			responseText=responseText.replace('_thumb.png','');
			
			content="<img src='"+globalLPath+responseText+"_thumb.png'/>";
			$("#appHeading").html(content);
			$("#aHeading").val(' ');
			$("#picFileName").val(responseText);
		},
		error: function() { 
			noty({
			  type: 'error',  layout: 'topCenter',
			  text: 'Error uploading file'
			});
		},
		beforeSubmit: function(arr, $form, options) { 
			var acceptedExts = new Array(".png");
			var filename = $("#picFile").val();
			filename = filename.toLowerCase();
			if(searchArray(filename,acceptedExts))
				return true;
			else
			{
				noty({
				  type: 'error',  layout: 'topCenter',
				  text: 'Incorrect Image File'
				});
				return false;
			}
		}
	};
	$("#logoUpForm").ajaxForm(options);
	
	//ajax form upload
	var optionsBG = { 
		url: '/uploadBG',
		success: function(responseText) { 
			noty({
			  type: 'success',
			  text: 'Uploaded!'
			});
			
			//alert(responseText);
			
			$("[id^=thumb]").removeClass('selected');
			var newImgSrc = globalWPath + "wall_wa_" + responseText + ".jpg";
			$("#phoneWallpaper").attr("src", newImgSrc);
			$("#wallPaperID").val(responseText);
			
			$('.customBGArea .customIMG').empty();
			$('<a class="thumb selected" id="thumb'+responseText+'">	<img src="'+globalWPath+'thumb'+responseText+'.jpg"> </a>').appendTo('.customBGArea');
			
		},
		error: function() { 
			noty({
			  type: 'error',  layout: 'topCenter',
			  text: 'Error uploading file'
			});
		},
		beforeSubmit: function(arr, $form, options) { 
			var acceptedExts = new Array(".jpg",".jpeg");
			var filename = $("#bgFile").val();
			filename = filename.toLowerCase();
			if(searchArray(filename,acceptedExts))
				return true;
			else
			{
				noty({
				  type: 'error',  layout: 'topCenter',
				  text: 'Incorrect Image File'
				});
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
		var newImgSrc = "./img/wallpapers/" + wall + ".jpg";
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
	
	/* $("#textColour").minicolors({
		change: function(hex, opacity) {
			alert(hex);
		}
	}); */
	
	$(".visibleUpload, #logoReset").on('click', function() {
		$(".visibleUpload").slideToggle();
		$(".hiddenUpload").slideToggle();
	});
	
	$(".visibleUploadBG, #bgReset").on('click', function() {
		$(".visibleUploadBG").slideToggle();
		$(".hiddenUploadBG").slideToggle();
	});
	
	$("#doBGUp").on('click', function() {
		if($("#bgFile").val()) $("#bgUpForm").submit();
		else{ //noty({ type: 'error',  layout: 'topCenter', text: 'Please choose a file' });
			$("#bgFile").click();
		}
	});
	
	$("#doLogoUp").on('click', function() {
		if($("#picFile").val()) $("#logoUpForm").submit();
		else{ //noty({ type: 'error',  layout: 'topCenter', text: 'Please choose a file' });
			$("#picFile").click();
		}
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
						  text: "Sorry, but there's been an error processing your request." /*text: 'Connection Error! Check API endpoint.'*/
						});
						//alert(data);
						return false;
					}
					
					if(typeof dataArray['status'] !='undefined') //error
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: "Sorry, but there's been an error processing your request." /*text: "Sorry, but there's been an error processing your request." /*text: dataArray['message']*/
						});
						//alert(data);
					}
					else
					{	
						noty({ type: 'success', text: 'App changes have been saved!' });
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
						  text: "Sorry, but there's been an error processing your request." /*text: 'Connection Error! Check API endpoint.'*/
						});
						
						return false;
					}
					
					if(typeof dataArray['status'] !='undefined') //error
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: "Sorry, but there's been an error processing your request." /*text: dataArray['message']*/
						});
				   
					}
					else
					{	
						noty({ type: 'success', text: 'App changes have been saved!' });
						if($('#redirectFlag').val()=='1') setTimeout(function(){window.location.replace("/dashboard");}, 1000);
					}
				}
			 }).done(function(){
				$('#appConfig2Sub').show();
				$('#savingButton').hide();
			 });

		return false; // avoid to execute the actual submit of the form.
	});
	
	$(document).on("click", ".optionRowDelete", function() {
		//get item number
		$curTable = $(this).closest('table');
		var itemID = $curTable.attr('id');
		
		//get and update current count
		var itemCount = $("#"+itemID+"_optionCountAct").val();
		var newCount = parseInt(parseInt(itemCount) - 1);
		$("#"+itemID+"_optionCountAct").val(newCount);
		
		if(newCount < 1) //remove modifier info
		{
			$ele = $curTable.find('.modifierRow');
			$ele.hide();
			
			$ele.find('input').each(function(){
				$(this).removeProp('required');
				$(this).val('');
				$(this).attr('placeholder','Modifier Name');
			});
			
			$ele.find('select').each(function(){
				$(this).removeProp('required');
			});
			
		}
		
		//bye-bye
		$(this).parents("tr:first").remove();
	});
	
	$(document).on("click", ".newOpt, .optionRowDuplicate", function() {
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
					   noneSelectedText: "Pick an option type",
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
			var newName = newName.replace(/\[\d+\]/gi, "["+newCount+"]");
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
				
		//hide it so we can animate it!
		$newRow.css('display','none');
		
		//insert at the end of the table
		$("#"+itemID+" tr:last").after($newRow);
		$("#"+itemID+" tr:last").slideRow('down');

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
			
			//clone dummy table
			$newTab = $("#item0").clone(false);
			$newTab.attr('id','item'+newCount);
		}
		
			$newTab.addClass('table'+section);
		
		//replace ids with incremented value and make value = default value
		$newTab.find(".itemTR input").each(function() {
			if(!dup) $(this).val( $(this).prop("defaultValue") );
			var tempName = $(this).attr('name');
			var newName = tempName.replace(/section\d+/gi, section);
			var newName = newName.replace(/\[\d+\]/gi, "["+newCount+"]");
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
				
				$newTab.find('.modifierRow select').each(function() {
					var tempName = $(this).attr('name');
					var newName = tempName.replace(/item\d+/gi, 'item'+newCount);
					$(this).attr('name', newName);
					
					$(this).multiselect({
					   multiple: false,
					   header: false,
					   noneSelectedText: "Pick an option type",
					   selectedList: 1
					}); 
				});
			});
		}
		
		//now we give the section id to the duplicate button
		$newTab.find(".itemDuplicate").attr('id',"dup"+newCount+"_"+section);
		
		//add autocomplete
		$newTab.find("input[name^=iMod]").autocomplete({ source: [ "Choose a size","Choose a flavour","Choose a topping","Choose some extras","Choose a side dish" ], delay: 10, minLength: 0, position: { my: "left top", at: "left bottom", collision: "none", of: $newTab.find("input[name^=iMod]") } });
		
		$newTab.css('backgroundColor','#fafafa');
		$newTab.css('box-shadow', 'rgba(70, 83, 93, 0.54902) 0px 0px 6px inset');
		
		//hide it so we can animate it!
		$newTab.css('display','none');
		
		//insert after section header/before hidden div
		$(".firstItemDiv"+section).prev('.sortWithinDiv').append($newTab); 
		
		$($newTab).slideRow('down');
		if($newTab.find('.itemEdit').is(':visible')) $newTab.find('.itemEdit').trigger('click');
	
		$("html, body").animate({scrollTop: $($newTab).offset().top - ( $(window).height() - $($newTab).outerHeight(true) ) / 2}, 200);
	});
	
	$(document).on("click", ".itemDelete", function() {
		//get item number
		$curTable = $(this).closest('table');
		var itemID = $curTable.attr('id');
		
		//get and update current count
		var itemCount = $("#itemCountAct").val();
		var newCount = parseInt(parseInt(itemCount) - 1);
		$("#itemCountAct").val(newCount);
		
		//bye-bye
		$("#"+itemID).remove();
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
		if(count) $curItem.find('.menuEdit').find('.modifierRow').slideRow('up');
		$curItem.css('background', 'transparent');
		$curItem.css('box-shadow', '0px 0px 0px');
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
		if(count) $curItem.find('.menuEdit').find('.modifierRow').slideRow('down');
		$curItem.css('background', '#fafafa');
		$curItem.css('box-shadow', 'rgba(70, 83, 93, 0.54902) 0px 0px 6px inset');
		
		$curItem.find('select[name^=iModType]').each(function(){ //reinitialize to get the right width
			$(this).multiselect({
				   multiple: false,
				   header: false,
				   noneSelectedText: "Pick an option type",
				   selectedList: 1
				}); 
		});
	});
	
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
		});
		
		$newSec.find(".menuSectionField").addClass('section'+newCount);
		
		//sorting
		$newSec.find(".hasTableHeader").after("<div class='sortWithinDiv'> </div>" );
		$newSec.find(".sortWithinDiv").sortable({ 
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
						tempName = $(this).attr('name');
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
				for(var i=0;i<currentItemOrder.length;i++)
				{
					itemCountArray[i] = $("#"+currentItemOrder[i]+"_optionCount").val();
					itemCountActArray[i] = $("#"+currentItemOrder[i]+"_optionCountAct").val();
				}
				
				for(var i=0;i<oldItemOrder.length;i++) //the new values go to the old order. that's how the association is preserved.
				{
					$("#"+oldItemOrder[i]+"_optionCount").val(itemCountArray[i]);
					$("#"+oldItemOrder[i]+"_optionCountAct").val(itemCountActArray[i]);
				}
			}
		});
		
		$newSec.find('.sortWithinDiv').after($newHook);
		
		//insert at the end of the table
		if($('.moveSec:last').length)
		{
			$("body").find('.moveSec:last').after($newSec);
		}
		else
		{
			$("body").find('.newSection').parent('.row').before($newSec);
		}
		
		$($newSec).slideDown('slow');
		
		$('body').find('.firstItemDivsection'+newCount).parents('#menuSectionRow').wrap('<div class="moveSec"></div>').wrap('<div class="moveSecInner"></div>');
	});
	
	$(document).on("click", ".deleteSection", function(){
		//get id
		sectionID = ($(this).attr('id')).replace("delete_section","");
		$parentSectionHeader = $(this).parents('#menuSectionRow');
		
		
		noty({
			layout: 'center',
			type: 'confirm',
			text: 'Are you sure you want to delete this section? Note: all items and options will be lost!',
			buttons: [
			{addClass: 'alert tiny', text: 'Yes, delete this section and all its contents!', onClick: function($noty) {
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
				
				for(i=0;i<itemIDArray.length;i++) //remove all option count data for each item
				{
					$("#item"+itemIDArray[i]+"_optionCount").remove();
					$("#item"+itemIDArray[i]+"_optionCountAct").remove();
				}
				
				//now we adjust item count
				var itemCounter = $("#itemCountAct").val();
				var newCount = parseInt(parseInt(itemCounter) - itemCount);
				$("#itemCountAct").val(newCount);

				//we delete the section here
				$parentSectionHeader.remove(); //remove section header and buttons!

				$(".tablesection"+sectionID).remove(); //tables of all items gone!
				$(".firstItemDivsection"+sectionID).remove(); //hidden section hook gone!

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
	
	$(".itemMenuSingleSelect").multiselect({
	   multiple: false,
	   header: false,
	   noneSelectedText: "Pick an option type",
	   selectedList: 1
	});
	

	$("input[name^=iMod]").autocomplete({ source: [ "Choose a size","Choose a flavour","Choose a topping","Choose some extras","Choose a side dish" ], delay: 10, minLength: 0 });
	
	$(document).on("click", '.showAChevy, input[name^=iMod]', function(){
		$(this).parent('.modifierRow').find("input[name^=iMod]").autocomplete( "search", "C" );
	});
	
	
	$('#menuConfigForm').click(function(event) {
	  $(this).data('clicked',$(event.target))
	});
	
	$("#menuConfigForm").on('valid', function (event) {
		//lock all
		$("body .itemSave").each(function(){
			if($(this).is(":visible"))
				$(this).trigger('click');
		});
		
		var editingSkip = 0;
		if ($(this).data('clicked').is('[id=menuSaveButtonE]')) editingSkip = 1;
		
		$('#menuSaveButton').hide();
		if($('#menuSaveButtonE').length) $('#menuSaveButtonE').hide();
		$('#savingButton').show();
	
		var url = "/saveMenu";
		
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
						  text: "Sorry, but there's been an error processing your request." //text: 'Connection Error! Check API endpoint.'
						});
						
						//alert(data);
						
						return false;
					}
					
					if(typeof dataArray['status'] !='undefined') //error
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: "Sorry, but there's been an error processing your request." //text: dataArray['message']
						});
				   
					}
					else
					{	
						noty({ type: 'success', text: 'Menu configuration has been saved!' });
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
				
				$('#savingButton').hide();
			 });
	
		return false; // avoid to execute the actual submit of the form.
	}); 
	
	$(document).on("click", ".newEvent, .eventDuplicate", function() {
		//new item or duplicate?
		var dup = 0;
		if($(this).hasClass("eventDuplicate")) dup = 1;
		
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
			var newName = newName.replace(/\[\d+\]/gi, "["+$newOCount.val()+"]");
			$(this).attr('name', newName);
		});
		
		//remove multiselect
		if(dup) $newTab.find(".ui-multiselect").remove();
		
		//Replace ids with incremented value and make value = default value + add multiselect
		$newTab.find(".optionTR select").each(function() {
			if(!dup) $(this).val( $(this).prop("defaultValue") );
			var tempName = $(this).attr('name');
			var newName = tempName.replace(/event\d+/gi, 'event'+newCount);
			var newName = newName.replace(/\[\d+\]/gi, "["+$newOCount.val()+"]");
			$(this).attr('name', newName);
			
			$(this).multiselect({
			   multiple: false,
			   header: false,
			   noneSelectedText: "Collection Slot",
			   selectedList: 1
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
	});
	
	$(document).on("click", ".eventDelete", function() {
		//get event number
		$curTable = $(this).closest('table');
		eventID = $curTable.attr('id');
		
		realEventID = $curTable.find("input[name^=eID]").val();
		
		if(typeof realEventID =='undefined' || realEventID == '') //event not saved in DB
		{
			noty({
				layout: 'center',
				type: 'confirm',
				text: 'Are you sure you want to delete this event? Note: all event data will be lost!',
				buttons: [
				{addClass: 'alert tiny', text: 'Yes, delete this event!', onClick: function($noty) {
					
					//get and update current count
					eventCount = $("#eventCountAct").val();
					newCount = parseInt(parseInt(eventCount) - 1);
					$("#eventCountAct").val(newCount);
					
					//bye-bye
					$("#"+eventID).remove();
					
					$noty.close();
				  }
				},
				{addClass: 'secondary tiny', text: 'No, go back.', onClick: function($noty) {
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
				text: 'Are you sure you want to delete this event? Note: all event data will be lost!',
				buttons: [
				{addClass: 'alert tiny', text: 'Yes, delete this event!', onClick: function($noty) {
					
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
									  text: "Sorry, but there's been an error processing your request." /*text: 'Connection Error! Check API endpoint.'*/
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
				{addClass: 'secondary tiny', text: 'No, go back.', onClick: function($noty) {
					$noty.close();
				  }
				}
			  ]
			});
		}
		
	});
	
	$(".eventMenuSingleSelect").multiselect({
	   multiple: false,
	   header: false,
	   noneSelectedText: "Collection Slot",
	   selectedList: 1
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
			   noneSelectedText: "Collection Slot",
			   selectedList: 1
			}); 
		});
		
		//replace ids with incremented value and make value = default value
		$newRow.find("input").each(function() {
			$(this).val( $(this).prop("defaultValue") );
			var tempName = $(this).attr('name');
			var newName = tempName.replace(/event\d+/gi, eventID);
			var newName = newName.replace(/\[\d+\]/gi, "["+newCount+"]");
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
						  text: "Sorry, but there's been an error processing your request." /*text: 'Connection Error! Check API endpoint.'*/
						});
						//alert(data);
						return false;
					}
					
					if(typeof dataArray['status'] !='undefined') //error
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: "Sorry, but there's been an error processing your request." /*text: dataArray['message']*/
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
						if($('#redirectFlag').val()=='1') setTimeout(function(){window.location.replace("/dashboard");}, 1000);
					}
				}
			 }).done(function() {
				$('#eventSubButton').show();
				$('#savingButton').hide();
			 });

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
		$curItem.find(".userMenuSingleSelect").multiselect("disable");
		$curItem.css('background', 'transparent');
		$curItem.css('box-shadow', '0px 0px 0px');
	});
	
	$(document).on("click", ".userTDEdit, .userTR input[readonly='readonly']", function() {
		if($(this).hasClass('userTDEdit')) $(this).hide();
		else $(this).closest('table').find('.userTDEdit').hide();
		$curItem = $(this).closest('table');
		$curItem.find("tr").addClass('userEdit');
		$curItem.find("tr").removeClass('savedInput');
		$curItem.find("input").removeAttr("readonly");
		$curItem.find(".userSave").removeClass('hide');
		$curItem.find(".userSave").show();
		$curItem.find(".userMenuSingleSelect").multiselect("enable");
		$curItem.css('background', '#fafafa');
		$curItem.css('box-shadow', 'rgba(70, 83, 93, 0.54902) 0px 0px 6px inset');
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
		
		$newTab.find(".userTR select").each(function() {
			if(!dup) $(this).val( $(this).prop("defaultValue") );
			var tempName = $(this).attr('name');
			var newName = tempName.replace(/\[\d+\]/gi, "["+newCount+"]");
			$(this).attr('name', newName);
			
			$(this).multiselect({
			   multiple: false,
			   header: false,
			   noneSelectedText: "Role",
			   selectedList: 1
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
		
		if(typeof realUserID =='undefined' || realUserID == '') //event not saved in DB
		{
			noty({
				layout: 'center',
				type: 'confirm',
				text: 'Are you sure you want to delete this user? Note: all user data will be lost!',
				buttons: [
				{addClass: 'alert tiny', text: 'Yes, delete this user!', onClick: function($noty) {
					
					//get and update current count
					userCount = $("#userCountAct").val();
					newCount = parseInt(parseInt(userCount) - 1);
					$("#userCountAct").val(newCount);
					
					//bye-bye
					$("#"+userID).remove();
					
					$noty.close();
				  }
				},
				{addClass: 'secondary tiny', text: 'No, go back.', onClick: function($noty) {
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
				text: 'Are you sure you want to delete this user? Note: all user data will be lost!',
				buttons: [
				{addClass: 'alert tiny', text: 'Yes, delete this user!', onClick: function($noty) {
					
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
									  text: "Sorry, but there's been an error processing your request." /*text: 'Connection Error! Check API endpoint.'*/
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
				{addClass: 'secondary tiny', text: 'No, go back.', onClick: function($noty) {
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
						  text: "Sorry, but there's been an error processing your request." /*text: 'Connection Error! Check API endpoint.'*/
						});
						//alert(data);
						return false;
					}
					
					if(typeof dataArray['status'] !='undefined') //error
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: "Sorry, but there's been an error processing your request." /*text: dataArray['message']*/
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
						noty({ type: 'success', text: 'User configuration has been saved!' });
						
					}
				}
			 }).done(function() {
				$('#userSubButton').show();
				$('#savingButton').hide();
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
			   checkAllText: "Select all menus",
			   uncheckAllText: "Unselect all menus",
			   noneSelectedText: "Select menu(s) for this outlet",
			   selectedText: "# of # selected",
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
	   checkAllText: "Select all menus",
	   uncheckAllText: "Unselect all menus",
	   noneSelectedText: "Select menu(s) for this outlet",
	   selectedText: "# of # selected",
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
				text: 'Are you sure you want to delete this outlet? Note: all outlet data will be lost!',
				buttons: [
				{addClass: 'alert tiny', text: 'Yes, delete this outlet!', onClick: function($noty) {
					
					//get and update current count
					outletCount = $("#outletCountAct").val();
					newCount = parseInt(parseInt(outletCount) - 1);
					$("#outletCountAct").val(newCount);
					
					//bye-bye
					$("#"+outletID).remove();
					
					$noty.close();
				  }
				},
				{addClass: 'secondary tiny', text: 'No, go back.', onClick: function($noty) {
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
				text: 'Are you sure you want to delete this outlet? Note: all outlet data will be lost!',
				buttons: [
				{addClass: 'alert tiny', text: 'Yes, delete this outlet!', onClick: function($noty) {
					
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
									  text: "Sorry, but there's been an error processing your request." /*text: 'Connection Error! Check API endpoint.'*/
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
				{addClass: 'secondary tiny', text: 'No, go back.', onClick: function($noty) {
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
						  text: "Sorry, but there's been an error processing your request." /*text: 'Connection Error! Check API endpoint.'*/
						});
						//alert(data);
						return false;
					}
					
					if(typeof dataArray['status'] !='undefined') //error
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: "Sorry, but there's been an error processing your request." /*text: dataArray['message']*/
						});
					}
					else
					{	
						noty({ type: 'success', text: 'Outlet configuration has been saved!' });
						
					}
				}
			 }).done(function() {
				$('#outSubButton').show();
				$('#savingButton').hide();
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
		$newDiv = $oldDiv.clone(false);
		
		$newDiv.find('input').each(function(){
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
		
		$newDiv.find('.removeOHDiv').show();
		
		//hide it so we can animate it!
		$newDiv.css('display','none');
		
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
		
		//get data for this day
		$data = $("."+id).clone(true,true);
		
		openData = new Array();
		closeData = new Array();
		
		openCounter = 0;
		closeCounter = 0;
		
		$data.find('input[name^=ohStartTime]').each(function(){
			openData[openCounter] = $(this).val();
			openCounter++;
		});
		
		$data.find('input[name^=ohEndTime]').each(function(){
			closeData[closeCounter] = $(this).val();
			closeCounter++;
		});
		
		$("body").find('.openingHoursDiv').each(function(){
			if(!($(this).hasClass(id)))
			{
				$(this).empty();
				$(this).append($data.html());
				
				openCounter = 0;
				closeCounter = 0;
				
				newID = $(this).attr('id');
				
				$(this).find('.openHWrapper').each(function(){
				
					$(this).find('input').each(function(){
						$(this).timepicker({'showDuration': true, 'timeFormat': 'H:i', 'step': 15 });
						var tempName = $(this).attr('name');
						var newName = tempName.replace(id, newID);
						$(this).attr('name', newName);
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
				});
			}
		});
		
		//notify!
		noty({
			type: 'success',
			text: 'These times have been applied to all days!'
		});
	});
	
	$("#nonEventConfigForm").on('invalid', function (event) {
		noty({
		  type: 'error',  layout: 'topCenter',
		  text: "We still need some more information. Don't forget to fill out the remaining days of the week!" /*text: dataArray['message']*/
		});
	});
	
	$("#nonEventConfigForm").on('valid', function (event) {
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
						  text: "Sorry, but there's been an error processing your request." /*text: 'Connection Error! Check API endpoint.'*/
						});
						//alert(data);
						return false;
					}
					
					if(typeof dataArray['status'] !='undefined') //error
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: "Sorry, but there's been an error processing your request." /*text: dataArray['message']*/
						});
					}
					else
					{	
						noty({ type: 'success', text: 'All times has been saved!' });
						if($('#redirectFlag').val()=='1') setTimeout(function(){window.location.replace("/dashboard");}, 1000);
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
		
		//clone dummy table
		$newTab = $("#md0").clone(true);
		$newTab.attr('id','md'+newCount);
		
		//replace ids with incremented value and make value = default value
		$newTab.find(".mdTR input").each(function() {
			$(this).val( $(this).prop("defaultValue") );
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
		
		//add id
		$newTab.find("input[name^=mdID]").each(function() {
			$(this).val('mid'+newCount);
		});
		
		$newTab.css('backgroundColor','#fafafa');
		
		//hide it so we can animate it!
		$newTab.css('display','none');
		
		//insert after section header/before hidden div
		$("table:last").before($newTab); 
		
		$($newTab).slideRow('down');
		
		$("html, body").animate({scrollTop: $($newTab).offset().top - ( $(window).height() - $($newTab).outerHeight(true) ) / 2}, 200);
	});
	
	$(document).on("click", ".mdTDIName i.fi-plus", function(){
		$(this).removeClass('fi-plus');
		$(this).addClass('pd-delete');
		$(this).parent("button").addClass('secondary');
		
		//add price
		$tempEl = $(this).closest(".mdTable").find('.mdTDTPrice input');
		temp = parseFloat($tempEl.val());
		$theSpan = $(this).closest(".mdItemName").find('span');
		currentPrice = parseFloat($theSpan.attr('data-value'));
		temp = parseFloat(temp + currentPrice).toFixed(2);
		$tempEl.val(temp);
		
		//add id to list
		$mdItems = $(this).closest("td.mdTDIName").find("input[name^=mdItems]");
		allIDs = $mdItems.val();
		thisID = $theSpan.attr('id');
		thisID = thisID.replace(/\d+_item_/gi, "");
		allIDs = allIDs + thisID + ";";
		$mdItems.val(allIDs);
	});
	
	$(document).on("click", ".mdTDIName i.pd-delete", function(){
		$(this).removeClass('pd-delete');
		$(this).addClass('fi-plus');
		$(this).parent("button").removeClass('secondary');
		
		//subtract price
		$tempEl = $(this).closest(".mdTable").find('.mdTDTPrice input');
		temp = parseFloat($tempEl.val());
		$theSpan = $(this).closest(".mdItemName").find('span');
		currentPrice = parseFloat($theSpan.attr('data-value'));
		temp = parseFloat(temp - currentPrice).toFixed(2);
		$tempEl.val(temp);
		
		//remove id from list
		$mdItems = $(this).closest("td.mdTDIName").find("input[name^=mdItems]");
		allIDs = $mdItems.val();
		thisID = $theSpan.attr('id');
		thisID = thisID.replace(/\d+_item_/gi, "");
		allIDs = allIDs.replace(thisID+";", "");
		$mdItems.val(allIDs);
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
				text: 'Are you sure you want to delete this meal deal? Note: all associated data will be lost!',
				buttons: [
				{addClass: 'alert tiny', text: 'Yes, delete this meal deal!', onClick: function($noty) {
					
					//get and update current count
					mdCount = $("#mdCountAct").val();
					newCount = parseInt(parseInt(mdCount) - 1);
					$("#mdCountAct").val(newCount);
					
					//bye-bye
					$("#"+mdID).remove();
					
					$noty.close();
				  }
				},
				{addClass: 'secondary tiny', text: 'No, go back.', onClick: function($noty) {
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
				text: 'Are you sure you want to delete this meal deal? Note: all associated data will be lost!',
				buttons: [
				{addClass: 'alert tiny', text: 'Yes, delete this meal deal!', onClick: function($noty) {
					
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
									  text: "Sorry, but there's been an error processing your request." /*text: 'Connection Error! Check API endpoint.'*/
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
				{addClass: 'secondary tiny', text: 'No, go back.', onClick: function($noty) {
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
		$curItem.css('background', 'transparent');
	});
	
	$(document).on("click", ".mdTDEdit", function() {
		$(this).hide();
		$curItem = $(this).closest('table');
		$curItem.find("tr").addClass('mdEdit');
		$curItem.find("tr").removeClass('savedInput');
		$curItem.find("input").removeAttr("readonly");
		$curItem.find(".mdSave").removeClass('hide');
		$curItem.find(".mdSave").show();
		$curItem.find(".optionTR").slideRow('down');
		$curItem.find(".subHeaderTR").slideRow('down');
		$curItem.css('background', '#fafafa');
	});
		
	$("#mealDealConfigForm").on('valid', function (event) {
		//lock all
		$("body .mdSave").each(function(){
			if($(this).is(":visible"))
				$(this).trigger('click');
		});
	
		var url = "/saveMealDeal";
		
		$('#mdSubButton').hide();
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
						  text: "Sorry, but there's been an error processing your request." /*text: 'Connection Error! Check API endpoint.'*/
						});
						//alert(data);
						return false;
					}
					
					if(typeof dataArray['status'] !='undefined') //error
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: "Sorry, but there's been an error processing your request." /*text: dataArray['message']*/
						});
					}
					else
					{	
						noty({ type: 'success', text: 'All changes has been saved!' });
						
					}
				}
			}).done(function() {
				$('#mdSubButton').show();
				$('#savingButton').hide();
			 });

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
			/*
			$(".phone1").css('margin-left','0');
			$(".phone1").animate({'margin-left':'-252px'},150);
			
			setTimeout(function(){$(".phone1").hide();$(".phone2").show();$(".phone2").removeClass('hide');$(".phone1").addClass('hide');}, 20);
			
			$(".phone2").css('margin-left','252px');
			$(".phone2").animate({'margin-left':'0'},100);
			*/
			
			$(".phone1").hide();
			$(".phone2").show();
		}
		else
		{
			/*$(".phone2").css('margin-left','0px');
			$(".phone2").animate({'margin-left':'252px'},150);
			
			setTimeout(function(){$(".phone2").hide();$(".phone1").show();$(".phone1").removeClass('hide');$(".phone2").addClass('hide');}, 20);
			
			$(".phone1").css('margin-left','-252px');
			$(".phone1").animate({'margin-left':'0'},100);
			
			$(".phone1").removeClass('hide');
			$(".phone2").addClass('hide');*/
			
			$(".phone2").hide();
			$(".phone1").show();
		}
		
		$(".phone1pager").toggle();
		$(".phone2pager").toggle();
	});
	
	$("#changePassTrigger").on('click', function(e) {
		if(!$("#passDiv").is(":visible"))
		{
			$("#passDiv").show();
			$(".passField").attr('required','required');
			$("#passFlag").val(1);
		}
		else
		{
			$("#passDiv").hide();
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
			text: 'Are you sure you want to delete this menu? Note: all menu data will be lost!',
			buttons: [
			{addClass: 'alert tiny', text: 'Yes, delete this menu!', onClick: function($noty) {
				
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
								  text: "Sorry, but there's been an error processing your request." /*text: 'Connection Error! Check API endpoint.'*/
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
			{addClass: 'secondary tiny', text: 'No, go back.', onClick: function($noty) {
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
						  text: "Sorry, but there's been an error processing your request." //text: 'Connection Error! Check API endpoint.'
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
							  text: "Sorry, incorrect password." //text: dataArray['message']
							});
						}
						else
						{
							noty({
							  type: 'error',  layout: 'topCenter',
							  text: "Sorry, but there's been an error processing your request." //text: dataArray['message']
							});
						}
					}
					else
					{	
						if($('#passFlag').val()=='1')
						{
							noty({ type: 'success', text: 'Settings and Password has been saved!<br/>You will need to log in again with your new password to continue.' });
							setTimeout(function(){window.location.replace("/logout");}, 2500);
						}
						else
						{
							noty({ type: 'success', text: 'Settings have been saved!' });
						}
					}
				}
			 });

		return false; // avoid to execute the actual submit of the form.
	});
	
	$(".moreSelect").multiselect({
	   noneSelectedText: "Please select features you require",
	   selectedText: "# of # selected",
	   checkAllText: "Select all",
	   uncheckAllText: ""
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
	
	//back to stripe connect
	$('#startStripe').on('click', function(){
		var url = "/startStripe";
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
	
	//suppress text
	$('#suppressText').on('click', function(){
		if($(this).is(':checked')){
			$("#aHeading").val(' ')
			$("#appHeading").html(' ');
			$("#aSubheading").val(' ');
			$("#subHeading").html(' ');
		}
		else
		{
			$("#aHeading").val('');
			$("#appHeading").html('Your heading goes here');
			$("#aSubheading").val('');
			$("#subHeading").html('Your subheading goes here');
		}
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
	$("#vSug").val('');
	$("#vName").val('');
	$("#vAdd").val('');
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
