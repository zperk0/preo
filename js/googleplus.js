googleUserArray = new Array();

//google+ signup
function signinCallback(authResult) 
{
  //console.log('entrying signinCallBack');
  try
  {
	  if (authResult['access_token']) 
	  {
		//console.log('Sign in: success');
		
		gapi.auth.setToken(authResult);

		gapi.client.load('oauth2', 'v2', function() 
		{
			//console.log('in client.oauth load');
			
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
			//console.log('in client.plus load');
			
			gapi.client.plus.people.get( {'userId' : 'me'} ).execute(function(gplus) 
			{
				// Shows profile information
				//console.log(gplus);
				setArray('fName', gplus.name.givenName);
				setArray('lName', gplus.name.familyName);
			});
		});
		
		//console.log(googleUserArray['id']);
		//console.log(googleUserArray['email']);
		//console.log(googleUserArray['fName']);
		//console.log(googleUserArray['lName']);
	
		setTimeout(function() {
			if(typeof googleUserArray != 'undefined' && typeof googleUserArray['id'] != 'undefined' && typeof googleUserArray['email'] != 'undefined' && typeof googleUserArray['fName'] != 'undefined' && typeof googleUserArray['lName'] != 'undefined' && googleUserArray['email']!= '' && googleUserArray['fName']!= '' && googleUserArray['lName']!= '' && googleUserArray['id']!= '') {/*console.log('start signup');*/ startGSignUp(); }
		}, 1000);
		
	  } 
	  else if (authResult['error']) 
	  {
		/*noty({
		  type: 'error',
		  text: 'There was an error accessing your Google+ data'
		});*/
		//console.log('Sign-in state: ' + authResult['error']);
	  }
  }
  catch(err) 
  {
        //console.log( "onLoadCallback error: " + err.message );
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


function startGSignUp()
{
	if($('#userConsent').val()=='1')
	{
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
						var pathname = window.location.pathname;
						
						if(pathname.match(/signin/g) || pathname.match(/login/g))
						{
							window.location.replace("./signup.php?autoG=1");
						}
						
						//signup
						$("#fName").val(googleUserArray['fName']);
						$("#lName").val(googleUserArray['lName']);
						$("#email").val(googleUserArray['email']);
						$("#gpid").val((googleUserArray['id']).toString());
						$("#passwordField").val(makeRandomPassword());
						$("#confPassword").val($("#passwordField").val());
						
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
	else
	{	
		//console.log("skipping due to lack of consent");
	}
}