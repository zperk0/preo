//global variables
map = null; // make google maps var global
mapDefaultCenterLat = 54.370559; // make google maps var global = set center as center of UK
mapDefaultCenterLong = -2.510376; // make google maps var global = set center as center of UK
globalPH = '';

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
	$('.noEnterSubmit').keypress(function(e){
		if ( e.which == 13 ) return false;
		//or...
		if ( e.which == 13 ) e.preventDefault();  //just need to give class="noEnterSubmit"
	}); 
	//////////////////////////////////////////////////////////////////////

	$("#signupForm").on('valid', function (event) {
		var url = "code/signup/do_signup.php";

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
					
					if(typeof dataArray['status'] !='undefined') //error
					{
						noty({
						  type: 'error',
						  text: dataArray['message']
						});
					}
					else
					{	
						$.post("code/signup/save_session.php", 
						'bName='+dataArray['name']+'&bID='+dataArray['id']+'&email='+dataArray['owner']['email']+'&name='+dataArray['owner']['name']+'&id='+dataArray['owner']['id'],
						function(response){
							window.location.replace("./dashboard.php");
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
		var url = "code/signin/do_signin.php";

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
					
					if(typeof dataArray['status'] !='undefined') //error
					{
						noty({
						  type: 'error',
						  text: dataArray['message']
						});
				   
					}
					else
					{	
						$.post("code/signin/save_session.php", 
						'email='+dataArray['email']+'&name='+dataArray['name']+'&id='+dataArray['id'], 
						function(response){
							window.location.replace("./dashboard.php");
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
		var url = "code/shared/doForgot.php";

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
		$.post("code/shared/changeLang.php", 'lang='+newLang, function() {window.location.reload();}); 
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
		var url = "code/dashboard/do_venueSave.php";

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
						setTimeout(function(){window.location.replace("./dashboard.php");},1000);
					}
				}
			 });

		return false; // avoid to execute the actual submit of the form.
	});
	
	//ajax form upload
	var options = { 
		url: 'code/dashboard/doUploadLogo.php',
		success: function(responseText) { 
			noty({
			  type: 'success',
			  text: 'Uploaded!'
			});
			
			//alert(responseText);
			content="<img src='./img/logoUploads/"+responseText+"'/>";
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
		var newImgSrc = "./img/wallpapers/" + wall + ".jpg";
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
		var url = "code/dashboard/do_appConfig1.php";

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
						setTimeout(function(){window.location.replace("./dashboard.php");},1000);
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
		var url = "code/dashboard/do_appConfig2.php";

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
						setTimeout(function(){window.location.replace("./dashboard.php");},1000);
					}
				}
			 });

		return false; // avoid to execute the actual submit of the form.
	});
	
	$('#menuConfigForm .menuEdit input, #menuConfigForm #mName, #menuConfigForm .menuSectionDiv input').on('click', function(){
		if($(this).val()==$(this).prop('defaultValue')) $(this).val('');
	});
	
	//$('#menuConfigForm input').on('focusout', function(){
	//	if($(this).val()=='') $(this).val($(this).prop( 'defaultValue' ));
	//});
	
	$(".optionRowDelete").live('click', function() {
		//get item number
		$curTable = $(this).closest('table');
		var itemID = $curTable.attr('id');
		
		//get and update current count
		var itemCount = $('#'+itemID+'_optionCountAct').val();
		var newCount = parseInt(parseInt(itemCount) - 1);
		$('#'+itemID+'_optionCountAct').val(newCount);
		
		//bye-bye
		$(this).parents("tr:first").remove();
	});
	
	$(".newOpt, .optionRowDuplicate").live('click', function() {
		//new item or duplicate?
		var dup = 0;
		if($(this).hasClass("optionRowDuplicate")) dup = 1;
		
		//get item number
		$curTable = $(this).closest('table');
		var itemID = $curTable.attr('id');
		
		//get and update current count
		var itemCount = $('#'+itemID+'_optionCount').val();
		var newCount = parseInt(parseInt(itemCount) + 1);
		$('#'+itemID+'_optionCount').val(newCount);
		$('#'+itemID+'_optionCountAct').val(parseInt($('#'+itemID+'_optionCountAct').val())+1);
		
		if(dup)
		{
			//clone the row in question
			$curRow = $(this).closest('tr');
		}
		else
		{
			//clone the nearest row
			$curRow = $(this).closest('tr').next();
		}
		
        $newRow = $curRow.clone(true);
		$newRow.addClass('optionTR');
		
		//bind onClick function and replace ids with incremented value and make value = default value (for !dups)
		$newRow.find("input").each(function() {
			$(this).bind("click",function(){if($(this).val()==$(this).prop('defaultValue')) $(this).val('');});
			if(!dup) $(this).val( $(this).prop("defaultValue") );
			var tempName = $(this).attr('name');
			var newName = tempName.replace(/item\d+/gi, itemID);
			var newName = newName.replace(/\[\d+\]/gi, "["+newCount+"]");
			$(this).attr('name', newName);
		});
		
		//fix the yes/no slider so the label appears correctly
		$newRow.find(".menuTDVisi input").each(function() {
			$(this).trigger('click'); 
		});
				
		//hide it so we can animate it!
		$newRow.css('display','none');
		
		//insert at the end of the table
		$("#"+itemID+" tr:last").after($newRow);
		$("#"+itemID+" tr:last").fadeIn('slow');

		$('html, body').animate({scrollTop: $($newRow).offset().top - ( $(window).height() - $($newRow).outerHeight(true) ) / 2}, 200); //.animate({ scrollTop: $($newRow).offset().top }, 250);
	});
	
	$(".newItem, .itemDuplicate").live('click', function() {
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
		var itemCount = $('#itemCount').val();
		var newCount = parseInt(parseInt(itemCount) + 1);
		$('#itemCount').val(newCount);
		$('#itemCountAct').val(parseInt($('#itemCountAct').val())+1);
		
		if(dup) //clone an existing row
		{
			//create variables and insert
			$newOCount = $('#'+itemID+'_optionCount').clone(true);
			$newOCount.attr('id','item'+newCount+'_optionCount');
			$newOCount.attr('name','item'+newCount+'_optionCount');
			$newOCountAct = $('#'+itemID+'_optionCountAct').clone(true);
			$newOCountAct.attr('id','item'+newCount+'_optionCountAct');
			$newOCountAct.attr('name','item'+newCount+'_optionCountAct');
			$('#'+itemID+'_optionCountAct').after($newOCountAct);
			$('#'+itemID+'_optionCountAct').after($newOCount);
			
			
			//clone specific table
			$newTab = $('#'+itemID).clone(true);
			$newTab.attr('id','item'+newCount);
		}
		else //clone a dummy row
		{
			//create variables and insert
			$newOCount = $('#item0_optionCount').clone(true);
			$newOCount.attr('id','item'+newCount+'_optionCount');
			$newOCount.attr('name','item'+newCount+'_optionCount');
			$newOCount.val(0);
			$newOCountAct = $('#item0_optionCountAct').clone(true);
			$newOCountAct.attr('id','item'+newCount+'_optionCountAct');
			$newOCountAct.attr('name','item'+newCount+'_optionCountAct');
			$newOCountAct.val(0);
			$('#item0_optionCountAct').after($newOCountAct);
			$('#item0_optionCountAct').after($newOCount);
			
			//clone dummy table
			$newTab = $('#item0').clone(true);
			$newTab.attr('id','item'+newCount);
		}
		
			$newTab.addClass('table'+section);
		
		//bind onClick function and replace ids with incremented value and make value = default value
		$newTab.find(".itemTR input").each(function() {
			$(this).bind("click",function(){if($(this).val()==$(this).prop('defaultValue')) $(this).val('');});
			if(!dup) $(this).val( $(this).prop("defaultValue") );
			var tempName = $(this).attr('name');
			var newName = tempName.replace(/section\d+/gi, section);
			var newName = newName.replace(/\[\d+\]/gi, "["+newCount+"]");
			$(this).attr('name', newName);
		});
		
		//bind onClick function and replace ids with incremented value
		$newTab.find(".optionTR input").each(function() {
			$(this).bind("click",function(){if($(this).val()==$(this).prop('defaultValue')) $(this).val('');});
			if(!dup) $(this).val( $(this).prop("defaultValue") );
			var tempName = $(this).attr('name');
			var newName = tempName.replace(/item\d+/gi, 'item'+newCount);
			$(this).attr('name', newName);
		});
				
		//now we give the section id to the duplicate button
		$newTab.find(".itemDuplicate").attr('id',"dup"+newCount+"_"+section);
		
		//hide it so we can animate it!
		$newTab.css('display','none');
		
		//insert after section header/before hidden div
		$('.firstItemDiv'+section).before($newTab); 
		$newTab.slideDown('slow');
		$('html, body').animate({scrollTop: $($newTab).offset().top - ( $(window).height() - $($newTab).outerHeight(true) ) / 2}, 200);
	});
	
	$(".itemDelete").live('click', function() {
		//get item number
		$curTable = $(this).closest('table');
		var itemID = $curTable.attr('id');
		
		//get and update current count
		var itemCount = $('#itemCountAct').val();
		var newCount = parseInt(parseInt(itemCount) - 1);
		$('#itemCountAct').val(newCount);
		
		//bye-bye
		$('#'+itemID).remove();
	});
	
	$(".itemSave").live('click', function() {
		$(this).hide();
		$curItem = $(this).closest('table');
		$curItem.find("tr").removeClass('menuEdit');
		$curItem.find("tr").addClass('savedInput');
		$curItem.find("input").attr("readonly", "readonly").unbind( "click" );
		$curItem.find(".itemEdit").removeClass('hide');
		$curItem.find(".itemEdit").show();
		$curItem.find(".optionTR").hide();
		
		if($curItem.find("input[name^='iDesc']").val() == '')
		{	
			globalPH = $curItem.find("input[name^='iDesc']").attr('placeholder');
			$curItem.find("input[name^='iDesc']").attr('placeholder', '');
		}
		$curItem.css('background', '#E9E9E9');
	});
	
	$(".itemEdit").live('click', function() {
		$(this).hide();
		$curItem = $(this).closest('table');
		$curItem.find("tr").addClass('menuEdit');
		$curItem.find("tr").removeClass('savedInput');
		$curItem.find("input").removeAttr("readonly").bind("click",function(){if($(this).val()==$(this).prop('defaultValue')) $(this).val('');});
		$curItem.find(".itemSave").removeClass('hide');
		$curItem.find(".itemSave").show();
		$curItem.find(".optionTR").show();
		
		if($curItem.find("input[name^='iDesc']").val() == '')
			$curItem.find("input[name^='iDesc']").attr('placeholder', globalPH);
		$curItem.css('background', '#FFFFFF');
	});
	
	$(".newSection").live('click', function() {
		//get and update current count
		var secCount = $('#sectionCount').val();
		var newCount = parseInt(secCount) + 1;
		$('#sectionCount').val(newCount);
		$('#sectionCountAct').val(parseInt($('#sectionCountAct').val())+1);
	
		//clone dummy section and dummy hook
		$newSec = $('#menuSectionRow').clone(true);
		$newHook = $('.firstItemDiv').clone(true);
		
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
		
		$newSec.find(".menuSectionField").addClass('section'+newCount);
		
		//insert at the end of the table
		$('.newSection').before($newSec).before($newHook);
		$($newSec).fadeIn('slow');
	});
	
	$("#changePassTrigger").live('click', function(e) {
		$('#passDiv').show();
		$('#changePassTrigger').hide();
		e.preventDefault();
		
	});
	
	$("#menuConfigForm").on('valid', function (event) {
		var url = "code/dashboard/do_menuConfig.php";
		
		$('.itemSave').click();

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
					
					if(typeof dataArray['status'] !='undefined') //error
					{
						noty({
						  type: 'error',
						  text: dataArray['message']
						});
				   
					}
					else
					{	
						noty({ type: 'success', text: 'Menu configuration has been saved!' });
						setTimeout(function(){window.location.replace("./dashboard.php");},1000);
					}
				}
			 });

		return false; // avoid to execute the actual submit of the form.
	});
	
	$(".newEvent, .eventDuplicate").live('click', function() {
		//new item or duplicate?
		var dup = 0;
		if($(this).hasClass("eventDuplicate")) dup = 1;
		
		//get table event number
		$curTable = $(this).closest('table');
		var eventID = $curTable.attr('id');
		
		//get and update current count
		var eventCount = $('#eventCount').val();
		var newCount = parseInt(parseInt(eventCount) + 1);
		$('#eventCount').val(newCount);
		$('#eventCountAct').val(parseInt($('#eventCountAct').val())+1);
		
		if(dup) //clone an existing row
		{
			//clone specific table
			$newTab = $('#'+eventID).clone(false);
			$newTab.attr('id','event'+newCount);
		}
		else //clone a dummy row
		{
			//clone dummy table
			$newTab = $('#event0').clone(true);
			$newTab.attr('id','event'+newCount);
		}
		
		//bind onClick function and replace ids with incremented value and make value = default value
		$newTab.find(".eventTR input").each(function() {
			$(this).bind("click",function(){if($(this).val()==$(this).prop('defaultValue')) $(this).val('');});
			if(!dup) $(this).val( $(this).prop("defaultValue") );
			var tempName = $(this).attr('name');
			var newName = tempName.replace(/\[\d+\]/gi, "["+newCount+"]");
			$(this).attr('name', newName);
		});
				
		//now we give the item id to the duplicate button
		$newTab.find(".eventDuplicate").attr('id',"dup"+newCount);
		
		//now we add datepicker
		$newTab.find('.eventTDDate input').fdatepicker({format:'dd/mm/yyyy'}); 
		
		//now we add timepicker
		$newTab.find('.eventTDTime input').timepicker({'showDuration': true, 'timeFormat': 'H:i', 'step': 15 }); 
		
		//hide it so we can animate it!
		$newTab.css('display','none');
		
		//insert before section header/before hidden div
		$('.firstEventDiv').before($newTab); 
		$newTab.slideDown('slow');
		$('html, body').animate({scrollTop: $($newTab).offset().top - ( $(window).height() - $($newTab).outerHeight(true) ) / 2}, 200);
	});
	
	$(".eventSave").live('click', function() {
		$(this).hide();
		$curItem = $(this).closest('table');
		$curItem.find("tr").removeClass('eventEdit');
		$curItem.find("tr").addClass('savedInput');
		$curItem.find("input").attr("readonly", "readonly").unbind( "click" );
		$curItem.find(".eventTDEdit").removeClass('hide');
		$curItem.find(".eventTDEdit").show();
		$curItem.css('background', '#E9E9E9');
	});
	
	$(".eventTDEdit").live('click', function() {
		$(this).hide();
		$curItem = $(this).closest('table');
		$curItem.find("tr").addClass('eventEdit');
		$curItem.find("tr").removeClass('savedInput');
		$curItem.find("input").removeAttr("readonly").bind("click",function(){if($(this).val()==$(this).prop('defaultValue')) $(this).val('');});
		$curItem.find(".eventSave").removeClass('hide');
		$curItem.find(".eventSave").show();
		$curItem.css('background', '#FFFFFF');
	});
	
	$(".eventDelete").live('click', function() {
		//get event number
		$curTable = $(this).closest('table');
		var eventID = $curTable.attr('id');
		
		//get and update current count
		var eventCount = $('#eventCountAct').val();
		var newCount = parseInt(parseInt(eventCount) - 1);
		$('#eventCountAct').val(newCount);
		
		//bye-bye
		$('#'+eventID).remove();
	});
	
		$("#eventConfigForm").on('valid', function (event) {
		var url = "code/dashboard/do_eventConfig.php";

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
						noty({ type: 'success', text: 'Menu configuration has been saved!' });
						setTimeout(function(){window.location.replace("./dashboard.php");},1000);
					}
				}
			 });

		return false; // avoid to execute the actual submit of the form.
	});
	
	//make footer take all of the bottom
	elemHeight = $(window).height() - $('footer').offset().top - 40;
	$('footer.dashboardFooter div.columns').height(elemHeight);
	
	// Twitter App
	$('.twitterfeed').tweet({
		username: "PreoDayUK",
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
	  
	$('.showNextPhone, .phoneContainer').on('click', function(){
		if($('.phone2').hasClass('hide'))
		{
			$('.phone1').css('margin-left','0');
			$('.phone1').animate({'margin-left':'-252px'},150);
			
			setTimeout(function(){$('.phone1').hide();$('.phone2').show();$('.phone2').removeClass('hide');$('.phone1').addClass('hide');}, 50);
			
			$('.phone2').css('margin-left','252px');
			$('.phone2').animate({'margin-left':'0'},100);
					
			
		}
		else
		{
			$('.phone2').css('margin-left','0px');
			$('.phone2').animate({'margin-left':'252px'},150);
			
			setTimeout(function(){$('.phone2').hide();$('.phone1').show();$('.phone1').removeClass('hide');$('.phone2').addClass('hide');}, 50);
			
			$('.phone1').css('margin-left','-252px');
			$('.phone1').animate({'margin-left':'0'},100);
			
			$('.phone1').removeClass('hide');
			$('.phone2').addClass('hide');
		}
		
		$('.phone1pager').toggle();
		$('.phone2pager').toggle();
	});
	
	$('.deleteSection').on('click',function(){
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
				var secCount = $('#sectionCountAct').val();
				var newCount = parseInt(parseInt(secCount) - 1);
				$('#sectionCountAct').val(newCount);
				
				//count all items in question and get their ids
				itemCount = 0;
				itemIDArray = new Array();
				$('.tablesection'+sectionID).each(function() {
					itemIDArray[itemCount] = ($(this).attr('id')).replace("item","");
					itemCount++;
				});
				
				for(i=0;i<itemIDArray.length;i++) //remove all option count data for each item
				{
					$('#item'+itemIDArray[i]+'_optionCount').remove();
					$('#item'+itemIDArray[i]+'_optionCountAct').remove();
				}
				
				//now we adjust item count
				var itemCount = $('#itemCountAct').val();
				var newCount = parseInt(parseInt(itemCount) - itemCount);
				$('#itemCountAct').val(newCount);
				
				//we delete the section here
				$parentSectionHeader.remove(); //remove section header and buttons!

				$('.tablesection'+sectionID).remove(); //tables of all items gone!
				$('.firstItemDivsection'+sectionID).remove(); //hidden section hook gone!

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
		
	//make footer take all of the bottom
	elemHeight = $(window).height() - $('footer').offset().top - 40;
	$('footer.dashboardFooter div.columns').height(elemHeight);
});