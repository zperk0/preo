$(document).ready(function () {

	var CARD = null;

	$("#signUpForm").on('submit', function ($e) {
		$e.preventDefault();

		if (!$('#termsConditions').is(':checked')) {
			noty({
			  type: 'error',  layout: 'topCenter',
			  text: _tr("Your have accept tems & conditions for start using Preoday app.")
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

	function getQueryParams(qs) {
	    qs = qs.split("+").join(" ");

	    var params = {}, tokens,
	        re = /[?&]?([^=]+)=([^&]*)/g;

	    while (tokens = re.exec(qs)) {
	        params[decodeURIComponent(tokens[1]).toLowerCase()]
	            = decodeURIComponent(tokens[2]);
	    }

	    return params;
	}    

    getStripeKey();

    var queryParams = getQueryParams(document.location.search);
    if (!queryParams || !queryParams.businessname || !queryParams.packageid || !queryParams.venueid) {
    	window.location.href = 'http://www.preoday.com/';
    } else {
    	$('#businessName').val(queryParams.businessname);
    	$('#firstname').focus();
    }
});