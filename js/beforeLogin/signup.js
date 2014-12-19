$(document).ready(function () {
	$('#loading').show();
	var CARD = null;
	var claimUrl = 'http://www.preoday.com/';

	$("#signUpForm").on('valid', function () {
		if (!$('#termsConditions').is(':checked')) {
			noty({
			  type: 'error',  layout: 'topCenter',
			  text: _tr("You must accept the terms and conditions to start using your Preoday app.")
			});			
			return false;
		}

		$('#errorStripe').removeClass('active');

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

      return false;
	});

	var stripeResponseHandler = function (status, response) {
       if (response.error) {
       	$('#loading').hide();
       	$('#errorStripe').html(response.error.message).addClass('active');
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
		   	console.log("success",data);
		   		if (data instanceof Object && data.status == undefined) {
						$.post("/saveSignUp", 
						'bName='+queryParams.businessname+'&bID='+data.accountId+'&email='+encodeURIComponent(data.email)+'&fName='+data.firstName+'&lName='+data.lastName+'&id='+data.id,
						function(response){
							window.location.replace("/dashboard");
						})
						.fail(function(jqxhr) { 							
							$('#errorStripe').html(jqxhr.responseText).addClass('active');
							noty({
							  type: 'error',  layout: 'topCenter',
							  text: _tr("Sorry, but there's been an error processing your request.")
							});							
							$('#loading').hide();
						});
		   		} else {
		   			$('#loading').hide();
		   			if (data.status != undefined)
		   				$('#errorStripe').html(data.message).addClass('active');

						noty({
						  type: 'error',  layout: 'topCenter',
						  text: _tr("Sorry, but there's been an error processing your request.")
						});
						return false;		
		   		}
			}
		 });
	}

    function getStripeKey(callback){
        $.get('/api/config/app').
        success(function(data) {                        
            Stripe.setPublishableKey(data.stripeKey);                           
            callback();
        });        
    }	

  function validateVenue(venueId,packageId,callback){
  	$.get("/api/venues/"+venueId)
  	.then(function(data){
  		if (data.claimed != null){  			
  			notifyAndRedirect('success',_tr("This venue has been claimed already, sign in to access your dashboard."),2000,'/login');
  		}else {
  			$('#loading').hide();  		
  			$('#businessName').val(data.name);
  			$.get("/api/packages/package/"+packageId).then(function(preoPackage){
  				console.log('preoPack',preoPackage);
  				setPackageInfo(preoPackage);
  				getStripeKey(callback);  				
  			}).fail(function(){
  				notifyAndRedirect('success',_tr("There's a problem with your package, pelase try again."),3000,claimUrl);
  			});  			
  		}
  	}).fail(function(){
  		  notifyAndRedirect('success',_tr("There's a problem with the selected venue, pelase try again."),3000,claimUrl);
  			window.location.href = claimUrl;
  	})
  }

  function setPackageInfo(preoPackage){  	
  	console.log('ho');
  	console.log(preoPackage);
  	if (preoPackage.trialPeriod && preoPackage.trialPeriod > 0) {
  		$('body').addClass("trial"); 

  		$('.textTrialCardNumber').bind('click', function () {
  			$('.modal').addClass('active');
  		})

  		$('.closeModal').bind('click', function () {
  			$(this).closest('.modal').removeClass('active');
  		})
  	} else {
			$('body').addClass("payment");  
			$('.package-name').html(preoPackage.name);		
			$('.package-unit-price').html('£'+preoPackage.subscriptionPrice+"/"+_tr("month"));
			$('.package-billing-date').html('£'+preoPackage.subscriptionPrice+"/"+_tr("month"));
			var contractMonths = 1;
			if (preoPackage.contractMonths) {
				contractMonths = preoPackage.contractMonths;
			}
			var subtotal = preoPackage.subscriptionPrice * contractMonths;
			var vat = (subtotal * 0.2).toFixed(2);
			$('.package-amount').html('£' + subtotal);
			$('.subtotal').html('£' + subtotal);
			$('.vat').html('£' + vat);
			$('.total').html('£' + (subtotal + vat));

  	}
  }

  function notifyAndRedirect(type,message,duration,destination){
  	noty({
				  type: type,  layout: 'topCenter',
				  text: message
				});			
			setTimeout(function(){
				window.location.href = destination
			},duration)
  }

	var queryParams = function () {
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

    

    if (!queryParams  || !queryParams.packageid || !queryParams.venueid) {
    	window.location.href = claimUrl;
    } else {
    	validateVenue(queryParams.venueid, queryParams.packageid, function(){    	
    		$('#firstname').focus();
    	});    	
    }

});