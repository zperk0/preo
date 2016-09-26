'use strict'

var Settings = function() {

	var self = this;

	this.mainUrl;
	this.takeawayVenue;
	this.eventsVenue;
	this.username;
	this.password;

	if (browser.params.env == 'local') {
		this.mainUrl = 'http://localhost';
		this.username = 'marcelo.soares@preoday.com';
		this.password = 'm!@#qwe3';
	} else if (browser.params.env == 'demo'){
		this.mainUrl = 'https://preoday:PreoDay123@app-dev.preoday.com/#/auth/signin';
		this.username = 'marcelo.soares@preoday.com';
		this.password = 'pass';
	} else if (browser.params.env == 'prod') {
		this.mainUrl = 'https://preoday.com/menus-v2';
		this.username = 'preo.automation@gmail.com';
		this.password = 'pass';
	} else if (browser.params.env == 'prodCard') {
		this.mainUrl = 'https://preoday.com/menus-v2';
		this.username = 'preo.automation@gmail.com';
		this.password = 'pass';
	} else if (browser.params.env == 'docker') {
		this.mainUrl = 'http://dockeralias';
		this.username = 'preo.automation@gmail.com';
		this.password = 'pass';
	};

};

module.exports = Settings;