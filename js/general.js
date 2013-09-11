$(".accordion").on("click", "section", function (event) { //This is a custom jQuery script to help Accordion sections ease better
	$("section.active").find(".content").slideToggle(60);
	$(this).find(".content").slideToggle(300);
});

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

$(document).ready(function() {
	$("a.changeLang").on('click', function () {
		var newLang = $(this).attr('data-new-lang');
		$.post("/code/shared/changeLang.php", 'lang='+newLang);
		setTimeout(function(){window.location.reload()},1000); //give time for post request to fulfil
	});
});