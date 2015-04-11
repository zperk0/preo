$(document).ready(function () {
	$('#loading').show();
	var CARD = null;
	var claimUrl = CURRENT_DATA.CLAIM_URL;

	$("#signUpForm").on('valid', function () {
		if (!$('#termsConditions').is(':checked')) {
			noty({
			  type: 'error',  layout: 'topCenter',
			  text: _tr("You must accept the terms and conditions to start using your ") + CURRENT_DATA.TITLE + _tr(" app.")
			});			
			return false;
		}

		if ($.trim($('#firstname').val()).length === 0) {
			$('#firstname').parent().addClass('error');
			$('#firstname').val('').focus();
			return false;
		}

		if ($.trim($('#surname').val()).length === 0) {
			$('#surname').parent().addClass('error');
			$('#surname').val('').focus();
			return false;
		}

		if ($.trim($('#cardname').val()).length === 0) {
			$('#cardname').parent().addClass('error');
			$('#cardname').val('').focus();
			return false;
		}

		$('#errorStripe').removeClass('active');

		$('#loading').show();

		CARD = {
			name: $('#cardname').val(),
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
			  "preoPackageId": queryParams.packageid,
			  "venueId": queryParams.venueid
			},
		   success: function(data)
		   {
		   		if (data instanceof Object && data.status == undefined) {
						$.post("/saveSignUp", 
						'bName='+queryParams.businessname+'&bID='+data.accountId+'&email='+encodeURIComponent(data.email)+'&fName='+data.firstName+'&lName='+data.lastName+'&id='+data.id,
						function(response){
							window.location.href = "/dashboard";
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
			},  error: function (data) {
				if (data instanceof Object) {
					$('#loading').hide();

					if (data.status == 401 && data.responseJSON.message.indexOf('APIUserToken') !== -1) {
						notifyAndRedirect('success',_tr("This email address already exists, please sign in to access your dashboard."),2000,'/login');
					} else {
						$('#errorStripe').html(data.responseJSON.message).addClass('active');
					}	
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
  			$('.venue-name').html(data.name);  			
  			$.get("/api/packages/package/"+packageId).then(function(preoPackage){  				
  				setPackageInfo(preoPackage);
  				getStripeKey(callback);  				
  			}).fail(function(){
  				notifyAndRedirect('success',_tr("There's a problem with your package, please try again."),3000,claimUrl);
  			});  			
  		}
  	}).fail(function(){
  		  notifyAndRedirect('success',_tr("There's a problem with the selected venue, please try again."),3000,claimUrl);
  			window.location.href = claimUrl;
  	})
  }

  function setPackageInfo(preoPackage){  	
  	if (preoPackage.trialPeriod && preoPackage.trialPeriod > 0) {

  		if (preoPackage.id === 4 || preoPackage.id === 5) {
  			$('.package-trial .text-green').text(_tr('Your free trial will end after 10 successful orders'));
  			$('.package-trial h5').text(_tr('If you choose not to continue using Preoday just cancel before the trial ends and you won’t be charged (we’ll email you after your 8th order to remind you). You can upgrade, downgrade or cancel at any time.'));
  		}


  		$('body').addClass("trial"); 

  		$('.textTrialCardNumber').bind('click', function () {
  			$('.modal').addClass('active');
  		})

  		$('.closeModal').bind('click', function () {
  			$(this).closest('.modal').removeClass('active');
  		})
  		var d = moment().add(preoPackage.trialPeriod,'days');
  		$('.end-of-trial').html(d.format("DD/MM/YYYY"));

  	} else {
			$('body').addClass("payment");  
			$('.package-name').html(preoPackage.name);	
			var moreUnitPrice = '';
			if (preoPackage.id === 3) {
				moreUnitPrice = ' ' + _tr('(first 12 months upfront)');
			}
			$('.package-unit-price').html('£'+preoPackage.subscriptionPrice+"/"+_tr("month") + moreUnitPrice);
			var date = new Date();

			
			var contractMonths = 1;
			if (preoPackage.contractMonths) {
				contractMonths = preoPackage.contractMonths;
			}
			var subtotal = preoPackage.subscriptionPrice * contractMonths;
			var vat = (subtotal * 0.2).toFixed(2);
			var total = (subtotal + subtotal * 0.2).toFixed(2);
			$('.package-amount').html('£' + subtotal);
			$('.subtotal').html('£' + subtotal);
			$('.vat').html('£' + vat);
			$('.total').html('£' + total);

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