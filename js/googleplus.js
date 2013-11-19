googleUserArray = new Array();

//google+ signup
function signinCallback(authResult) 
{
  if (authResult['access_token']) 
  {
    gapi.auth.setToken(authResult);

	gapi.client.load('oauth2', 'v2', function() 
	{
		gapi.client.oauth2.userinfo.get().execute(function(gauth) 
		{
			// Shows user email & id
			//console.log(gauth.email);
			setArray('email', gauth.email);
			setArray('id', gauth.id);
			setArray('token', authResult['access_token']);
		});
	});

	gapi.client.load('plus', 'v1', function() 
	{
		gapi.client.plus.people.get( {'userId' : 'me'} ).execute(function(gplus) 
		{
			// Shows profile information
			//console.log(gplus);
			setArray('fName', gplus.name.givenName);
			setArray('lName', gplus.name.familyName);
		});
	});
	
	if(typeof googleUserArray != 'undefined' && typeof googleUserArray['id'] != 'undefined' && typeof googleUserArray['email'] != 'undefined' && typeof googleUserArray['fName'] != 'undefined' && typeof googleUserArray['lName'] != 'undefined' && googleUserArray['email']!= '' && googleUserArray['fName']!= '' && googleUserArray['lName']!= '' && googleUserArray['id']!= '') startGSignUp();
	
  } 
  else if (authResult['error']) 
  {
    /*noty({
	  type: 'error',
	  text: 'There was an error accessing your Google+ data'
	});*/
    console.log('Sign-in state: ' + authResult['error']);
  }
}

function setArray(attr, value)
{
	googleUserArray[attr] = value;
}

function makeRandomPassword()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}


function startGSignUp(){

	//we check if the user already exists
	token = googleUserArray['token'];
	gpid = googleUserArray['id'];

	//check if user already exists - if so try login - else signup
	$.ajax({
	   type: "POST",
	   url: "code/shared/do_googlepCheck.php", 
	   data: "token="+token+"&gpid="+gpid,
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
				  text: 'Error! Could not verify Google Plus credentials.'
				});
				alert(data);
				
				return false;
			}
			
			if(typeof dataArray['status'] !='undefined') //error
			{
				noty({
				  type: 'error',  layout: 'topCenter',
				  text: dataArray['message']
				});
			}
			else
			{	
				//success
				if(dataArray['signupFlag']=="0")
				{ 
					window.location.replace("./dashboard.php");
				}
				else
				{
					//signup
					$("#fName").val(googleUserArray['fName']);
					$("#lName").val(googleUserArray['lName']);
					$("#email").val(googleUserArray['email']);
					$("#gpid").val((googleUserArray['id']).toString());
					$("#passwordField").val(makeRandomPassword());
					
					$('.nameRow, .socialMediaDiv, .emailRow, .passRow').hide();
					$("#email").attr('readonly','readonly');
					
					noty({
					  type: 'success',
					  text: 'Google+ Signup complete. Now we just need your business name.'
					});
				}
			}
		}
	 });
}