$(document).ready(function () {
	$("#signinForm").on('valid', function (event) {
		var url = "/doSignIn";

		$('#loading').show();

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

						$('#loading').hide();	
						//alert(data);
						return false;
					}
					
					if(typeof dataArray['status'] !='undefined') //error
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: _tr("Incorrect credentials or account does not exist.") //dataArray['message'] //text: _tr("Sorry, but there's been an error processing your request.")
						});

						$('#loading').hide();
				   
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

							$('#loading').hide();
						});
					}
				}
			 });
		return false; // avoid to execute the actual submit of the form.
	});
});