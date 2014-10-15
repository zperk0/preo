/* Phonegap shim for local development. DO NOT INCLUDE IN ACTUAL PHONEGAP APPS! */

navigator.notification = {
	confirm: function(msg, callback, title, labels){
		var result = confirm(msg);
		if (result && callback) return callback(1); //YES
		if (callback) return callback(2); //NO
	}
	,alert: function(msg, callback, title, buttonname){
		alert(msg);
		if (callback) callback();
	}
};

window.plugins = {
	gaPlugin: {
		init: function() {
			console.log('GA.init', [].splice.call(arguments,2));
		},
		trackEvent: function() {
			console.log('GA.trackEvent', [].splice.call(arguments,2));
		},
		trackPage: function() {
			console.log('GA.trackPage', [].splice.call(arguments,2));
		},
		exit: function() {
			console.log('GA.exit', [].splice.call(arguments,2));
		}
	}
};

window.fireCustomEvent = function(event) {
		var e = document.createEvent('Events');
		e.initEvent(event, true, true);
		document.dispatchEvent(e);
}

window.addEventListener('load', function() {
	console.log('load......');
	setTimeout(function() {
		window.fireCustomEvent('deviceready');
	}, 1000);
}, false);

function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// pass ?lang=de query param to test a specific language
// We override uerLanguage here becuse webkit doesn't use it
window.navigator.userLanguage = getParameterByName('lang');
window.navigator.showMissingTranslations = true;


// Handle inappbrowser using popups
// If the client registers loadstart
// reg INAPPBROWSER_loadstart on opener
// this works with return.html
;(function() {

	var loadHandler;
	window.addEventListener('INAPPBROWSER_loadstart', function(e) {
		var load = document.createEvent('Events');
		load.initEvent('loadstart', true, true);
		load.url = window.location.href;
		loadHandler && loadHandler(e);
	});

	var orig_open = window.open;
	window.open = function() {
		if ( arguments.length > 2 ) {
			arguments[2] += ',height=568,width=320';
		} else {
			arguments.push('left=1000,height=568,width=320');
		}
		win = orig_open.apply(this, arguments);

		var orig_add = win.addEventListener
		win.addEventListener = function(eName, handler, capture) {
			if ( eName == 'loadstart' ) {
				loadHandler = handler
			}

			return orig_add.apply(win, arguments);
		}

		return win;
	}
})();





