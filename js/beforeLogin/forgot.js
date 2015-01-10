$(document).ready(function() {
	$("#forgotPassForm").on('valid', function (event) {
		var url = "/doForgot";

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

					$('#loading').hide();
				}
			 });

		return false; // avoid to execute the actual submit of the form.
	});
});