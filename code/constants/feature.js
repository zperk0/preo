(function(){
	var app = null;

	try { app = angular.module('constants'); }
	catch(e) { app = angular.module('constants', []); }

	app.constant('FEATURE_STATUS', {
		'INSTALLED': 'INSTALLED',
		'TRIAL': 'TRIAL',
		'UNINSTALLED': 'UNINSTALLED'
	});
	app.constant('FEATURES', {
		'BOOKING': 9
	});
})();