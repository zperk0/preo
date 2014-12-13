$(document).ready(function () {

	var CARD = null;

	$("#cAccount").on('submit', function ($e) {
		$e.preventDefault();

		CARD = {
			number: $('#cardnumber').val(),
	        cvc : $('#securitycode').val(),
	        exp_month : $('#expirymonth').val(),
	        exp_year : $('#expiryyear').val(),
	        postcode: $('#postcode').val(),
		    address1: "",
		    address2: "",
		    address3: ""
		};

      Stripe.card.createToken({
        // name: $scope.card.name,
        number : CARD.number,
        cvc : CARD.cvc,
        exp_month : CARD.exp_month,
        exp_year : CARD.exp_year
      }, stripeResponseHandler);

	postForm();
	});

	var stripeResponseHandler = function (status, response) {
       if (response.error) {
       	// show error message
       } else {        
         // token contains id, last4, and card type
         CARD.token = response.id;
         CARD.number = response.card.last4;
         CARD.type = response.card.type;
/*         console.log("success",status,response)
         $scope.card.$save({accountId:ACCOUNT_ID},success,stripeError); */
         postForm();
       }
	}

	var postForm = function () {

		var url = "/doSignUp";

		$.ajax({
		   type: "POST",
		   url: url,
		   data:{
			  "accountCard": CARD,
			  "user": {
			    "firstName": $('#firstname').val(),
			    "lastName": $('#surname').val(),
			    "email": $('#email').val(),
			    "password": $('#password').val()
			  },  
			  "businessName": $('#businessname').val(),
			  "preoPackageId": queryParams.preoPackageId,
			  "venueId": queryParams.venueId
			},
		   success: function(data)
		   {
				try
				{
					var dataArray = jQuery.parseJSON(data); //parsing JSON
				
				}
				catch(e)
				{
/*					noty({
					  type: 'error',  layout: 'topCenter',
					  text: _tr("Sorry, but there's been an error processing your request.")
					});*/
					//alert(data);
					
					return false;
				}
				
				if(typeof dataArray['status'] !='undefined') //error
				{
/*					noty({
					  type: 'error',  layout: 'topCenter',
					  text: dataArray['message'] 
					});*/
				}
				else
				{	
					$.post("/saveSignUp", 
					'bName='+dataArray['name']+'&bID='+dataArray['id']+'&email='+encodeURIComponent(dataArray['owner']['email'])+'&fName='+dataArray['owner']['firstName']+'&lName='+dataArray['owner']['lastName']+'&id='+dataArray['owner']['id'],
					function(response){
						window.location.replace("/dashboard");
					})
					.fail(function(jqxhr) { 
/*						noty({
							type: 'error',  layout: 'topCenter',
							text: 'Error: '+jqxhr.responseText	
						});*/
					});
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
	        params[decodeURIComponent(tokens[1])]
	            = decodeURIComponent(tokens[2]);
	    }

	    return params;
	}    

    getStripeKey();

    var queryParams = getQueryParams(document.location.search);
});