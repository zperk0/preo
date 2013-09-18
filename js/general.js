/*$(".accordion").on("click", "section", function (event) { //This is a custom jQuery script to help Accordion sections ease better
	$("section.active").find(".content").slideToggle(60);
	$(this).find(".content").slideToggle(300);
});*/

//STOP ENTER from FORM SUBMISSION for add event typeahead/////////////
	$('.noEnterSubmit').keypress(function(e){
		if ( e.which == 13 ) return false;
		//or...
		if ( e.which == 13 ) e.preventDefault();  //just need to give class="noEnterSubmit"
	}); 
//////////////////////////////////////////////////////////////////////

$("#signupForm").on('valid', function (e) {
    var url = "/doSignUp";

    $.ajax({
           type: "POST",
           url: url,
           data: $(this).serialize(), // serializes the form's elements.
           success: function(data)
           {
				//alert(data); //debug
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
					$.post("/code/signup/save_session.php", 'token='+dataArray['owner']['token']+'&bName='+dataArray['name']+'&email='+dataArray['owner']['email']+'&name='+dataArray['owner']['name']+'&id='+dataArray['owner']['id']);
					setTimeout(function(){window.location.replace("/dashboard")},1000); //give time for post request to fulfil
				}
			}
         });

    return false; // avoid to execute the actual submit of the form.
});

$("#signinForm").on('valid', function (e) {
    var url = "/doSignIn";

    $.ajax({
           type: "POST",
           url: url,
           data: $(this).serialize(), // serializes the form's elements.
           success: function(data)
           {
				//alert(data); //debug
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
					$.post("/code/signin/save_session.php", 'token='+dataArray['token']+'&email='+dataArray['email']+'&name='+dataArray['name']+'&id='+dataArray['id']);
					setTimeout(function(){window.location.replace("/dashboard")},1000); //give time for post request to fulfil
				}
			}
         });

    return false; // avoid to execute the actual submit of the form.
});
map = null; // make google maps var global
mapDefaultCenterLat = 54.370559; // make google maps var global = set center as center of UK
mapDefaultCenterLong = -2.510376; // make google maps var global = set center as center of UK

$(document).ready(function() {

	//change language ajaxy button
	$("a.changeLang").on('click', function () {
		var newLang = $(this).attr('data-new-lang');
		$.post("/code/shared/changeLang.php", 'lang='+newLang);
		setTimeout(function(){window.location.reload()},1000); //give time for post request to fulfil
	});
	
	//Get the latest map tiles/refresh
	google.maps.visualRefresh = true;
	
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
	var pinColor = "FE7569";
    var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
        new google.maps.Size(21, 34),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34));
	
	//Google Places autocomplete
	var input = document.getElementById('vAdd');
	var options = {'types':[ 'establishment']}; //restricted only to business. We dont need country/street/area names now
	var autocomplete = new google.maps.places.Autocomplete(input, options);
	autocomplete.bindTo('bounds', map); //set the guesses to be bound around the map so closer to the location (i.e. UK)
	google.maps.event.addListener(autocomplete, 'place_changed', function() {
		place = autocomplete.getPlace();
		document.getElementById('gCode').value = place.geometry.location.toString();  
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
					place.address_components[2].short_name || '')
				  ].join(' ');
		}
		
		marker = new google.maps.Marker({ 
			map: map, 
			animation: google.maps.Animation.DROP,
			icon: pinImage, 
			title: place.name+', '+address
		});
		  
        marker.setPosition(place.geometry.location);
        
		var contentString = '<div class="infobox-wrapper"><div class="infobox"><strong>'+place.name+'</strong><br/>'+address+'</div></div>';

		infobox = new InfoBox({
			content: contentString,
			disableAutoPan: false,
			maxWidth: 150,
			pixelOffset: new google.maps.Size(-140, 0),
			zIndex: null,
			boxStyle: {
				background: "url('http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/examples/tipbox.gif') no-repeat",
				opacity: 0.75,
				width: "280px"
			},
			closeBoxMargin: "12px 4px 2px 2px",
			closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
			infoBoxClearance: new google.maps.Size(1, 1)
		});
		
		google.maps.event.addListener(marker, 'click', function () {
			infobox.open(map,marker);
		});	
	});
	
	//inline onClick replacements
	$('#venueTop').on('click', function() { resizeGMap(); });
	
	$("[id^=delItem]").live('click', function() {
		var cID = $(this).attr('id');
		var cNum = cID.replace("delItem","");
		
		$("#optNameDiv"+cNum).remove();
		$("#optPriceDiv"+cNum).remove();
		$("#optDelDiv"+cNum).remove();
	});
	
	$("[id^=thumb]").live('click', function() {
		var tID = $(this).attr('id');
		var wall = tID.replace("thumb","wall");
		var newImgSrc = "/img/wallpapers/" + wall + ".jpg";
		$("#phoneWallpaper").attr("src", newImgSrc);
	});
	
	$("#aHeading").bind('propertychange keyup input paste',function() {
		var content = $(this).val();
		$("#appHeading").html(content);
	});
});

//map resizing with window
$(window).resize(function(){
	google.maps.event.trigger(map, 'resize');
	if (typeof place != 'undefined') map.setCenter(place.geometry.location);
		else map.setCenter( new google.maps.LatLng(mapDefaultCenterLat,mapDefaultCenterLong) );
});

function clearMapInput() {
	$('#vAdd').val('');
	$('#gCode').val('');
	if (typeof marker != 'undefined') marker.setMap(null);
}

function resizeGMap() {
	setTimeout(function(){
		google.maps.event.trigger(map, 'resize');
		if (typeof place != 'undefined') map.setCenter(place.geometry.location);
		else map.setCenter( new google.maps.LatLng(mapDefaultCenterLat,mapDefaultCenterLong) );
		}, 25);
}