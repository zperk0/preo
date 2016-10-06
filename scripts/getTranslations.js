// getTranslations.js
'use strict'

var fs = require('fs');
var request = require('request');

var urlToFile = '';
var fileToCreate = '';

var authToken = fs.readFileSync('./scripts/lingohubToken', 'utf8');

var sendRequest = function(method, url, data, result){
	var options = {
	  method: method,
	  url: url,
	  headers: {
	    'User-Agent': 'request'
	  }
	};
	request(options,result);	
}

var sendRequestUploadFIle = function (url, filename, callback){

	function result(error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	console.log(body);
	  } else {
	    console.log('Error: ' + error);
	    //console.log('Status code: ' + response.statusCode);
	    console.log(body);
	    //console.log(response);
	  }
	}
	var form = sendRequest('POST', url, filename, result).form();
	sendRequest('POST', url, filename, result);

}

var sendRequestCreateFile = function (url, filename, callback) {

	function result(error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	// create file containing the response
	  	fs.writeFile("./locale/" + filename, body, function(err) {
		    if(err) {
		        return console.log(err);
		    } else {
		    	if (callback) {
		    		callback();
		    	};
		    }
		    console.log("The file was saved: " + filename);
		}); 
	  } else {
	    console.log('Error: ' + error);
	    console.log('Status code: ' + response.statusCode);
	    console.log('Status code: ' + body);
	  }
	}
	sendRequest('GET', url, null, result);
}

var createLanguageFiles = function(){
	var resources = require('../locale/resources.json');

	for (var i in resources.members) {
		urlToFile = resources.members[i].links[0].href + '?auth_token=' + authToken;
		fileToCreate = resources.members[i].project_locale + '.po';
		//console.log(resources.members[i].project_locale);
		sendRequestCreateFile(urlToFile, fileToCreate);
	}

}

sendRequestCreateFile('https://api.lingohub.com/v1/preoday/projects/webapp-v2/resources.json?auth_token=' + authToken, 'resources.json', createLanguageFiles);
