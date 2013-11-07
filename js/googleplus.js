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
    noty({
	  type: 'error',
	  text: 'There was an error accessing your Google+ data'
	});
    console.log('Sign-in state: ' + authResult['error']);
  }
}

function setArray(attr, value)
{
	googleUserArray[attr] = value;
}

function startGSignUp(){
	$("#fName").val(googleUserArray['fName']);
	$("#lName").val(googleUserArray['lName']);
	$("#email").val(googleUserArray['email']);
	$("#gpid").val(parseInt(googleUserArray['id']));
	
	$('.nameRow, .socialMediaDiv').hide();
	$("#email").attr('readonly','readonly');
	
	noty({
	  type: 'success',
	  text: 'Google+ Signup complete. Now we just need a couple details from you'
	});
}