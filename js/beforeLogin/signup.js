$(document).ready(function () {

	var CARD = null;

	$("#signUpForm").on('submit', function ($e) {
		$e.preventDefault();

		if (!$('#termsConditions').is(':checked')) {
			noty({
			  type: 'error',  layout: 'topCenter',
			  text: _tr("You must accept the terms and conditions to start using your Preoday app.")
			});			
			return false;
		}

		$('#loading').show();

		CARD = {
			name: $('#firstname').val() + ' ' + $('#surname').val(),
			number: $('#cardnumber').val(),
	        ccv : $('#securitycode').val(),
	        expmonth : $('#expirymonth').val(),
	        expyear : $('#expiryyear').val(),
	        postcode: $('#postcode').val(),
		    address1: "",
		    address2: "",
		    address3: ""
		};

      Stripe.card.createToken({
        name: CARD.name,
        number : CARD.number,
        cvc : CARD.ccv,
        exp_month : CARD.expmonth,
        exp_year : CARD.expyear
      }, stripeResponseHandler);
	});

	var stripeResponseHandler = function (status, response) {
       if (response.error) {
       	$('#loading').hide();
       	// show error message
       } else {        
         // token contains id, last4, and card type
         CARD.token = response.id;
         CARD.number = response.card.last4;
         CARD.type = response.card.type;
         postForm();
       }
	}

	var postForm = function () {

		var url = "/doSignUp";

		$.ajax({
		   type: "POST",
		   url: url,
		   dataType : "json",
		   data:{
			  "accountCard": CARD,
			  "user": {
			    "firstName": $('#firstname').val(),
			    "lastName": $('#surname').val(),
			    "email": $('#email').val(),
			    "password": $('#password').val()
			  },  
			  "businessName": queryParams.businessname,
			  "preoPackageId": queryParams.packageid,
			  "venueId": queryParams.venueid
			},
		   success: function(data)
		   {
		   		if (data instanceof Object) {
					$.post("/saveSignUp", 
					'bName='+queryParams.businessname+'&bID='+data.accountId+'&email='+encodeURIComponent(data.email)+'&fName='+data.firstName+'&lName='+data.lastName+'&id='+data.id,
					function(response){
						window.location.replace("/dashboard");
					})
					.fail(function(jqxhr) { 
						noty({
							type: 'error',  layout: 'topCenter',
							text: 'Error: '+jqxhr.responseText	
						});

						$('#loading').hide();
					});
		   		} else {
		   			$('#loading').hide();
					noty({
					  type: 'error',  layout: 'topCenter',
					  text: _tr("Sorry, but there's been an error processing your request.")
					});
					//alert(data);
					
					return false;		
		   		}
			}
		 });
	}

    function getStripeKey(){
        $.get('/api/config/app').
        success(function(data) {                        
            Stripe.setPublishableKey(data.stripeKey);               
        });        
    }	

	var queryParams = function () {
	  // This function is anonymous, is executed immediately and 
	  // the return value is assigned to QueryString!
	  var query_string = {};
	  var query = decodeURIComponent(window.location.search.substring(1));
	  var vars = query.split("&");
	  for (var i=0;i<vars.length;i++) {
	    var pair = vars[i].split("=");
	    	// If first entry with this name
	    if (typeof query_string[pair[0]] === "undefined") {
	      query_string[pair[0].toLowerCase()] = pair[1];
	    	// If second entry with this name
	    } else if (typeof query_string[pair[0]] === "string") {
	      var arr = [ query_string[pair[0]], pair[1] ];
	      query_string[pair[0].toLowerCase()] = arr;
	    	// If third or later entry with this name
	    } else {
	      query_string[pair[0].toLowerCase()].push(pair[1]);
	    }
	  } 
	    return query_string;
	} ();

    getStripeKey();

    if (!queryParams || !queryParams.businessname || !queryParams.packageid || !queryParams.venueid) {
    	window.location.href = 'http://www.preoday.com/';
    } else {
    	$('#businessName').val(queryParams.businessname);
    	$('#firstname').focus();
    }
});